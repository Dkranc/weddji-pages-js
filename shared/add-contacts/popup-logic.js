window.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("add-contacts-btn");
    const popup = document.getElementById("add-contacts-popup");
    const close = document.getElementById("close-add-contacts");
  
    if (button && popup && close) {
      button.addEventListener("click", function () {
        popup.style.display = "flex";
      });
      close.addEventListener("click", function () {
        popup.style.display = "none";
      });
    }
  });


  //popup contacts logic
window.addEventListener("DOMContentLoaded", () => {
    const addContactsPopup = document.getElementById("add-contacts-popup");
    const googleButton = document.getElementById("google-btn");
    const googlePopup = document.getElementById("google-contacts");
    const icloudButton = document.getElementById("icloud-btn");
    const icloudPopup = document.getElementById("icloud-contacts");
    const googleClose = document.getElementById("google-close");
    const icloudClose = document.getElementById("icloud-close");
  
    googleButton.addEventListener("click", () => {
      googlePopup.style.display = "flex";
      addContactsPopup.style.display = "none";
    })
  
    icloudButton.addEventListener("click", () => {
      icloudPopup.style.display = "flex";
      addContactsPopup.style.display = "none";
    })
  
    googleClose.addEventListener("click", () => {
      googlePopup.style.display = "none";
    })
  
    icloudClose.addEventListener("click", () => {
      icloudPopup.style.display = "none";
    })
  })