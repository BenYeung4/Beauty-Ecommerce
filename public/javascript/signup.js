// sign up/register new account
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        try {
            const response = await fetch('/api/users', {
                method: 'post',
                body: JSON.stringify({
                    username,
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
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
