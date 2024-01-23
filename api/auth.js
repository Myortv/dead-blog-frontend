import {settings, NOTIFICATIONS} from "../config/settings.js";
// import { notificationManager } from '../utils/notificaiotns.js';


const API_URL = settings.apiUrl


export async function exchange() {
    const refreshToken = localStorage.getItem('refresh_token')
    const response = await fetch(`${API_URL}/token/access`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {token: refreshToken,}
        )
    });
    if (response.ok) {
        const result = await response.json()
        localStorage.setItem('access_token', result.access_token)
        return true
    } else {
        return false
    }
}

export async function login(
    username,
    password,
) {
    const formData = new URLSearchParams()
    formData.append('username', username);
    formData.append('password', password);
    const response = await fetch(`${API_URL}/token/refresh`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    });

    return [response, await response.json()]
}

export const LOGIN_RESPONSES = {
    'UNIFIED_HTTP_EXCEPTION-404': {
        message: NOTIFICATIONS.user_not_exsists,
        areaId: 'notification-area-login',
        type: 'warning',
    },
    'UNIFIED_HTTP_EXCEPTION-401': {
        message: NOTIFICATIONS.user_not_authorized,
        areaId:'notification-area-login',
        type: 'warning',
    },
    'ok': {
        message: NOTIFICATIONS.user_logged_in,
        areaId:'notification-area-login',
        type: 'info',
    },
    '_': {
        message: NOTIFICATIONS.undefined_error,
        areaId:'notification-area-login',
        type: 'error',
    
    },
}


export async function createAccount(
    username,
    password,
    auth_code,
) {
    const response = await fetch(`${API_URL}/user/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { username: username, password: password, code: auth_code }
        ),
    });
    return [response, await response.json()]
}

export const USER_CREATE_RESPONSES = {
    'BLOG_USER-BAD_CODE': {
        message: NOTIFICATIONS.bad_user_code,
        areaId: 'notification-area-create-account',
        type: 'warning',
        
    },
    'PLUGINSCONTROLLERS-uniqueviolationerror': {
        message: NOTIFICATIONS.user_already_exsists,
        areaId: 'notification-area-create-account',
        type: 'warning',
        
    },
    'ok': {
        message: NOTIFICATIONS.user_created,
        areaId:'notification-area-create-account',
        type: 'info',
    },
    '_': {
        message: NOTIFICATIONS.undefined_error,
        areaId:'notification-area-create-account',
        type: 'error',
    
    },
}

