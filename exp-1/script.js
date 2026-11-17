const admissionForm = document.getElementById('admissionForm');
const successMessage = document.getElementById('success-message');

admissionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log("Form successfully validated and submitted!");
    successMessage.classList.remove('hidden');
});