// file path = <script src="https://cdn.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/dashboard/main.js"></script>
//to update cdn visit : https://purge.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/dashboard/main.js

// Populate page data -->
const pageData = {
  inviteLink: "",
  eventDate: "",
  slugSelected: undefined,
  rawEventDate: "",
  guestsData: {
    total: "",
    attending: "",
    maybe: "",
    notAttending: "",
  },
  guests: [],
};
$app.createComponent("page_data", pageData).mount("#dashboard-page");

supaClient.auth.getUser().then(({ data, error }) => {
  if (data && data.user) {
    // hide page loader
    Object.assign(document.querySelector(".page-loader").style, {
      transform: "translate(0, -100%)",
      opacity: "0",
    });
    // check if user purchased a template
    const user_metadata = data.user.user_metadata;
    if (
      user_metadata &&
      user_metadata.isPublished &&
      !!user_metadata.isPaying
    ) {
      $app.components.page_data.store.slugSelected = user_metadata.slugSelected;
      $app.components.page_data.store.inviteLink = `https://rsvp.weddji.com/${user_metadata.templateName}/${user_metadata.invitationSlug}`;
      // if no date, maybe make default date fallback?
      const eventDate = user_metadata.weddingDate;
      $app.components.page_data.store.rawEventDate = eventDate;
      $app.components.page_data.store.eventDate = formatDate(eventDate);

      const popup = document.getElementById("domain-popup");
      const params = new URLSearchParams(window.location.search);
      //const isPaymentSuccess = params.get("payment") === "success";

      //check that the user hasnt already chosen a slug.
      const slugSelected = $app.components.page_data.store.slugSelected;
      console.log({ slugSelected });

      if (popup && !slugSelected) {
        popup.style.display = "flex";
      } else {
        popup.style.display = "none";
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
      initTimerCountdown();

      // get users guests data
      supaClient.functions
        .invoke("get-rsvp-summary", { method: "GET" })
        .then(({ data, error }) => {
          data &&
            Object.assign($app.components.page_data.store.guestsData, data);
        });

      //get top 3 guests
      supaClient.functions
        .invoke("list-rsvp", { method: "GET" })
        .then(({ data, error }) => {
          if (data && data.length > 0) {
            $app.components.page_data.store.guests = data.filter( r => { return( r === 0 || r===1 || r===2)} ).slice(0, 3);
          }
        });
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

const formatDate = (isoDate) => {
  const dateAndTime = isoDate.split("T");

  // Convert to desired format: yyyy-MM-dd HH:mm
  const date = dateAndTime[0];
  const hourAndMinutes = dateAndTime[1].split(":");
  const hours = hourAndMinutes[0];
  const minutes = hourAndMinutes[1];

  return `${date} ${hours}:${minutes}`;
};

// END OF Populate page data -->

// Countdown Timer -->

function initTimerCountdown() {
  const timerCountdown = () => {
    // Set the target date and time
    var target_date = new Date(
      $app.components.page_data.store.eventDate
    ).getTime();
    // Get the current date and time
    var current_date = new Date().getTime();
    // Calculate the remaining time in milliseconds
    var distance = target_date - current_date;

    // Calculate the remaining days, hours, minutes, and seconds
    var day = 1000 * 60 * 60 * 24;
    var hour = 1000 * 60 * 60;
    var minute = 1000 * 60;
    var second = 1000;

    // Update HTML elemets
    document.getElementById("days").innerText = Math.floor(distance / day);
    document.getElementById("hours").innerText = Math.floor(
      (distance % day) / hour
    );
    document.getElementById("minutes").innerText = Math.floor(
      (distance % hour) / minute
    );

    // Check if the countdown is complete
    if (distance < 0) {
      if (countdown_timer) clearInterval(countdown_timer);
      document.getElementById("days").innerText = "0";
      document.getElementById("hours").innerText = "0";
      document.getElementById("minutes").innerText = "0";
      document.getElementById("passed-date-message").style.display = "block";
    }
  };
  timerCountdown();
  // Update the countdown timer every 30 seconds
  var countdown_timer = setInterval(timerCountdown, 30000);
}

// END OF Countdown Timer by Flowbase -->

// Share Buttons Logic -->

function copyToClipboard() {
  const link = $app.components.page_data.store.inviteLink;
  navigator.clipboard
    .writeText(link)
    .then(() => {
      const tooltips = document.querySelectorAll(".tooltip1_tooltip-wrapper");
      // Loop through each one - phone and desktop
      tooltips.forEach((tooltip, index) => {
        tooltip.style.display = "block";
        setTimeout(() => {
          tooltip.style.display = "none";
        }, 3000); // hide after 3 sec
      });
    })
    .catch((err) => console.error("Error copying link: ", err));
}

function shareWhatsapp() {
  const link = $app.components.page_data.store.inviteLink;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${link}`;
  window.open(whatsappUrl, "_blank");
}

function shareFacebook() {
  const link = $app.components.page_data.store.inviteLink;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
  window.open(fbUrl, "_blank", "width=600,height=400");
}

function shareEmail() {
  const link = $app.components.page_data.store.inviteLink;
  const subject = "אנחנו נרגשים להזמינכם ליום חתונתנו";
  const body = "נא אישרו הגעה בלינק";
  const mailtoLink = `mailto:?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body + "\n\n" + link)}`;
  window.open(mailtoLink, "_blank");
}

// END OF Share Buttons Logic -->

// choose domain popup logic -->

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("url-slug");
  const button = document.getElementById("url-slug-submit-btn");
  const popup = document.getElementById("domain-popup");

  input.addEventListener("input", () => {
    // Replace invalid characters with empty string
    input.value = input.value.replace(/[^a-zA-Z0-9\-_]/g, "");
  });

  button.addEventListener("click", async () => {
    const slug = input.value;

    // Optional: validate again before sending
    if (!/^[a-zA-Z0-9\-_]+$/.test(slug)) {
      throw new Error("Could not update slug");
    }

    try {
      console.log(slug);
      const { data, error } = await supaClient.functions.invoke(
        "update-template-data",
        {
          body: JSON.stringify({
            data: {
              slug,
              "main-date": $app.components.page_data.store.rawEventDate,
            },
          }),
        }
      );
      if (error) {
        throw new Error("Could not update slug");
      }
      popup.style.display = "none";
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      const errorTag = document.getElementById("slug-error");
      errorTag.textContent =
        "שגיאה במהלך השמירה, וודאו כי יש רק אותיות באנגלית ומספרים. ייתכן והשם תפוס, נסו אולי משהו אחר";
    }
  });
});




// Generate a QR code image from the user's email and return an HTML message
function getDestinationLink(email) {
  const textMessage = `היי, אני רוצה להוסיף מוזמנים לחתונה שלי! כתובת המייל שלי באתר שלכם היא ${email}`;

  const destinationLink = `https://wa.me/972528815819?text=${encodeURIComponent(textMessage)}`; //change to real number
  return destinationLink;
}

function getWhatsAppLink(email) {
  // Use a free QR code API (e.g., goqr.me)
  const destinationLink = getDestinationLink(email);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${destinationLink}`;
  return qrUrl;
}




