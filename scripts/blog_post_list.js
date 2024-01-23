import { notificationWrapApiCall } from "../utils/exceptions.js";
import { notificationManager } from "../utils/notificaiotns.js";

import {
    apiDeletePost,
    DELETE_RESPONSES,
    getPostsPageByCategory,
    POSTS_RESPONSES,
} from "../api/blog_post.js";


const LIMIT = 10;
const blogPostPageUrl = 'blog_post_page.html'
const blogPostEditUrl = 'blog_post_edit.html'

function getCategoryIdFromUrl() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get('id');
}


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function getPaginatorHTML(total, currentOffset, limit) {
    let result = ''
    result += '<button id="prev-button">Previous</button>'
    result += `<span>${Math.floor(currentOffset / limit) + 1} / ${Math.ceil(total/limit)}</span>`
    result += '<button id="next-button">Next</button>'
    return result
}

function makeShortPost(post) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.classList.add('posts-container');

    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    postContainer.classList.add('card');

    const title = document.createElement('a');
    title.classList.add('title');
    title.classList.add('card-item');
    title.textContent = post.title;
    title.href = `${blogPostPageUrl}?id=${post.id}`

    const caption = document.createElement('div');
    caption.classList.add('post-caption');
    caption.classList.add('card-item');
    caption.innerHTML = post.caption;

    const created_at = document.createElement('div');
    created_at.classList.add('post-time');
    created_at.innerHTML= `created at: <span class=\"selected-text\">${post.created_at}</span>`;

    const updated_at = document.createElement('div');
    updated_at.classList.add('post-time');
    updated_at.innerHTML= `updated at: <span class=\"selected-text\">${post.updated_at}</span>`;
    const timeElement = document.createElement('div')
    timeElement.classList.add('card-item')

    postContainer.appendChild(title);
    postContainer.appendChild(caption);
    timeElement.appendChild(created_at);
    timeElement.appendChild(updated_at);
    postContainer.appendChild(timeElement);

    const access_token = localStorage.getItem('access_token')
    if (access_token) {
        const editLink= document.createElement('a');
        editLink.classList.add('action')
        editLink.textContent = 'EDIT';
        editLink.href = `${blogPostEditUrl}?id=${post.id}`;

        const deleteLink = document.createElement('a');
        deleteLink.classList.add('action')
        deleteLink.textContent = 'DELETE';
        deleteLink.href = `#`
        deleteLink.onclick = () => deleteBlogPost(post.id);

        const manageElement = document.createElement('div')
        manageElement.classList.add('card-item')

        manageElement.appendChild(editLink);
        manageElement.appendChild(deleteLink);
        postContainer.appendChild(manageElement);
    }

    postsContainer.appendChild(postContainer);
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

async function populatePosts() {
    const categoryId = getCategoryIdFromUrl();

    let offset = 0;
    const limit = LIMIT;

    loadPostsPage(
        categoryId,
        offset,
        limit
    )
}

async function loadPostsPage(
    categoryId,
    offset,
    limit
) {
    const postsContainer = document.getElementById('posts-container');
    const paginator = document.getElementById('paginator');
    const posts_page = await notificationWrapApiCall(
        getPostsPageByCategory,
        POSTS_RESPONSES,
        categoryId,
        offset,
        limit,
    );
    if (!(posts_page===null)) {
        removeAllChildNodes(postsContainer);

        posts_page.posts.forEach(post => {
            makeShortPost(post);
        });
        paginator.innerHTML = getPaginatorHTML(
            posts_page.total,
            offset,
            limit,
        );
        updatePaginator(
            posts_page.total,
            offset,
            limit,
            categoryId,
        );
        
    } else {
        removeAllChildNodes(postsContainer);
    }


}

function updatePaginator(
    totalPosts,
    currentOffset,
    limit,
    categoryId,
) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    if (prevButton) {
        prevButton.addEventListener('click', function () {
            if (currentOffset - limit >= 0) {
                currentOffset -= limit;
                loadPostsPage(categoryId, currentOffset, limit);
            }
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            if (currentOffset + limit < totalPosts) {
                currentOffset += limit;
                loadPostsPage(categoryId, currentOffset, limit);
            }
        });
    }
}

notificationManager.addNotificationArea('notification-catch-all');
document.addEventListener('DOMContentLoaded', populatePosts);
