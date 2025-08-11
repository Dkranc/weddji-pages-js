// file path = <script src="https://cdn.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/edit/main.js"></script>
//to update cdn visit : https://purge.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/edit/main.js

// Template field mapping - defines which fields to collect for each template
// Maps generic field names to Webflow collection field slugs for each template
const TEMPLATE_FIELD_MAP = {
  // Clasic-static template (9_Clasic-statics)
  'calsatic': {
    'wedding-date-he': 'hebrew-date-he',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 't9-color',
    'custom-image-24': 'whatapp-open-graph---image-2',
    'custom-field-1': 'story-subtitle',
    'custom-image-2': 'picture-1',
    'custom-image-3': 'picture-2',
    'custom-field-4': 'quote-subtext',
    'custom-field-5': 'quote-2',
    'custom-field-6': 'story-text',
    'custom-field-7': 'wedding-time',
    'custom-field-8': 'schedule-time-2-2',
    'custom-field-9': 'schedule-title-1',
    'custom-field-10': 'schedule-title-2',
    'custom-field-11': 'main-title',
    'custom-field-12': 'registry-text',
    'custom-field-13': 'groom-parents',
    'custom-field-14': 'bbride-parents'
  },

  // Flowers template (8_Envelopes Flowers)
  'flowers': {
    'wedding-date-he': 'tryk-bry',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name-2',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 'color-palette-1',
    'custom-image-24': 'whatapp-open-graph---image',
    'custom-field-1': 'quote',
    'custom-field-2': 'quote-subtext',
    'custom-field-3': 'headline---save-the-date-date',
    'custom-field-4': 'schedule-title-1',
    'custom-field-5': 'schedule-title-2',
    'custom-field-6': 'parents-title',
    'custom-field-7': 'bride-parents',
    'custom-field-8': 'groom-parents',
    'custom-url-9': 'bit-link',
    'custom-url-10': 'paybox-link',
    'custom-field-11': 'greeting-title',
    'custom-field-12': 'he-signup-title'
  },

  // Envelope template (7_Envelopes)
  'envelope': {
    'wedding-date-he': 'tryk-bry',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name-2',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 'color-palette-1',
    'custom-image-24': 'whatapp-open-graph---image',
    'custom-field-1': 'quote',
    'custom-field-2': 'quote-subtext',
    'custom-field-3': 'headline---save-the-date-date',
    'custom-field-4': 'schedule-title-1',
    'custom-field-5': 'schedule-title-2',
    'custom-field-6': 'parents-title',
    'custom-field-7': 'bride-parents',
    'custom-field-8': 'groom-parents',
    'custom-url-9': 'bit-link',
    'custom-url-10': 'paybox-link',
    'custom-field-11': 'greeting-title',
    'custom-field-12': 'he-signup-title'
  },

  // Puzzle template (6_Puzzles)
  'puzzle': {
    'wedding-date-he': 'hebrew-date-he',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 't6-main-color',
    'custom-image-24': 'whatapp-open-graph---image-2',
    'custom-field-2': 'registry-text',
    'custom-field-3': 'reception-title',
    'custom-field-4': 'ceremony-title',
    'custom-field-5': 'parents-title',
    'custom-field-6': 'groom-parents-names'
  },

  // Evermore template (3_Evermore)
  'evermore': {
    'wedding-date-he': 'tryk-bry',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name-2',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 'color-palette-1',
    'custom-image-24': 'whatapp-open-graph---image',
    'custom-field-1': 'main-image',
    'custom-field-2': 'groom-name-en',
    'custom-image-3': 'picture-1',
    'custom-field-4': 'bride-name-en',
    'custom-image-5': 'gallery-image-1',
    'custom-field-6': 'invite-title',
    'custom-field-7': 'invitation-text',
    'custom-field-8': 'reception-description',
    'custom-field-9': 'ceremony-description',
    'custom-image-10': 'gallery-image-2',
    'custom-field-11': 'dinner-description',
    'custom-time-12': 'dinner-time-new',
    'custom-fieldarea-13': 'gift-description',
    'custom-image-14': 'gallery-image-3',
    'custom-image-15': 'gallery-image-4',
    'custom-image-16': 'gift-title',
    'custom-image-17': 'gift-link',
    'custom-field-18': 'rsvp-title',
    'custom-fieldarea-19': 'thank-you---title'
  },

  // Blossom template (1_Blossom)
  'blossom': {
    'wedding-date-he': 'tryk-bry',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name-2',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 'color-palette-1',
    'custom-image-24': 'whatapp-open-graph---image',
    'custom-image-1': 'picture-1',
    'custom-field-2': 'groom-parents',
    'custom-field-3': 'bride-parents',
    'custom-field-4': 'invite-title',
    'custom-field-5': 'schedule-title',
    'custom-field-6': 'schedule-subtitle',
    'custom-field-7': 'schedule-title-1',
    'custom-field-8': 'schedule-title-2',
    'custom-field-9': 'schedule-title-3',
    'custom-time-10': 'dinner-time-new',
    'custom-field-11': 'schedule-title-4',
    'custom-time-12': 'party-time-new',
    'custom-field-13': 'rsvp-subtitle',
    'custom-field-14': 'rsvp-title'
  },

  // Horizon template (5_Horizon)
  'horizon': {
    'wedding-date-he': 'hebrew-date-he',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 'color-palette-1',
    'custom-image-24': 'whatapp-open-graph---image-2',
    'custom-field-1': 'wedding-time',
    'custom-field-2': 'schedule-time-2-2',
    'custom-field-3': 'schedule-title-1',
    'custom-time-4': 'schedule-time-3-2',
    'custom-field-5': 'schedule-title-2',
    'custom-time-6': 'schedule-time-4-2',
    'custom-field-7': 'schedule-title-3',
    'custom-image-8': 'picture-1',
    'custom-field-9': 'schedule-title-4',
    'custom-fieldarea-10': 'story-text',
    'custom-image-11': 'picture-4',
    'custom-fieldarea-12': 'gifts-text',
    'custom-url-13': 'gifts-link',
    'custom-field-14': 'registry-text',
    'custom-image-15': 'picture-2',
    'custom-image-16': 'picture-3',
    'custom-image-17': 'story-subtitle'
  },

  // Timeless template (4_Timeless)
  'timeless': {
    'wedding-date-he': 'wedding-date-he',
    'wedding-date-en': 'main-date',
    'wedding-location': 'weeding-location',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 't4-mai-colornn',
    'custom-image-24': 'whatsapp-open-graph---image',
    'custom-field-1': 'subtitle',
    'custom-fieldarea-2': 'registry-body-1',
    'custom-image-3': 'picture-1',
    'custom-image-4': 'picture-2',
    'custom-image-5': 'picture-3',
    'custom-image-6': 'picture-4',
    'custom-image-7': 'picture-5',
    'custom-field-8': 'bride-parents',
    'custom-field-9': 'parents-title',
    'custom-field-10': 'groom-parents',
    'custom-field-11': 'registry-title-4',
    'custom-field-12': 'gallery-title',
    'custom-fieldarea-13': 'registry-body-2',
    'custom-image-14': 'picture-6',
    'custom-image-15': 'picture-7',
    'custom-image-16': 'picture-8',
    'custom-image-17': 'picture-9',
    'custom-field-18': 'gift-title',
    'custom-fieldarea-19': 'gift-description',
    'custom-url-20': 'gifts-link-2'
  },

  // Confetti template (2_Confetti)
  'confetti': {
    'wedding-date-he': 'tryk-bry',
    'wedding-date-en': 'main-date',
    'wedding-location': 'place-name-2',
    'wedding-location-latitude': 'wedding-location-latitude',
    'wedding-location-longitude': 'wedding-location-longitude',
    'wedding-location-name': 'wedding-location-google',
    'groom-name': 'groom-name',
    'bride-name': 'bride-name',
    'whatsapp-title': 'whatsapp-open-graph---title',
    'whatsapp-description': 'whatsapp-open-graph---description',
    'color-palette': 'color-palette-1',
    'custom-image-24': 'whatapp-open-graph---image',
    'custom-field-1': 'headline---save-the-date-date',
    'custom-image-2': 'picture-1',
    'custom-field-3': 'en-schedule-title-2',
    'custom-field-4': 'new',
    'custom-field-5': 'schedule-title-1',
    'custom-field-6': 'schedule-title-2',
    'custom-time-7': 'dinner-time-new',
    'custom-field-8': 'schedule-title-3',
    'custom-time-9': 'party-time-new',
    'custom-image-10': 'picture-2',
    'custom-image-11': 'picture-2-new',
    'custom-image-12': 'picture-3',
    'custom-image-13': 'picture-4',
    'custom-image-14': 'picture-5-2',
    'custom-image-15': 'picture-6-2',
    'custom-field-16': 'he-signup-title',
    'custom-field-17': 'en-signup-title',
    'custom-field-18': 'he-map-title'
  }
};

// Function to get template name from URL
function getTemplateName() {
  return window.location.pathname
    .replace(/\/$/, "")
    .split("/")
    .pop();
}

// Function to get fields for current template
function getTemplateFields() {
  const templateName = getTemplateName();
  const templateMap = TEMPLATE_FIELD_MAP[templateName] || {};
  return Object.keys(templateMap); // Return the generic field names (keys)
}

// Function to collect form data based on template field mapping
function collectTemplateFormData(form) {
  const templateName = getTemplateName();
  const templateMap = TEMPLATE_FIELD_MAP[templateName] || {};
  const templateData = {};
  
  // First, let's get all form data like before to capture UploadCare values
  const formData = new FormData(form);
  const allFormData = {};
  for (const [key, value] of formData.entries()) {
    allFormData[key] = value;
  }
  
  // Map each generic field to its corresponding Webflow field and collect the data
  Object.entries(templateMap).forEach(([genericField, webflowField]) => {
    let value = null;
    
    // First try to get from FormData (this captures UploadCare string values)
    if (allFormData[webflowField]) {
      value = allFormData[webflowField];
    } else {
      // Fallback to direct element query
      const element = form.querySelector(`[name="${webflowField}"]`);
      if (element) {
        value = element.value;
        
        // Special handling for UploadCare image fields if still empty
        if ((webflowField.includes('image') || webflowField.includes('picture')) && !value) {
          const uploadCareProvider = form.querySelector(`uc-upload-ctx-provider[ctx-name="${webflowField}"]`);
          if (uploadCareProvider) {
            // Try to get the UploadCare URL from the provider
            const uploadCareData = uploadCareProvider.uploadCollection?.files;
            if (uploadCareData && uploadCareData.length > 0) {
              value = uploadCareData[0].cdnUrl || uploadCareData[0].originalUrl || value;
            }
          }
        }
      }
    }
    
    // Send null for empty strings, otherwise send the value
    templateData[genericField] = value === "" ? null : value;
  });
  
  return templateData;
}

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
      phone: "",
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

async function getTemplatePrice(){
  //get the template price
  const lastSegment = window.location.pathname
    .replace(/\/$/, "")
    .split("/")
    .pop();
 const {data, error} = await supaClient.functions
    .invoke("get-template-metadata", { method: "GET" })
    if (error) {
      console.log(error);
      return;
    }
      const template = data.find(
        (temp) => temp.templateslug === lastSegment
      );
      if (!template || !template.price) return;
      const price = template.price;
      return price;
};

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

  console.log('payment link', data.data);
  document.getElementById("payment-btn").href = data.data;
  document.getElementById("payment-btn").text = "לתשלום";
}

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

async function saveAndRefreash(e, {preventDefault = true} = {}) {
  if (preventDefault) {
    e.preventDefault();
    e.stopImmediatePropagation(); // Prevent Webflow's form logic from running
  }

  const form = document.querySelector("#Invite-details-form");
  
  // Use the new template-based field collection instead of FormData
  const templateData = collectTemplateFormData(form);
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

// Price Update Functionality
function initializeCouponHandlers() {
  // Find the input field for guest count (adjust selector as needed)
  const button = document.querySelector('.button-5.coup-btn.w-button');
  
  if (button) {
    // Add click handler to update price when input is clicked/changed
    button.addEventListener('click', validateCoupon);
  }
}


async function validateCoupon(e) {
  e.preventDefault();
  e.stopImmediatePropagation(); // Prevent Webflow's form logic from running
  const couponInput = document.getElementById('coupon-code-txt');
  const couponCode = couponInput.value || '';
  const price = await getTemplatePrice();

  const successIcon = document.getElementById('cpn-success-icon');
  const failIcon = document.getElementById('cpn-fail-icon');

  try {
    // Call your edge function to get updated price
    const { data, error } = await supaClient.functions.invoke(
      "validate-coupon",
      {
        body: JSON.stringify({ "couponCode": couponCode, "originalPrice": price }),
      }
    );

    if (error) {
      console.error('Error calculating price:', error);
      failIcon.style.display = 'block';
      return;
    }

    const {      valid,finalPrice} = data;
    if (!valid) {
      console.error('Invalid coupon code');
      failIcon.style.display = 'block';
      return;
    }

    const newPrice = finalPrice; // Adjust based on your API response structure

    //update the price display
    const priceHeaderElement = document.getElementById("final-price-header-txt");

    if (priceHeaderElement) {
      priceHeaderElement.textContent = `מחיר סופי: ₪${newPrice} `;
    }
    else{
      throw new Error('Price header element not found');
    }

    // Update payment link with new price
    await getPaymentLink(newPrice);
    successIcon.style.display = 'block';

  } catch (error) {
    console.error('Error updating price:', error);
    failIcon.style.display = 'block';
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
    !isValidName(store.fields.fullName) ||
    !isValidPhone(store.fields.phone)
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
      phone: store.fields.phone
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

function isValidPhone(phone) {
  return /^05\d{8}$/.test(phone);
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
  viewChangesBtn.addEventListener("click", (e) => saveAndRefreash(e, {preventDefault: false}));
});

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("save-button");

  // Initially disable and reduce opacity
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.5";
  submitBtn.style.pointerEvents = "none";

  // Initialize price update functionality
  initializeCouponHandlers();

  //<!-- Enable payment button -->

  supaClient.auth.getSession().then(async ({ data, error }) => {
    if (error || !data || !data.session) window.location.href = "/log-in";
    else {
      const price = await getTemplatePrice();
      if (price) {
        await getPaymentLink(price);
      }
    }
  });
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
