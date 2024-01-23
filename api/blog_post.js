import { settings, NOTIFICATIONS, urls} from "../config/settings.js";
import { exchange } from "./auth.js";
// import { notificationManager } from '../utils/notificaiotns.js';


const apiUrl = `${settings.apiUrl}/blog`;


async function getPostsPageByCategory(category_id, offset, limit) {
    const response = await fetch(
        `${apiUrl}/page/by-category?category_id=${category_id}&offset=${offset}&limit=${limit}`
    );
    return [response, await response.json()];
}
export const POSTS_RESPONSES = {
    'UNIFIED_HTTP_EXCEPTION-404': {
        message: NOTIFICATIONS.no_posts,
        areaId: 'notification-catch-all',
        type: 'info',
    },
    '_': {
        message: NOTIFICATIONS.undefined_error,
        areaId: 'notification-catch-all',
        type: 'warning',
    
    },
}


export async function getPostsPagesLatest(offset, limit) {
    const response = await fetch(
        `${apiUrl}/latest/?offset=${offset}&limit=${limit}`
    );
    return [response, await response.json()];
}



async function getPostPage(postId) {
    const response = await fetch(
        `${apiUrl}/?post_id=${postId}`
    );
    return [response, await response.json()]
}
export const POST_RESPONSES = {
    'UNIFIED_HTTP_EXCEPTION-404': {
        message: NOTIFICATIONS.no_post,
        areaId: 'notification-catch-all',
        type: 'info',
    },
    '_': {
        message: NOTIFICATIONS.undefined_error,
        areaId: 'notification-catch-all',
        type: 'warning',
    
    },
}


export async function apiCreatePost(
    post,
){
    console.log(post)
    console.log(post)
    console.log(post)
    console.log(post)
    console.log(post)
    const access_token = localStorage.getItem('access_token')
    const response = await fetch(`${apiUrl}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify(post),
    })
    if (!response.ok) {
        const result = await response.json()
        if (!result.hasOwnProperty('id')) {
            return [response, result]
        }
        if (result.id == settings.expiredTokenErrorId) {
            if (await exchange()) {
                return apiCreatePost( post)
            } else {
                window.location.href = urls.login
                return
            }
        } else if (result.id == settings.decodeError) {
            window.location.href = urls.login
            return
        } else {
            return
        }
    }
    return [response, await response.json()]
}
export const CREATE_RESPONSES = {
    '_': {
        message: NOTIFICATIONS.undefined_error,
        areaId: 'notification-catch-all',
        type: 'warning',
    
    },
}


export async function apiUpdatePost(
    postId,
    post,
){
    const access_token = localStorage.getItem('access_token')
    const response = await fetch(`${apiUrl}/?post_id=${postId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify(post)
    })
    if (!response.ok) {
        const result = await response.json()
        if (!result.hasOwnProperty('id')) {
            return [response, result]
        }
        if (result.id == settings.expiredTokenErrorId) {
            if (await exchange()) {
                return apiUpdatePost(postId, post)
            } else {
                window.location.href = urls.login
                return
            }
        } else if (result.id == settings.decodeError) {
            window.location.href = urls.login
            return
        } else {
            return
        }
    }
    return [response, await response.json()]
}
export const UPDATE_RESPONSES = {
    '_': {
        message: NOTIFICATIONS.undefined_error,
        areaId: 'notification-catch-all',
        type: 'warning',
    
    },
}


export async function apiDeletePost(
    postId,
){
    const access_token = localStorage.getItem('access_token')
    const response = await fetch(`${apiUrl}/?post_id=${postId}`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    })
    if (!response.ok) {
        const result = await response.json()
        if (!result.hasOwnProperty('id')) {
            return [response, result]
        }
        if (result.id == settings.expiredTokenErrorId) {
            if (await exchange()) {
                return apiDeletePost(postId, post)
            } else {
                window.location.href = urls.login
                return
            }
        } else if (result.id == settings.decodeError) {
            window.location.href = urls.login
            return
        } else {
            window.location.href = urls.login
            return
        }
    }
    return [response, await response.json()]
}
export const DELETE_RESPONSES = {
    '_': {
        message: NOTIFICATIONS.undefined_error,
        areaId: 'notification-catch-all',
        type: 'warning',
    
    },
}



export {getPostsPageByCategory};
export {getPostPage };

