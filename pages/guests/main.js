// file path = <script src="https://cdn.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/guests/main.js"></script>
//to update cdn visit : https://purge.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/guests/main.js

//<!-- populate page guests logic -->

const pageData = {
  showLoading: true,
  guests: [],
  guestsData: {
    total: "",
    attending: "",
    maybe: "",
    notAttending: "",
    addedTolist: "",
    invitationSent: "",
    reminderSent: "",
  },
  rsvpForm: {
    fields: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      guestCount: "1",
      status: "",
    },
    error: "",
  },
  deleteGuestId: "",
  invitationId: "",
  allGuests: [],
};
$app.createComponent("page_data", pageData).mount("#guests-page");

//redirect user if needed
supaClient.auth.getUser().then(({ data, error }) => {
  if (data && data.user) {
    // check if user purchased a template
    const user_metadata = data.user.user_metadata;
    if (
      user_metadata &&
      user_metadata.isPublished &&
      !!user_metadata.isPaying
    ) {
      $app.components.page_data.store.invitationId = user_metadata.invitationId;
      console.log("invitationId", $app.components.page_data.store.invitationId);
      //stay
    } else if (
      user_metadata &&
      user_metadata.isPublished &&
      !user_metadata.isPaying
    ) {
      document.getElementById("edit-link").click();
    } else {
      window.location.href = "/choose-template";
    }
  } else {
    window.location.href = "/log-in";
  }
});
///
// get all guests
supaClient.functions
  .invoke("list-rsvp", { method: "GET" })
  .then(({ data, error }) => {
    $app.components.page_data.store.showLoading = false;
    if (data && data.length > 0) {
      $app.components.page_data.store.allGuests = data;
      $app.components.page_data.store.guests = data;
      addGuestItemListeners();
    }
  });

// get guests data
supaClient.functions
  .invoke("get-rsvp-summary", { method: "GET" })
  .then(({ data, error }) => {
    data && Object.assign($app.components.page_data.store.guestsData, data);
  });


//<!-- END OF populate page guests logic -->

//<!-- Add RSVP form -->

const resetForm = () => {
  const store = $app.components.page_data.store.rsvpForm;
  store.fields.firstName = "";
  store.fields.lastName = "";
  store.fields.phoneNumber = "";
  store.fields.guestCount = "1";
  store.fields.status = "";

  const formEl = rsvpFormBlock.querySelector("form");
  const failEl = rsvpFormBlock.querySelector(".w-form-fail");
  const doneEl = rsvpFormBlock.querySelector(".w-form-done");

  // Fade out the success and fail messages
  fadeOut(failEl);
  fadeOut(doneEl);

  // Fade in the form
  fadeIn(formEl);
};

function fadeIn(element, duration = 500) {
  element.style.opacity = 0;
  element.style.display = "block";
  element.style.transition = `opacity ${duration}ms ease-in`;

  // Force reflow to make sure the transition applies
  void element.offsetWidth;

  element.style.opacity = 1;
}
function fadeOut(element, duration = 500) {
  element.style.transition = `opacity ${duration}ms ease-out`;
  element.style.opacity = 0;

  setTimeout(() => {
    element.style.display = "none";
  }, duration);
}

// RSVP mode tracking
let rsvpMode = "add"; // 'add' or 'edit'
let editGuestIndex = null;

function updateSubmitButtonText() {
  const submitBtn = rsvpFormBlock.querySelector("[type='submit']");
  if (!submitBtn) return;
  if (rsvpMode === "edit") {
    submitBtn.value = "עדכן רשומה";
  } else {
    submitBtn.value = submitBtn.dataset.default || "הוסף אורח";
  }
}

async function rsvp(e) {
  e.preventDefault();
  e.stopImmediatePropagation(); // Prevent Webflow's form logic from running

  const store = $app.components.page_data.store.rsvpForm;
  store.error = "";

  try {
    const { data: userData, error: dataError } =
      await supaClient.auth.getUser();

    const data = {
      templateSlug: userData?.user?.user_metadata?.templateName, //window.location.pathname.split('/')[1],
      invitationSlug: userData?.user?.user_metadata?.invitationSlug, //window.location.pathname.split('/')[2],
      firstName: store.fields.firstName,
      lastName: store.fields.lastName,
      phoneNumber: store.fields.phoneNumber,
      guestCount: store.fields.guestCount,
      status: store.fields.status,
    };

    const submitBtn = rsvpFormBlock.querySelector("[type='submit']");
    const submitBtnTxt = submitBtn.value;
    submitBtn.value = submitBtn.dataset.wait;

    const { data: response, error } = await supaClient.functions.invoke(
      "invite-rsvp",
      { body: data }
    );

    submitBtn.value = submitBtnTxt;
    if (error) {
      store.error = error.message;
      rsvpFormBlock.querySelector(".w-form-fail").style.display = "block";
    } else {
      rsvpFormBlock.querySelector("form").style.display = "none";
      rsvpFormBlock.querySelector(".w-form-fail").style.display = "none";
      rsvpFormBlock.querySelector(".w-form-done").style.display = "block";

      if (rsvpMode === "edit" && editGuestIndex !== null) {
        $app.components.page_data.store.guests[editGuestIndex] = data;
      } else {
        $app.components.page_data.store.guests.push(data);
      }
      addGuestItemListeners();
      supaClient.functions
        .invoke("get-rsvp-summary", { method: "GET" })
        .then(({ data, error }) => {
          data &&
            Object.assign($app.components.page_data.store.guestsData, data);
        });
      setTimeout(() => {
        resetForm();
      }, 2500);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

const rsvpRadioBtns = document.querySelectorAll(
  "input[type='radio'][data-name='rsvp']"
);
if (rsvpRadioBtns) {
  rsvpRadioBtns.forEach((rsvpRadio) => {
    rsvpRadio.addEventListener("change", (e) => {
      $app.components.page_data.store.rsvpForm.fields.status = e.target.value;
    });
  });
}

const store = $app.components.page_data.store.rsvpForm;

const addBtn = document.getElementById("guest-inc");
addBtn.addEventListener("click", () => {
  if (Number(store.fields.guestCount) < 5) {
    // dont allow more then 5
    store.fields.guestCount = String(Number(store.fields.guestCount) + 1);
  }
});
const subBtn = document.getElementById("guest-dec");
subBtn.addEventListener("click", () => {
  if (Number(store.fields.guestCount) > 1) {
    // dont allow 0
    store.fields.guestCount = String(Number(store.fields.guestCount) - 1);
  }
});

const rsvpFormBlock = document.getElementById("rsvp-form");
if (rsvpFormBlock) {
  rsvpFormBlock.querySelector("form").addEventListener("submit", rsvp);
}

//<!-- END OF Add RSVP form -->

//<!--Export logic-->

const buttons = document.querySelectorAll(".export-button");

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const providerId = button.getAttribute("provider");
    let from = document.querySelector('.form_input.export.from');    
    let to = document.querySelector('.form_input.export.to');
    
    // Convert to timestamptz format if dates are provided
    from = from.value ? new Date(from.value).toISOString() : null;
    to = to.value ?  new Date(new Date(to.value).setHours(23, 59, 59, 999)).toISOString() : null;
    

    //document.getElementById('export').addEventListener('click', async () => {
    try {
      const { data, error } = await supaClient.functions.invoke(
        `list-rsvp?format=csv&externalService=${providerId}&from=${from}&to=${to}`,
        {
          method: "GET",
        }
      );

      if (error) throw error;

      // Add UTF-8 BOM and RTL marks
      const UTF8_BOM = "\uFEFF";
      const RTL_MARK = "\u202E"; // Using RTL Override character
      const LTR_MARK = "\u202C"; // Using Pop Directional Formatting

      // Process each line to force RTL
      const lines = data.split("\n");
      const rtlLines = lines.map((line) => {
        const columns = line.split(",");
        // Add RTL mark to each cell and wrap with direction control
        const rtlColumns = columns.map(
          (cell) => RTL_MARK + cell.trim() + LTR_MARK
        );
        return rtlColumns.join(",");
      });

      const csvContent = UTF8_BOM + rtlLines.join("\n");

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8-sig",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rsvp-list-${new Date().toISOString().split("T")[0]}.csv`;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  });
});

//<!--End of Export logic-->

//<!-- sidebars-->
const fadeDuration = 300; // in ms
function showSidebar(sidebar) {
  setTimeout(() => {
    sidebar.style.display = "flex";
    sidebar.style.opacity = "1";
  }, 400);
}

function hideSidebar(sidebar) {
  sidebar.style.opacity = "0";
  sidebar.style.transition = `opacity ${fadeDuration}ms`;
  setTimeout(() => {
    sidebar.style.display = "none";
  }, fadeDuration);
}

function clearRSVPForm() {
  const store = $app.components.page_data.store.rsvpForm;
  store.fields.firstName = "";
  store.fields.lastName = "";
  store.fields.phoneNumber = "";
  store.fields.guestCount = "1";
  rsvpMode = "add";
  editGuestIndex = null;

  const rsvpRadioBtns = document.querySelectorAll("input[type='radio'][data-name='rsvp']");
  rsvpRadioBtns.forEach(radio => {
    const neighborDiv = radio.previousElementSibling;
    if (neighborDiv) {
      neighborDiv.classList.remove('w--redirected-checked');
    }
  });

  updateSubmitButtonText();
}

document.addEventListener("DOMContentLoaded", () => {
  const exportSidebar = document.getElementById("export-sidebar");
  const importSidebar = document.getElementById("import-sidebar");

  const openExportBtn = document.getElementById("export");
  const openImportBtn = document.getElementById("import");

  const closeExportBtn = document.getElementById("close-export-btn");
  const closeImportBtn = document.getElementById("close-import-btn");

  openExportBtn.addEventListener("click", () => {
    hideSidebar(importSidebar);
    showSidebar(exportSidebar);
  });

  openImportBtn.addEventListener("click", () => {
    hideSidebar(exportSidebar);
    showSidebar(importSidebar);
  });

  closeExportBtn.addEventListener("click", () => {
    clearRSVPForm();
    hideSidebar(exportSidebar);
  });

  closeImportBtn.addEventListener("click", () => {
    clearRSVPForm();
    hideSidebar(importSidebar);
  });

  updateSubmitButtonText(); // Set initial button text
});


window.addEventListener("DOMContentLoaded", async () => {
  const readyToSendBtn   = document.getElementById("send");
  const readyToSendPopup = document.getElementById("ready-to-send-popup");
  const closeReadyToSend = document.getElementById("cancel-ready");
  const submitReadyToSend = document.getElementById("submit-ready-to-send");

  const {data, error}  = await supaClient.functions.invoke("get-invitation-status", { method: "GET" });
  if(data && data.status !== "created"){
    readyToSendBtn.disabled = true;
    readyToSendBtn.textContent = "ההזמנות בדרך לאורחים!";
  }
  
  if(readyToSendBtn && readyToSendPopup && closeReadyToSend && data && data.status === "created"){
    readyToSendBtn.addEventListener("click", () => {
      readyToSendPopup.style.display = "flex";
    })
    closeReadyToSend.addEventListener("click", () => {
      readyToSendPopup.style.display = "none";
    })
    submitReadyToSend.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      // Disable button and show loading state
      submitReadyToSend.disabled = true;
      submitReadyToSend.value = "רק שנייה...";

      // Wait for response
      const invitationId = $app.components.page_data.store.invitationId;
      const { data: response, error } = await supaClient.functions.invoke(
        "update-invitation-status",
        { body: { status: "ready-to-send", invitationId: invitationId } }
      );

      if(error) {
        console.error("Error updating invitation status:", error);
        submitReadyToSend.disabled = false;
        submitReadyToSend.value = "נסו שוב";
        return;
      }

      // Show success state
      submitReadyToSend.value = "סיימנו, מדהים!";
      
      // Wait 2 seconds before closing
      await new Promise(resolve => setTimeout(resolve, 2000));
      readyToSendPopup.style.display = "none";
      readyToSendBtn.disabled = true;
      readyToSendBtn.removeEventListener("click", () => {
        readyToSendPopup.style.display = "flex";
      });
      readyToSendBtn.textContent = "ההזמנות בדרך לאורחים!";
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let currentSearchQuery = '';
  let currentFilterStatus = 'undefined';

  function applyFiltersAndSearch() {
    const allGuests = $app.components.page_data.store.allGuests || [];
    let filteredGuests = [...allGuests];

    // Apply search if exists
    if (currentSearchQuery !== '') {
      filteredGuests = filteredGuests.filter(guest => {
        return (
          (guest.firstName && guest.firstName.toLowerCase().includes(currentSearchQuery)) ||
          (guest.lastName && guest.lastName.toLowerCase().includes(currentSearchQuery)) ||
          (guest.phoneNumber && guest.phoneNumber.includes(currentSearchQuery))
        );
      });
    }

    // Apply status filter if not default
    if (currentFilterStatus !== 'undefined') {
      filteredGuests = filteredGuests.filter(guest => guest.status.toString() === currentFilterStatus);
    }

    // Update displayed guests
    $app.components.page_data.store.guests = filteredGuests;
    addGuestItemListeners();
  }

  document.getElementById('search').addEventListener('input', function () {
    currentSearchQuery = this.value.toLowerCase().trim();
    applyFiltersAndSearch();
  });

  document.getElementById("filter").addEventListener("change", function () {
    currentFilterStatus = this.value;
    applyFiltersAndSearch();
  });

});


const deleteGuest = async () => {
  const guestId = $app.components.page_data.store.deleteGuestId;
  const { data, error } = await supaClient.functions.invoke("delete-rsvp", { body: { rsvpId: guestId } });
  if (error) {
    console.error("Error deleting guest:", error);
  }
  fadeOut(document.getElementById('delete-guest-popup'));


  //cleanup UI after deletion
  $app.components.page_data.store.guests = $app.components.page_data.store.guests.filter(guest => guest.id !== guestId);
  $app.components.page_data.store.allGuests = $app.components.page_data.store.allGuests.filter(guest => guest.id !== guestId);

  const importSidebar = document.getElementById("import-sidebar");
  clearRSVPForm();
  hideSidebar(importSidebar);

  document.querySelector('.side-menu-background').style.transform =
  'translate3d(-165%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-7deg) skew(0deg, 0deg)';

}

// Add RSVP form preloading and guest item click logic
function preloadRsvpForm(guest) {
  const store = $app.components.page_data.store.rsvpForm;
  store.fields.firstName = guest.firstName || "";
  store.fields.lastName = guest.lastName || "";
  store.fields.phoneNumber = guest.phoneNumber || "";
  store.fields.guestCount = guest.guestCount ? String(guest.guestCount) : "1";
  
  const guestStatus = guest.status !== null && guest.status !== undefined ? String(guest.status) : "";
  store.fields.status = guestStatus;

  // Update the radio buttons to reflect the guest's status
  const rsvpRadioBtns = document.querySelectorAll("input[type='radio'][data-name='rsvp']");
  rsvpRadioBtns.forEach(radio => {
    radio.checked = radio.value === guestStatus;
    const neighborDiv = radio.previousElementSibling;
    if (neighborDiv && radio.checked) {
      neighborDiv.classList.add('w--redirected-checked');
    }
  });
}

function addGuestItemListeners() {
  const importbtn = document.getElementById("import");
  setTimeout(() => {
    const guestItems = document.querySelectorAll(".stacked-list1_item");
    guestItems.forEach((item, idx) => {
      item.onclick = () => {
        const guest = $app.components.page_data.store.guests[idx - 1];
        $app.components.page_data.store.deleteGuestId = guest.id;
        preloadRsvpForm(guest);
        rsvpMode = "edit";
        editGuestIndex = idx - 1;
        updateSubmitButtonText();
        importbtn.click();
      };
    });
  }, 100);
}


window.addEventListener("DOMContentLoaded", () => {
  const cancelDelete = document.getElementById('cancel-delete');
  cancelDelete.addEventListener('click', () => {
    fadeOut(document.getElementById('delete-guest-popup'));
  });

  document.getElementById('delete-button-open').addEventListener('click', () => {
      fadeIn(document.getElementById('delete-guest-popup'));
  });

  document.getElementById("delete-confirm").addEventListener("click", deleteGuest);
});


// dropdown export logic
document.addEventListener('DOMContentLoaded', () => {
    const dropdownToggle = document.querySelector('.dropdown--export');
    const dropdownList = document.querySelector('.w-dropdown-list');
    const dropdownItems = document.querySelectorAll('.eprot-dropdown-item');
    const dateRangeWrapper = document.querySelectorAll('.date-range-wrapper')[1]; // skip the outer wrapper

    let isOpen = false;

    // Handle dropdown toggle click
    dropdownToggle.addEventListener('click', () => {
      isOpen = !isOpen;
      dropdownList.style.display = isOpen ? 'block' : 'none';
    });

    // Set initial visibility of date range
    const updateDateVisibility = (selectedText) => {
      if (selectedText === 'טווח תאריכים') {
        dateRangeWrapper.style.display = 'block';
      } else {
        dateRangeWrapper.style.display = 'none';
      }
    };

    // Initialize on page load
    updateDateVisibility(dropdownToggle.textContent.trim());

    // Handle item selection
    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const selectedValue = item.textContent.trim();

        // Set the selected value in the visible toggle
        dropdownToggle.querySelector('.text-align-right').textContent = selectedValue;

        // Show/hide the date fields
        updateDateVisibility(selectedValue);

        // Close dropdown
        dropdownList.style.display = 'none';
        isOpen = false;
      });
    });

    // Optional: Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownToggle.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.style.display = 'none';
        isOpen = false;
      }
    });
  });