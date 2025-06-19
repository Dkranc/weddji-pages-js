// file path = <script src="https://cdn.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/edit/main.js"></script>
//to update cdn visit : https://purge.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/edit/main.js

// set required form fields
document.querySelectorAll("input[data-required]").forEach((input) => {
  if (input.getAttribute("data-required") === "true") {
    input.setAttribute("required", "true");
  }
});

//<!-- pre populate page -->

const pageData = {
  user: {
    is_anonymous: "",
    metadata: {},
    error: false,
  },
  signupForm: {
    fields: {
      fullName: "",
      email: "",
      password: "",
    },
    error: "",
  },
  weddingForm: {
    saveAndRefreshBtnTxt: "שמור ועדכן הזמנה",
    slug: "",
    finishedQuestions: false,
  },
};
$app.createComponent("page_data", pageData).mount("#page-wrapper");
// init user store
supaClient.auth.getUser().then(({ data }) => {
  const user = data.user;
  if (!user) {
    $app.components.page_data.store.user.error = true;
    return;
  }
  $app.components.page_data.store.user.is_anonymous = user.is_anonymous;
  user.user_metadata &&
    Object.assign(
      $app.components.page_data.store.user.metadata,
      user.user_metadata
    );
});

//<!-- Show upload image success icon -->
function showUploadImageSuccessIcon() {
  const uploadCtxProviders = document.querySelectorAll(
    "uc-upload-ctx-provider"
  );
  console.log("im here", uploadCtxProviders);
  uploadCtxProviders.forEach((ctx) => {
    const successIcon = ctx
      .closest(".form_field-wrapper")
      .querySelector(".image-upload-validation");
    ctx.addEventListener("change", (e) => {
      if (e.detail.isSuccess && successIcon) {
        successIcon.style.display = "inline-flex";
        successIcon.querySelector("img").src =
          e.detail.successEntries[0].cdnUrl;
        successIcon.style.justifyContent = "space-between";
      } else {
        successIcon.style.display = "none";
      }
    });
  });
}
document.addEventListener("DOMContentLoaded", showUploadImageSuccessIcon);

function updateIframeTemplate() {
  const metadata = $app.components.page_data.store.user.metadata;
  if (metadata.templateName && metadata.invitationSlug) {
    templateLink = `https://rsvp.weddji.com/${metadata.templateName}/${metadata.invitationSlug}`;
    document.querySelectorAll("iframe").forEach((iframe) => {
      iframe.src = templateLink;
    });
  } else {
    console.log("missing template metadata");
  }
}

//<!-- Google Places Autocomplete -->
function initAutocomplete() {
  const input = document.getElementById("wedding-location");
  const autocomplete = new google.maps.places.Autocomplete(input);
  const errorMsg = input.parentElement.querySelector(".error-msg");
  const latitudeField = document.getElementById("wedding-location-latitude");
  const longitudeField = document.getElementById("wedding-location-longitude");
  const placeName = document.getElementById("wedding-location-name");

  // Optionally restrict the autocomplete predictions to specific types or countries
  autocomplete.setFields(["address_components", "geometry", "name"]);
  autocomplete.setComponentRestrictions({ country: ["il"] });

  function toggleError(show) {
    if (errorMsg) {
      errorMsg.style.display = show ? "block" : "none";
      if (show) {
        latitudeField.value = "";
        longitudeField.value = "";
        placeName.value = "";
      }
    }
  }

  let isValidPlace = false;

  // Handle event when user selects a place from dropdown
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    isValidPlace = !!place.geometry;

    if (!isValidPlace) {
      console.error("No details available for input: " + place.name);
      toggleError(true);
      return;
    }

    toggleError(false);
    latitudeField.value = place.geometry.location.lat();
    longitudeField.value = place.geometry.location.lng();
    placeName.value = place.name;
  });

  input.addEventListener("input", () => {
    isValidPlace = false; // Reset validation
    toggleError(false); // Clear the error while typing
  });

  input.addEventListener("blur", () => {
    if (!isValidPlace) {
      input.value = "";
      toggleError(true);
    }
  });
}

document.addEventListener("DOMContentLoaded", initAutocomplete);
//<!-- END OF Google Places Autocomplete -->

//pre- populate with template cms item saved data
supaClient.functions
  .invoke("get-invitation-details", { method: "GET" })
  .then(({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    const values = data.fields ? Object.entries(data.fields) : [];
    if (!values.length) return;

    for (const [key, value] of values) {
      const elements = document.getElementsByName(key);
      if (key.includes("image")) {
        setImageFields(key, value?.url);
      }
      if (
        elements &&
        key !== "slug" &&
        key !== "custom-image-24" &&
        key !== "wedding-date-en"
      ) {
        elements[0].value = value;
        elements[0].dispatchEvent(new Event("input", { bubbles: true }));
      } else if (key === "slug") {
        const baseUrl = "www.weddji.co.il/";
        $app.components.page_data.store.weddingForm.slug = baseUrl + value;
        const el = document.getElementById("slug_url");
        // Update the text inside it
        if (el) {
          el.textContent = baseUrl + value;
        }
      } else if (key === "custom-image-24") {
        updateWhatsAppImage(value.url);
      } else if (key === "wedding-date-en") {
        const date = extractDateIfValid(value);
        elements[0].value = date;
        elements[0].dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  });

// pre-populate form fields with user's template data
supaClient.functions
  .invoke("get-template-raw-data", { method: "GET" })
  .then(({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    const values = data.data.data ? Object.entries(data.data.data) : [];
    if (!values.length) return;

    for (const [key, value] of values) {
      const elements = document.getElementsByName(key);
      if (elements && elements.length) {
        elements[0].value = value;
      }
    }
    updateIframeTemplate();
  });

function extractDateIfValid(input) {
  // Try parsing the date
  const date = new Date(input);

  // Check if it's a valid date and input matches ISO format
  if (!isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(input)) {
    return input.split("T")[0]; // Extract only the date part
  }

  return; // Not a valid ISO datetime string
}

function setImageFields(key, imageUrl) {
  const config = document.querySelectorAll(
    `uc-upload-ctx-provider[ctx-name="${key}"]`
  );

  // Find the uc-config by ctx-name

  if (config) {
    // Find the closest .upload-validation ancestor
    const validationEl = config[0]
      .closest(".form_field-wrapper")
      .querySelector(".image-upload-validation");

    if (validationEl) {
      validationEl.style.display = "inline-flex";
      validationEl.querySelector("img").src = imageUrl;
      validationEl.style.justifyContent = "space-between";
    } else {
      console.log("No .upload-validation ancestor found");
    }
  } else {
    console.log("uc-config element not found");
  }
}

function updateWhatsAppImage(imageUrl) {
  try {
    if (imageUrl) {
      const img = document.getElementById("whatsapp-image");
      img.src = imageUrl;
      img.srcset = ""; // Optional: clear srcset if you're only using a new src
    }
  } catch (error) {
    console.error("Failed to update image:", error);
  }
}

async function saveAndRefreash(e) {
  console.log("saveAndRefreash");
  e.preventDefault();
  e.stopImmediatePropagation(); // Prevent Webflow's form logic from running

  const form = document.querySelector("#Invite-details-form");
  const formData = new FormData(form);

  // Include all input, textarea, and select elements - comment out untill update and remove is ready
  // const formData = new FormData();
  // const fields = form.querySelectorAll("input");
  // fields.forEach((field) => {
  //   if (field.name) formData.append(field.name, field.value || "");
  // });
  const templateData = {};
  for (const [key, value] of formData.entries()) {
    // if (value !== undefined) { -- also fpr when update is ready
    if (value) {
      templateData[key] = value;
    }
  }
  $app.components.page_data.store.weddingForm.saveAndRefreshBtnTxt =
    "ההזמנה מתעדכנת";
  const { data, error } = await supaClient.functions.invoke(
    "update-template-data",
    {
      body: JSON.stringify({ data: templateData }),
    }
  );
  $app.components.page_data.store.weddingForm.saveAndRefreshBtnTxt =
    "שמור ועדכן הזמנה";
  if (!error) {
    updateIframeTemplate();

    updateWhatsAppImage(templateData["custom-image-24"]); //whatsapp image
    //enable the save and continue button
    const submitBtn = document.getElementById("save-button");
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.style.pointerEvents = "auto";
  } else {
    console.log(error);
  }
}
document
  .querySelector("#Invite-details-form")
  .addEventListener("submit", saveAndRefreash);


async function completeEdit(e) {
  const user = $app.components.page_data.store.user;
  if (user.error) return;
  if (user.is_anonymous || !user.metadata.isPaying) {
    const finishedQuestions =
      $app.components.page_data.store.weddingForm.finishedQuestions;
    if (finishedQuestions) {
      const form = document.querySelector("#wf-form-feedback");
      if (form) {
        form.requestSubmit(); // Best way to programmatically submit a form
      }
    } else {
      // open questions popup
      document.querySelector("#questions-popup").style.display = "flex";
      document.querySelector("#questions-popup").style.opacity = 1;
    }
  } else {
    // redirect to dashboard
    window.location.href = "/dashboard";
  }
}
document.querySelector("#save-button").addEventListener("click", completeEdit);

async function completeQuestions(e) {
  e.preventDefault();
  e.stopImmediatePropagation(); // Prevent Webflow's form logic from running

  document.querySelector("#questions-popup").style.display = "none";
  $app.components.page_data.store.weddingForm.finishedQuestions = true;
  const user = $app.components.page_data.store.user;
  if (user.is_anonymous) {
    // show signup popup
    document.querySelector("#signup-popup").style.display = "flex";
    document.querySelector("#signup-popup").style.opacity = 1;
    console.log("anon");
  } else if (!user.metadata.isPaying) {
    console.log("nonpay");
    // show payment popup
    document.querySelector("#payment-popup").style.display = "flex";
    document.querySelector("#payment-popup").style.opacity = 1;
  }
}
document
  .querySelector("#wf-form-feedback")
  .addEventListener("submit", completeQuestions);

//user signup logic and flow
let errorSIgnUp, submitBtn;
document.addEventListener("DOMContentLoaded", () => {
  errorSIgnUp = document.getElementById("signup-error-msg");
  submitBtn = document.getElementById("submit-btn-signup");
});

async function signup(e) {
  e.preventDefault();
  e.stopImmediatePropagation(); // Prevent Webflow's form logic from running

  const store = $app.components.page_data.store.signupForm;
  store.error = "";

  if (
    !isValidEmail(store.fields.email) ||
    !isValidPassword(store.fields.password) ||
    !isValidName(store.fields.fullName)
  ) {
    errorSIgnUp.style.display = "block";
    setTimeout(() => {
      errorSIgnUp.style.display = "none";
    }, 4000); //remove after4 seconds.
    return;
  }

  submitBtn.value = "רק רגע...";

  const { data, error } = await supaClient.auth.updateUser({
    email: store.fields.email,
    password: store.fields.password,
    data: {
      name: store.fields.fullName,
      approvesMarketing: document.getElementById("approvesMarketing").checked,
    },
  });

  if (error) {
    store.error = error.message;
    submitBtn.value = "תרשמו אותי";
  } else {
    const user = ($app.components.page_data.store.user.is_anonymous = false);
    document.querySelector("#signup-popup").style.display = "none";
    // show payment popup
    document.querySelector("#payment-popup").style.display = "flex";
    document.querySelector("#payment-popup").style.opacity = 1;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password.length >= 6;
}

function isValidName(name) {
  return name.length >= 3;
}

document.querySelector("#signup-form").addEventListener("submit", signup);
//<!-- END OF user flow logic -->

//<!-- Live whatsapp view mirroring -->
// Whatsapp Fields Mirroring
function updateText(fieldId, textId) {
  const field = document.getElementById(fieldId);
  const textElement = document.getElementById(textId);

  if (field.value === "") {
    textElement.textContent = field.placeholder; // Use placeholder if the field is empty
  } else {
    textElement.textContent = field.value; // Otherwise, use the current value
  }
}
document
  .getElementById("whatsapp-title")
  .addEventListener("input", function () {
    updateText("whatsapp-title", "whatsapp-title-text");
  });
document
  .getElementById("whatsapp-description")
  .addEventListener("input", function () {
    updateText("whatsapp-description", "whatsapp-description-text");
  });
//<!-- END OF Live whatsapp view mirroring -->

//<!-- Color Palette Radios logic -->
let radioInputs;
window.addEventListener("DOMContentLoaded", () => {
  // Select the first radio button with the name "color-palette"

  const firstRadio = document.querySelector('input[name="color-palette"]');
  if (firstRadio) {
    firstRadio.checked = true;
  }
  // hide color-pallettes that don't have style
  document
    .querySelectorAll(".color-swatch:not([style])")
    .forEach((el) => (el.style.display = "none"));

  // Select all radio inputs with the name 'color-palette'
  radioInputs = document.querySelectorAll('input[name="color-palette"]');

  // Add change event listener to all radio inputs
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", updateActiveState);
  });

  // Initial call to set active state based on default checked radio (if any)
  const defaultChecked = document.querySelector(
    'input[name="color-palette"]:checked'
  );
  if (defaultChecked) {
    updateActiveState({ target: defaultChecked });
  }
});

// Function to update active state
function updateActiveState(event) {
  // Remove active class from all .color-radio-btn elements
  document.querySelectorAll(".color-radio-btn").forEach((btn) => {
    btn.classList.remove("color-checked");
  });

  // Add active class to the sibling .color-radio-btn of the checked radio
  const checkedRadio = event.target;
  const parentLabel = checkedRadio.closest(".color-radio-wrap");
  if (parentLabel) {
    const siblingBtn = parentLabel.querySelector(".color-radio-btn");
    if (siblingBtn) {
      siblingBtn.classList.add("color-checked");
    }
  }
}

//<!-- END OF Color Palette Radios logic -->

//<!--close popups on outside click-->

//<!--open main dropdown on load-->

window.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".dropdown-toggle");

  toggles.forEach((toggle) => {
    const textDiv = toggle.querySelector("div");
    if (textDiv && textDiv.textContent.includes("פרטי האירוע")) {
      const dropdown = toggle.closest(".dropdown");
      const list = dropdown.querySelector(".dropdown-list");

      // Set the dropdown list to be visible
      list.style.display = "block";
      list.style.opacity = "1";
      list.style.height = "auto";

      const icon = toggle.querySelector(".dropdown-icon");
      if (icon) {
        icon.style.transform = "rotate(180deg)";
      }
    }
  });


  const viewChangesBtn = document.getElementById("view-changes-btn");
  viewChangesBtn.addEventListener("click", (e) => saveAndRefreash(e));
});

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("save-button");

  // Initially disable and reduce opacity
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.5";
  submitBtn.style.pointerEvents = "none";

  //<!-- Enable payment button -->

  supaClient.auth.getSession().then(({ data, error }) => {
    if (error || !data || !data.session) window.location.href = "/log-in";
    else {
      //get the template price
      const lastSegment = window.location.pathname
        .replace(/\/$/, "")
        .split("/")
        .pop();
      supaClient.functions
        .invoke("get-template-metadata", { method: "GET" })
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
            return;
          }
          const template = data.find(
            (temp) => temp.templateslug === lastSegment
          );
          if (!template || !template.price) return;
          const price = template.price;

          getPaymentLink(price);
        });
    }
  });

  async function getPaymentLink(price) {
    if (!price) {
      console.log("price not found");
      return;
    }
    const { data, error } = await supaClient.functions.invoke(
      "get-payment-link",
      {
        body: { price }, // 👈 pass your dynamic price here
      }
    );

    if (error) {
      console.error(error);
      return;
    }

    document.getElementById("payment-btn").href = data.data;
    document.getElementById("payment-btn").text = "לתשלום";
  }
});

//function handleOverlayClick(event) {
//const popupIds = ['#questions-popup', '#signup-popup', '#payment-popup'];

// popupIds.forEach(id => {
//const popup = document.getElementById(id);
//if (popup && getComputedStyle(popup).display === 'flex') {
// popup.style.display = 'none';
//}
//});
//}

// Add listener to all elements with class "modal-background-overlay"
//document.querySelectorAll('.modal-background-overlay').forEach(el => {
//el.addEventListener('click', handleOverlayClick);
//});
//<!-- END OF Show upload image success icon -->

//<!-- Display popup when user tries exiting -->

//   window.addEventListener('beforeunload', function(event) {
//     // Display the standard confirmation dialog
//     event.preventDefault();
//     event.returnValue = ''; // This triggers the standard confirmation dialog
//   });
// Capture the initial state when the page loads
//window.addEventListener('load', captureInitialState);

//<!-- END OF Display popup when user tries exiting -->
