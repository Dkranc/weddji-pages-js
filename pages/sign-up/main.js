 // file path = <script src="https://cdn.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/sign-up/main.js"></script>
//to update cdn visit : https://purge.jsdelivr.net/gh/Dkranc/weddji-pages-js/pages/sign-up/main.js
 
 document.querySelector('.w-form').classList.remove('w-form'); // disable webflow’s default form behaviour
  
  const formData = {
	  fields: {
      fullName: '',
      email: '',
      password: ''
    },
    error: false
  };
	$app.createComponent('signup_form', formData).mount('#sign-up-form');

  supaClient.auth.getSession().then(({ data, error }) => {
    if (data && data.session) window.location.href = '/dashboard';  	
  });

  let errorSIgnUp;
  document.addEventListener('DOMContentLoaded', () => {
    errorSIgnUp = document.getElementById('signup-error-msg');
  })

  async function register(store, el, e) {
    e.preventDefault();
    
    store.error = '';

    if(!isValidEmail(store.fields.email) || !isValidPassword(store.fields.password) || !isValidName(store.fields.fullName)) {
        errorSIgnUp.style.display = 'block';
        return;
    }

    const { data, error } = await supaClient.auth.signUp({
      email: store.fields.email,
      password: store.fields.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { 
        	name: store.fields.fullName, 
          approvesMarketing: document.getElementById('approvesMarketing').checked
        }
      }
    });

    if (error) {
    	store.error = error.message;
    }
    else {
      console.log('User data:', data);
      window.location.href = '/choose-template';
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
  
  
