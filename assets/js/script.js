'use strict';

import * as utils from "./utils.js";

const loginBtn = utils.select('.login-btn');
const emailInput = utils.select('.email-input');
const passwordInput = utils.select('.password-input');
const pswdError = utils.select('.password-error');
const emlError = utils.select('.email-error');
const checkBox = utils.select('.form-check');
const eyeBtn = utils.select('.eye-toggle');

localStorage.setItem('email', 'preet@gmail.com');
localStorage.setItem('password', 'rahaf789');

window.onload = function() {
    emailInput.value = '';
    passwordInput.value = '';
}

function validateForm(storedEmail, storedPassword, isChecked) { 
    const emailValue = emailInput.value; 
    const passwordValue = passwordInput.value; 
    const errors = { 
        email: '', 
        password: '', 
        checkbox: '' 
    }; 
    if(!isChecked) {
        loginBtn.style.cursor = 'not-allowed';
    }
    if (storedEmail !== emailValue) { 
        errors.email = 'Email is invalid'; 
    } 
    if (storedPassword !== passwordValue) { 
        errors.password = 'Password is invalid'; 
    } 
    emlError.textContent = errors.email || errors.checkbox; 
    pswdError.textContent = errors.password; 
    emailInput.style.borderColor = errors.email ? '#f00' : ''; 
    passwordInput.style.borderColor = errors.password ? '#f00' : ''; 
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
        validateForm(storedEmail, storedPassword);
    }
});

utils.listen('click', eyeBtn, () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'; 
    passwordInput.setAttribute('type', type); 
    eyeBtn.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye-slash"></i>' : '<i class="fa-solid fa-eye"></i>';
});
