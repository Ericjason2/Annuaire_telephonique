// script.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!validateEmail(email)) {
        errorMessage.textContent = 'Adresse email non valide.';
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Le mot de passe doit contenir au moins 6 caractères.';
        return;
    }

    errorMessage.textContent = '';
    alert('Connexion réussie !');
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
