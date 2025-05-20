// file path = <script src="https://cdn.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/guests/main.js"></script>
//to update cdn visit : https://purge.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/guests/main.js

//<!-- populate page guests logic -->

	const pageData = {
  	showLoading: true,
    guests: [],
    guestsData: {
    	total: '',
    	attending: '',
      maybe: '',
      notAttending: '',
    },
    rsvpForm: {
      fields: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        guestCount: '1',
        status: '',
      },
      error: ''
    },
  }
  $app.createComponent('page_data', pageData).mount('#guests-page');

//redirect user if needed
    supaClient.auth.getUser().then(({ data, error }) => {
    if (data && data.user) {
    	// check if user purchased a template
      const user_metadata = data.user.user_metadata;
      if (user_metadata && user_metadata.isPublished && !!user_metadata.isPaying) {
        //stay
      } else if (user_metadata && user_metadata.isPublished && !user_metadata.isPaying) {
      	document.getElementById('edit-link').click();
      } else {
      	window.location.href = '/choose-template';
      }
    } else {
    	window.location.href = '/log-in';
    }  	
  });
  ///
  // get all guests
  supaClient.functions.invoke('list-rsvp', { method: 'GET' }).then(({ data, error }) => {
    $app.components.page_data.store.showLoading = false;
    if (data && data.length > 0) {
      $app.components.page_data.store.guests = data;
      addGuestItemListeners();
    }
  });
  
  // get guests data
  supaClient.functions.invoke('get-rsvp-summary', { method: 'GET' }).then(({ data, error }) => {
    data && Object.assign($app.components.page_data.store.guestsData, data);
  });
  
  /*
	supaClient.functions.invoke('list-rsvp', {
  	method: 'GET'
  })
  .then(({ data, error }) => {
  	if (error) {
    	console.log(error);
      return;
    }
    $app.components.page_data.store.showLoading = false;
    if (!data || data.length == 0) return;
    $app.components.page_data.store.guests = data;
  });
  */

//<!-- END OF populate page guests logic -->

//<!-- Add RSVP form -->

  const resetForm = () =>{
      const store = $app.components.page_data.store.rsvpForm;
        store.fields.firstName = "";
        store.fields.lastName  = "";
        store.fields.phoneNumber  = "";
        store.fields.guestCount  = "1";
        store.fields.status = "";
       
       const formEl = rsvpFormBlock.querySelector('form');
       const failEl = rsvpFormBlock.querySelector('.w-form-fail');
       const doneEl = rsvpFormBlock.querySelector('.w-form-done');

    // Fade out the success and fail messages
    fadeOut(failEl);
    fadeOut(doneEl);

    // Fade in the form
    fadeIn(formEl);
  }

function fadeIn(element, duration = 500) {
  element.style.opacity = 0;
  element.style.display = 'block';
  element.style.transition = `opacity ${duration}ms ease-in`;

  // Force reflow to make sure the transition applies
  void element.offsetWidth;

  element.style.opacity = 1;
}
function fadeOut(element, duration = 500) {
  element.style.transition = `opacity ${duration}ms ease-out`;
  element.style.opacity = 0;

  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
}

  async function rsvp(e) {
    e.preventDefault(); 
    e.stopImmediatePropagation(); // Prevent Webflow's form logic from running
    
    const store = $app.components.page_data.store.rsvpForm;
    store.error = '';

    try {
      const {data: userData , error : dataError } = await supaClient.auth.getUser();

      const data = {
        templateSlug: userData?.user?.user_metadata?.templateName,//window.location.pathname.split('/')[1],
        invitationSlug: userData?.user?.user_metadata?.invitationSlug,//window.location.pathname.split('/')[2],
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

        //update state
        $app.components.page_data.store.guests.push(data);
        addGuestItemListeners();
         supaClient.functions.invoke('get-rsvp-summary', { method: 'GET' }).then(({ data, error }) => {
         data && Object.assign($app.components.page_data.store.guestsData, data);
        });
        setTimeout(()=>{
          resetForm();
         },2500);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }
  
  const rsvpRadioBtns = document.querySelectorAll("input[type='radio'][data-name='rsvp']");
  if ( rsvpRadioBtns ) {
  	rsvpRadioBtns.forEach(rsvpRadio => {
    	rsvpRadio.addEventListener('change', (e) => {
        	$app.components.page_data.store.rsvpForm.fields.status = e.target.value;
        });
    });
  }

  const store = $app.components.page_data.store.rsvpForm;

  const addBtn = document.getElementById('guest-inc');
  addBtn.addEventListener('click', ()=>{
   if(Number(store.fields.guestCount) < 5 ){// dont allow more then 5
     store.fields.guestCount = String(Number(store.fields.guestCount) + 1);
    }
  })
  const subBtn = document.getElementById('guest-dec');
  subBtn.addEventListener('click', ()=>{
   if(Number(store.fields.guestCount) > 1 ){// dont allow 0
     store.fields.guestCount = String(Number(store.fields.guestCount) - 1);
   }
  })
  
  const rsvpFormBlock = document.getElementById('rsvp-form');
  if ( rsvpFormBlock ) {
  	rsvpFormBlock.querySelector('form').addEventListener('submit', rsvp);
  }

//<!-- END OF Add RSVP form -->

//<!--Export logic-->

    const buttons = document.querySelectorAll('.export-button');

    buttons.forEach(button => {
    button.addEventListener('click',async  () => {
    const providerId = button.getAttribute('provider');
   //document.getElementById('export').addEventListener('click', async () => {
  try {
    const { data, error } = await supaClient.functions.invoke(`list-rsvp?format=csv&externalService=${providerId}`, {
      method: 'GET'
    });

    if (error) throw error;

    // Add UTF-8 BOM and RTL marks
    const UTF8_BOM = '\uFEFF';
    const RTL_MARK = '\u202E'; // Using RTL Override character
    const LTR_MARK = '\u202C'; // Using Pop Directional Formatting
    
    // Process each line to force RTL
    const lines = data.split('\n');
    const rtlLines = lines.map(line => {
      const columns = line.split(',');
      // Add RTL mark to each cell and wrap with direction control
      const rtlColumns = columns.map(cell => RTL_MARK + cell.trim() + LTR_MARK);
      return rtlColumns.join(',');
    });
    
    const csvContent = UTF8_BOM + rtlLines.join('\n');
    
    const blob = new Blob([csvContent], { 
      type: 'text/csv;charset=utf-8-sig'
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvp-list-${new Date().toISOString().split('T')[0]}.csv`;
    
    document.body.appendChild(a);
    a.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
 });
});

//<!--End of Export logic-->

//<!-- sidebars-->
function showSidebar(sidebar) {
    setTimeout(()=>{
    sidebar.style.display = 'flex';
    sidebar.style.opacity = '1';
    },400);
  }

  function hideSidebar(sidebar) {
    sidebar.style.opacity = '0';
    sidebar.style.transition = `opacity ${fadeDuration}ms`;
    setTimeout(() => {
      sidebar.style.display = 'none';
    }, fadeDuration);
  }

document.addEventListener('DOMContentLoaded', () => {
  const exportSidebar = document.getElementById('export-sidebar');
  const importSidebar = document.getElementById('import-sidebar');

  const openExportBtn = document.getElementById('export');
  const openImportBtn = document.getElementById('import');

  const closeExportBtn = document.getElementById('close-export-btn');
  const closeImportBtn = document.getElementById('close-import-btn');

  const fadeDuration = 300; // in ms

 

  openExportBtn.addEventListener('click', () => {
    hideSidebar(importSidebar);
    showSidebar(exportSidebar);
  });

  openImportBtn.addEventListener('click', () => {
    hideSidebar(exportSidebar);
    showSidebar(importSidebar);
  });

  closeExportBtn.addEventListener('click', () => {
    hideSidebar(exportSidebar);
  });

  closeImportBtn.addEventListener('click', () => {
    hideSidebar(importSidebar);
  });
});


//<!-- sidebar-->



/*
const guestsList = {
  fields: {
    fullName: '',
    email: '',
    password: ''
  },
  error: ''
};
$app.createComponent('signup_form', formData).mount('#sign-up-form');

async function handleSelectTemplateClick(event) {
	event.preventDefault();

  if(!event.currentTarget.id) {
    console.error('No template slug provided', event.currentTarget);
    return;
  }
  
  const templateSlug = event.currentTarget.id;

  await supaClient.auth.getSession().then(async ({ data, error }) => {
  	if (error || !data || !data.session) {
      const { data, error } = await supaClient.auth.signInAnonymously();
      console.log('Anonymous sign in', data)
    }
  });
    
  const { data, error } = await supaClient.functions.invoke('select-template', {
    body: JSON.stringify({ selectedTemplate: templateSlug })
  })
  
  if (!error) {
  	console.log(data);

		window.location.href = `/template/${templateSlug}`;
  } else {
  	console.log(error);
  }
}

addOnClickToElementsWithClass('price-button', handleSelectTemplateClick);
*/

// Add RSVP form preloading and guest item click logic
function preloadRsvpForm(guest) {
  const store = $app.components.page_data.store.rsvpForm;
  store.fields.firstName = guest.firstName || '';
  store.fields.lastName = guest.lastName || '';
  store.fields.phoneNumber = guest.phoneNumber || '';
  store.fields.guestCount = guest.guestCount ? String(guest.guestCount) : '1';
  store.fields.status = guest.status || '';
}

function addGuestItemListeners() {
 const importSidebar = document.getElementById('import-sidebar');

  setTimeout(() => {
    const guestItems = document.querySelectorAll('.stacked-list1_item');
    guestItems.forEach((item, idx) => {
      item.onclick = () => {
        const guest = $app.components.page_data.store.guests[idx -1];
        showSidebar(importSidebar); // Show the form
        fadeIn(importSidebar);
        preloadRsvpForm(guest);
      };
    });
  }, 100);
}
