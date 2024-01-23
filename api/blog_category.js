import {settings, NOTIFICATIONS} from "../config/settings.js";

const apiUrl = `${settings.apiUrl}/category/`;


async function getCategories() {
    const response = await fetch(
        `${apiUrl}get-all`
    );
    return [response, await response.json()]
}
export const GET_CATEGORIES_RESPONSES = {
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


async function getCategory(category_id) {
    try {
        const response = await fetch(
            `${apiUrl}?category_id=${category_id}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("WHILE FETCHING CATEGORY: ", error)
        return [];
    }
}


export {
    getCategories,
    getCategory,
};

