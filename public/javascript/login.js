// login to existing account
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
      try {
          const response = await fetch('/api/users/login', {
              method: 'post',
              body: JSON.stringify({
                  email,
                  password,
              }),
              headers: { 'Content-Type': 'application/json' },
          });

          // check the response status
          if (response.ok) {
              document.location.replace('/');
          } else {
              alert(response.statusText);
          }
      } catch (error) {
          alert(error);
      }
  }
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

  
  
  //Get the button:
var mybutton = document.getElementById("myBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}