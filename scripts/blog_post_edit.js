import {settings} from "../config/settings.js";
import { notificationWrapApiCall } from "../utils/exceptions.js";
import { notificationManager } from "../utils/notificaiotns.js";

import {
    getPostPage,
    POST_RESPONSES,
    apiUpdatePost,
    UPDATE_RESPONSES,
} from "../api/blog_post.js";
import { GET_CATEGORIES_RESPONSES, getCategories } from "../api/blog_category.js";


function getIdFromUrl() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get('id');
}


async function updatePost(){
    const postId = getIdFromUrl();
    const post = {
        title: document.getElementById('postTitle').value,
        category_id: Number(document.getElementById('postCategory').value),
        caption: document.getElementById('postCaption').value,
        body: document.getElementById('postBody').value,
    }
    const updated_post = await notificationWrapApiCall(
        apiUpdatePost,
        UPDATE_RESPONSES,
        postId,
        post,
    );
    if (!updated_post) {
        return
    }
    updateFormData(updated_post)

}

async function updateFormData(
    post,
) {
    const categories = await notificationWrapApiCall(
        getCategories,
        GET_CATEGORIES_RESPONSES,
    );
    if (!categories) {
        return
    }

    const categoryInput = document.getElementById('postCategory');
    categoryInput.innerHTML = '';

    categories.forEach(item => {
        const option = document.createElement('option');
        option.text = item.title;
        option.value = item.id;
        categoryInput.add(option);
    });
    categoryInput.value = post.category_id;
    
    const titleInput = document.getElementById('postTitle')
    titleInput.value = post.title

    const captionInput = document.getElementById('postCaption')
    captionInput.value = post.caption

    const bodyInput = document.getElementById('postBody')
    bodyInput.value = post.body
    
}

async function loadForm(){
    if (localStorage.getItem('access_token')===null) {
        window.location.href = '/'
    }
    const button = document.getElementById('postUpdateButton')
    button.onclick = () => updatePost()
    const postId = getIdFromUrl();
    const post = await notificationWrapApiCall(
        getPostPage,
        POST_RESPONSES,
        postId,        
    )
    if (!post){
        return
    }
    await updateFormData(post)
}

notificationManager.addNotificationArea('notification-catch-all');
document.addEventListener('DOMContentLoaded', loadForm);
