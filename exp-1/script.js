const admissionForm = document.getElementById('admissionForm');
const successMessage = document.getElementById('success-message');

admissionForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
        successMessage.classList.remove('hidden');
    } else {
        successMessage.classList.add('hidden');
    }
});
function validateForm() {
    let isValid = true;

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const courseSelect = document.getElementById('course');
    const termsCheckbox = document.getElementById('terms');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const courseError = document.getElementById('courseError');
    const termsError = document.getElementById('termsError');

    if (fullNameInput.value.trim() === '') {
        fullNameError.textContent = 'Full Name is required.';
        isValid = false;
    } else {
        fullNameError.textContent = '';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email Address is required.';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    if (courseSelect.value === '') {
        courseError.textContent = 'Please select a course.';
        isValid = false;
    } else {
        courseError.textContent = '';
    }

    if (!termsCheckbox.checked) {
        termsError.textContent = 'You must agree to the terms and conditions.';
        isValid = false;
    } else {
        termsError.textContent = '';
    }

    return isValid;
}