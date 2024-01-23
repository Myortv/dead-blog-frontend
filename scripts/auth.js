import {notificationManager} from '../utils/notificaiotns.js'
import { notificationWrapApiCall } from '../utils/exceptions.js';

import {
    login,
    LOGIN_RESPONSES,
    createAccount,
    USER_CREATE_RESPONSES,
} from '../api/auth.js';


document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    signInForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('signInUsername').value;
        const password = document.getElementById('signInPassword').value;
        
        const tokens = await notificationWrapApiCall(
            login,
            LOGIN_RESPONSES,
            username,
            password
        );
        if (tokens) {
            localStorage.setItem('access_token', tokens.access_token)
            localStorage.setItem('refresh_token', tokens.refresh_token)
        } 
    });

    signUpForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('signUpUsername').value;
        const password = document.getElementById('signUpPassword').value;
        const code = document.getElementById('signUpCode').value;

        await notificationWrapApiCall(
            createAccount,
            USER_CREATE_RESPONSES,
            username,
            password,
            code,
        );
    });
});


notificationManager.addNotificationArea('notification-area-create-account');
notificationManager.addNotificationArea('notification-area-login');
