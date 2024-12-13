'use strict';

import * as utils from "./utils.js";

const loginBtn = utils.select('.login-btn');
const emailInput = utils.select('.email-input');
const passwordInput = utils.select('.password-input');
const pswdError = utils.select('.password-error');
const emlError = utils.select('.email-error');
const boxError = utils.select('.checkbox-error');
const checkBox = utils.select('.form-check');
const eyeBtn = utils.select('.eye-toggle');

localStorage.setItem('email', 'preet@gmail.com');
localStorage.setItem('password', 'rahaf789');

window.onload = function() {
    emailInput.value = '';
    passwordInput.value = '';
    checkBox.checked = false;
}

const clearErrorMessages = () => { 
    emlError.textContent = ''; 
    pswdError.textContent = ''; 
    boxError.textContent = ''; 
    emailInput.style.borderColor = ''; 
    passwordInput.style.borderColor = ''; 
}; 


function validateForm(storedEmail, storedPassword, isChecked) { 
    const emailValue = emailInput.value; 
    const passwordValue = passwordInput.value; 
    // Using terniary operator
    boxError.textContent = !isChecked ? 'Check the box to continue!' : '';

    emlError.textContent = storedEmail !== emailValue ? 'Email is invalid' : '';
    emailInput.style.borderColor = storedEmail !== emailValue ? '#f00' : '';

    pswdError.textContent = storedPassword !== passwordValue ? 'Password is invalid' : '';
    passwordInput.style.borderColor = storedPassword !== passwordValue ? '#f00' : '';

    return !errors.email && !errors.password && !errors.checkbox; 
}

utils.listen('click', loginBtn, (event) => {
    event.preventDefault();
    const storedEmail = localStorage.getItem('email'); 
    const storedPassword = localStorage.getItem('password');

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    const isChecked = checkBox.checked;

    if(storedEmail === emailValue && storedPassword === passwordValue && isChecked) {
        window.location.href = './detail.html';
    } else {
        validateForm(storedEmail, storedPassword, isChecked);
    }
});

utils.listen('click', eyeBtn, () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'; 
    passwordInput.setAttribute('type', type); 
    eyeBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
});


utils.listen('input', emailInput, clearErrorMessages); 
utils.listen('input', passwordInput, clearErrorMessages); 
utils.listen('change', checkBox, clearErrorMessages);