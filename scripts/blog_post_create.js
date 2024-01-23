import {settings, urls} from "../config/settings.js";
import { notificationWrapApiCall } from "../utils/exceptions.js";
import { notificationManager } from "../utils/notificaiotns.js";

import {
    apiCreatePost,
    CREATE_RESPONSES,
} from "../api/blog_post.js";
import { GET_CATEGORIES_RESPONSES, getCategories } from "../api/blog_category.js";


async function createPost(){
    const post = {
        title: document.getElementById('postTitle').value,
        category_id: Number(document.getElementById('postCategory').value),
        caption: document.getElementById('postCaption').value,
        body: document.getElementById('postBody').value,
    };
    const createdPost = await notificationWrapApiCall(
        apiCreatePost,
        CREATE_RESPONSES,
        post,
    );
    if (!createdPost) {
        return
    }
    document.location.href = `${urls.blogPost}?id=${createdPost.id}`;

}

async function updateFormData(

) {
    const categories = await notificationWrapApiCall(
        getCategories,
        GET_CATEGORIES_RESPONSES,
    );
    if (!categories) {
        return
    };

    const categoryInput = document.getElementById('postCategory');
    categoryInput.innerHTML = '';

    categories.forEach(item => {
        const option = document.createElement('option');
        option.text = item.title;
        option.value = item.id;
        categoryInput.add(option);
    });    
    categoryInput.value = categories[0];
}

async function loadForm(){
    if (localStorage.getItem('access_token')===null) {
        window.location.href = '/'
    }

    // const button = document.getElementById('postCreateButton')
    // button.onclick = async () => await createPost()
    document.getElementById("postCreateButton").onclick = async () => {
      await createPost();
    };
    await updateFormData()
}

notificationManager.addNotificationArea('notification-catch-all');
document.addEventListener('DOMContentLoaded', loadForm);
