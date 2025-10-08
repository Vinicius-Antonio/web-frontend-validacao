document.addEventListener('DOMContentLoaded', () => {

    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('senha');

        cadastroForm.addEventListener('submit', () => {
            const userCredentials = {
                email: emailInput.value.trim(),
                password: passwordInput.value
            };
            localStorage.setItem('lastRegisteredUser', JSON.stringify(userCredentials));
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        const emailInput = document.getElementById('login-email');
        const passwordInput = document.getElementById('login-senha');
        const errorMessage = document.getElementById('error-message');

        let correctEmail = 'admin@cafe.com';
        let correctPassword = '123';

        const lastRegisteredUserJSON = localStorage.getItem('lastRegisteredUser');
        if (lastRegisteredUserJSON) {
            const lastRegisteredUser = JSON.parse(lastRegisteredUserJSON);
            emailInput.value = lastRegisteredUser.email;
            correctEmail = lastRegisteredUser.email;
            correctPassword = lastRegisteredUser.password;
            localStorage.removeItem('lastRegisteredUser');
        }

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const enteredEmail = emailInput.value.trim();
            const enteredPassword = passwordInput.value;

            if (enteredEmail === correctEmail && enteredPassword === correctPassword) {
                window.location.href = 'index.html';
            } else {
                errorMessage.textContent = 'E-mail ou senha inválidos. Tente novamente.';
                errorMessage.style.display = 'block';
            }
        });
    }
});
