import {settings} from "../config/settings.js";
import { notificationWrapApiCall } from "../utils/exceptions.js";
import { notificationManager } from "../utils/notificaiotns.js";
import {
    apiDeletePost,
    DELETE_RESPONSES,
    getPostPage,
    POST_RESPONSES,
} from "../api/blog_post.js";

const blogPostEditUrl = 'blog_post_edit.html'

async function loadPostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const post = await notificationWrapApiCall(
        getPostPage,
        POST_RESPONSES,
        postId,
    );
    if (!post) {
        return
    }
    const outside = document.getElementById("outside");
    const postContainer = document.getElementById("post-container");
    document.title = `[${post.title}]`;

    postContainer.classList.add('posts-container');
    postContainer.classList.add('card');

    const title = document.createElement('h1');
    // title.classList.add('title');
    title.textContent = post.title;

    const body = document.createElement('div');
    body.classList.add('post-body');
    body.innerHTML = post.body;

    const timeElement = document.createElement('div')
    const created_at = document.createElement('div');
    created_at.classList.add('post-time');
    created_at.innerHTML= `created at: <span class=\"selected-text\">${post.created_at}</span>`;

    const updated_at = document.createElement('div');
    updated_at.classList.add('post-time');
    updated_at.innerHTML= `updated at: <span class=\"selected-text\">${post.updated_at}</span>`;

    timeElement.appendChild(created_at);
    timeElement.appendChild(updated_at);

    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        const editLink= document.createElement('a');
        editLink.classList.add('button')
        editLink.textContent = 'EDIT';
        editLink.href = `${blogPostEditUrl}?id=${post.id}`;

        const deleteLink = document.createElement('a');
        deleteLink.classList.add('button')
        deleteLink.textContent = 'DELETE';
        deleteLink.href = `#`
        deleteLink.onclick = () => deleteBlogPost(post.id);

        const manageElement = document.createElement('div')
        manageElement.classList.add('simple-list')
        manageElement.appendChild(editLink);
        manageElement.appendChild(deleteLink);
        outside.prepend(manageElement)
    }
    outside.prepend(title);
    // const editLink= document.createElement('a');
    // editLink.textContent = 'EDIT';
    // editLink.href = `${blogPostEditUrl}?id=${post.id}`;

    // const deleteLink = document.createElement('a');
    // deleteLink.textContent = 'DELETE';
    // // deleteLink.href = `#?post-id=${post.id}`
    // deleteLink.href = `#`
    // deleteLink.onclick = () => deleteBlogPost(post.id);

    // postContainer.appendChild(editLink);
    // postContainer.appendChild(deleteLink);
    postContainer.appendChild(timeElement);
    postContainer.appendChild(body);
}


async function deleteBlogPost(
    postId
) {
    const post = await notificationWrapApiCall(
        apiDeletePost,
        DELETE_RESPONSES,
        postId,
    )
}


notificationManager.addNotificationArea('notification-catch-all');
document.addEventListener('DOMContentLoaded', loadPostPage);
