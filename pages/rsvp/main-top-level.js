
var dateclass = 'classdate';

$(document).ready(function() {
  var wfdc = $('.' + dateclass);

  wfdc.each(function() {
    var wfdctxt = $(this).text();

    var monthsEn = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    var monthsHe = [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר',
      'שני',
      'שלישי',
      'רביעי',
      'חמישי',
      'שישי',
      'שבת',
      'ראשון'
    ];

    for (var i = 0; i < monthsEn.length; i++) {
      wfdctxt = wfdctxt.replace(monthsEn[i], monthsHe[i]);
    }

    $(this).text(wfdctxt);
  });
});


function createGoogleCalendarEvent({ date, startTime, endHours = 2, location, groomName, brideName, linkSuffix = '' }) {
  const eventDate = new Date(`${date} ${startTime}`);
  const timeZone = 'Asia/Jerusalem';

  // Calculate end time
  const endDate = new Date(eventDate);
  endDate.setHours(eventDate.getHours() + endHours);

  // Format dates for Google Calendar
  const formatDate = (date) =>
    date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // Dynamic title with groom and bride names
  const title = `החתונה של ${groomName} ו${brideName} 🤵‍♂️👰‍♀️`;

  // Fixed description
  const description =
    'אתם מוזמנים לחגוג איתנו בחתונה המרגשת שלנו. נשמח לראותכם!';

  // Construct full link URL
  const baseLinkUrl = 'https://rsvp.weddji.com/';
  const fullLinkUrl = `${baseLinkUrl}${linkSuffix}`;

  // Construct Google Calendar URL
  const baseUrl = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatDate(eventDate)}/${formatDate(endDate)}`,
    details: `${description}\n<a href="${fullLinkUrl}" target="_blank">צפו בהזמנה שלנו</a>`,
    location: location,
    ctz: timeZone
  });

  return `${baseUrl}?${params.toString()}`;
}

function setupCalendarButton(config) {
  const button = document.querySelector('.calendar-btn');
  if (button) {
    button.addEventListener('click', function () {
      const calendarLink = createGoogleCalendarEvent(config);
      window.open(calendarLink, '_blank');
    });
  }
}
// <!-- END OF Google Calender Button -->



document.addEventListener('click', function (e) {
  const guestCountInput = document.getElementById('guests-count');

  if (e.target.id === 'guest-inc') {
    guestCountInput.stepUp(); // increments the value
    guestCountInput.dispatchEvent(new Event('input', { bubbles: true })); // trigger the input event
  } else if (e.target.id === 'guest-dec') {
    guestCountInput.stepDown(); // decrements the value
    guestCountInput.dispatchEvent(new Event('input', { bubbles: true })); // trigger the input event
  }
});

// <!-- END OF Guest Counter -->


// <!-- RSVP Form -->

  const formData = {
    fields: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      guestCount: '1',
      status: '',
    },
    wishForm: {
      fullName: '',
      desc: '',
    },
    wishes: [],
    error: ''
  };
  $app.createComponent('rsvp_form', formData).mount('#rsvp-form');
  
  async function rsvp(e) {
    e.preventDefault(); 
    e.stopImmediatePropagation(); // Prevent Webflow's form logic from running
    
    const store = $app.components.rsvp_form.store;
    store.error = '';

    try {
      const data = {
        templateSlug: window.location.pathname.split('/')[1],
        invitationSlug: window.location.pathname.split('/')[2],
        firstName: store.fields.firstName,
        lastName: store.fields.lastName,
        phoneNumber: store.fields.phoneNumber,
        guestCount: store.fields.guestCount,
        status: store.fields.status,
      };
      
      const submitBtn = rsvpFormBlock.querySelector("[type='submit']");
      const submitBtnTxt = submitBtn.value;
      submitBtn.value = submitBtn.dataset.wait;
      
      const { data: response, error } = await supaClient.functions.invoke('invite-rsvp', { body: data });
	  
      submitBtn.value = submitBtnTxt;
      if (error) {
        store.error = error.message;
        rsvpFormBlock.querySelector('.w-form-fail').style.display = 'block';
      } else {
        rsvpFormBlock.querySelector('form').style.display = 'none';
        rsvpFormBlock.querySelector('.w-form-fail').style.display = 'none';
        rsvpFormBlock.querySelector('.w-form-done').style.display = 'block';
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }
  
  const rsvpRadioBtns = document.querySelectorAll("input[type='radio'][data-name='rsvp']");
  if ( rsvpRadioBtns ) {
  	rsvpRadioBtns.forEach(rsvpRadio => {
    	rsvpRadio.addEventListener('change', (e) => {
        	$app.components.rsvp_form.store.fields.status = e.target.value;
        });
    });
  }
  
  const rsvpFormBlock = document.getElementById('rsvp-form');
  if ( rsvpFormBlock ) {
  	rsvpFormBlock.querySelector('form').addEventListener('submit', rsvp);
  }

// <!-- END OF RSVP Form -->

async function getGuestWishes() {
    try {
      const templateSlug = window.location.pathname.split('/')[1];
      const invitationSlug = window.location.pathname.split('/')[2];
  
      if (!templateSlug || !invitationSlug) {
        console.log("Template or invitation slug not found for fetching wishes.");
        return;
      }
  
      const { data, error } = await supaClient.functions.invoke(
        "get-guest-wishes",
        {
          body: { templateSlug, invitationSlug },
        }
      );
  
      if (error) throw error;
  
      if (data) {
        const store = $app.components.rsvp_form.store;
        console.log("store", store);
        store.wishes = data;
      }
    } catch (err) {
      console.error("Error fetching guest wishes:", err.message);
    }
  }


async function submitWishes(e) {
    e.preventDefault();
    const store = $app.components.rsvp_form.store;
    const fullName = store.wishForm.fullName;
    const wishDescription = store.wishForm.desc;
    const templateSlug = window.location.pathname.split('/')[1];
    const invitationSlug = window.location.pathname.split('/')[2];
    const data = {
      templateSlug,
      invitationSlug,
      fullName,
      wishDescription,
    }

    const { data: insertResult, error } = await supaClient.functions.invoke('add-guest-wish', { body: data });
    if (error) {
      console.error("Error submitting wishes:", error.message);
    } else {
      console.log("Wishes submitted successfully:", insertResult);
    }
}
  
//get guest wishes
window.addEventListener('DOMContentLoaded', async () => {
    await getGuestWishes();

    const wishesForm = document.getElementById('wf-form-Wishes-Form');
    if (wishesForm) {
        wishesForm.addEventListener('submit', submitWishes);
    }
});

