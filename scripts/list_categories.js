import {GET_CATEGORIES_RESPONSES, getCategories} from "../api/blog_category.js";
import {settings} from "../config/settings.js";
import { notificationWrapApiCall } from "../utils/exceptions.js";
import { notificationManager } from "../utils/notificaiotns.js";



const noCategoriesHTML = '<p>. . .NO CATEGORIES. . .</p>'
const errorHTML = '<p>. . .ERROR WHILE LOADING. . .</p>'
const categoryPageUrl = 'blog_category.html'


function makeCategoryElement(category) {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    categoryContainer.classList.add('card');

    const link = document.createElement('a');
    link.classList.add('card-item');
    link.classList.add('title');
    link.textContent = category.title;
    link.href = `${categoryPageUrl}?id=${category.id}`;

    const caption = document.createElement('div');
    caption.classList.add('category-caption');
    caption.classList.add('card-item');
    caption.textContent = category.caption || settings.captionPlaceholder;

    categoryContainer.appendChild(link);
    categoryContainer.appendChild(caption);

    return categoryContainer;
}


async function populateCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    try {
        const categories = await notificationWrapApiCall(
            getCategories,
            GET_CATEGORIES_RESPONSES
        );
        if (categories.length === 0) {
            categoriesContainer.innerHTML = noCategoriesHTML;
        } else {
            categories.forEach(category => {
                const categoryElement = makeCategoryElement(category);
                categoriesContainer.appendChild(categoryElement);
            });
        }
    } catch (error) {
        console.error("WHILE CATEGORIES LOADING: ", error);
        categoriesContainer.innerHTML = errorHTML
    }

}

notificationManager.addNotificationArea('notification-catch-all');
document.addEventListener('DOMContentLoaded', populateCategories);
