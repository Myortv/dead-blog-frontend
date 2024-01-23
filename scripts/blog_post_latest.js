import {settings} from "../config/settings.js";
import { notificationWrapApiCall } from "../utils/exceptions.js";
import { notificationManager } from "../utils/notificaiotns.js";

import {
    apiDeletePost,
    DELETE_RESPONSES,
    getPostsPagesLatest,
    POSTS_RESPONSES,
} from "../api/blog_post.js";


const LIMIT = 10;
const blogPostPageUrl = 'pages/blog_post_page.html'
const blogPostEditUrl = 'pages/blog_post_edit.html'


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// function getPaginatorHTML(total, currentOffset, limit) {
//     let result = ''
//     if (currentOffset > 0) {
//         result += '<button id="prev-button">Previous</button>'
//     }
//     if (currentOffset + limit < total) {
//         result += '<button id="next-button">Next</button>'
//     }
//     result += `<span>${Math.floor(currentOffset / limit) + 1} / ${Math.ceil(total/limit)}</span>`
//     return result
// }

function makeShortPost(post) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.classList.add('posts-container');

    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    postContainer.classList.add('card');


    const title = document.createElement('a');
    title.classList.add('card-item');
    title.classList.add('title');
    title.textContent = post.title;
    title.href = `${blogPostPageUrl}?id=${post.id}`

    const caption = document.createElement('div');
    caption.classList.add('post-caption');
    caption.classList.add('card-item');
    caption.innerHTML = post.caption;

    const timeElement = document.createElement('div');
    timeElement.classList.add('card-item');
    
    const created_at = document.createElement('div');
    created_at.classList.add('post-time');
    created_at.innerHTML= `created at: <span class=\"selected-text\">${post.created_at}</span>`;

    const updated_at = document.createElement('div');
    updated_at.classList.add('post-time');
    updated_at.innerHTML= `updated at: <span class=\"selected-text\">${post.updated_at}</span>`;

    timeElement.appendChild(created_at);
    timeElement.appendChild(updated_at);

    postContainer.appendChild(title);
    postContainer.appendChild(caption);
    postContainer.appendChild(timeElement);
    if (localStorage.getItem('access_token')) {
        const actions = document.createElement('div');

        const editLink= document.createElement('a');
        editLink.classList.add('action')
        editLink.classList.add('card-item')
        editLink.textContent = 'EDIT';
        editLink.href = `${blogPostEditUrl}?id=${post.id}`;

        const deleteLink = document.createElement('a');
        deleteLink.classList.add('action')
        deleteLink.classList.add('card-item')
        deleteLink.textContent = 'DELETE';
        // deleteLink.href = `#?post-id=${post.id}`
        deleteLink.href = `#`
        deleteLink.onclick = () => deleteBlogPost(post.id);


        actions.appendChild(editLink);
        actions.appendChild(deleteLink);
        postContainer.append(actions);
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
    let offset = 0;
    const limit = LIMIT;

    loadPostsPage(
        offset,
        limit
    )
}
async function loadPostsPage(
    offset,
    limit
) {
    const postsContainer = document.getElementById('posts-container');
    // const paginator = document.getElementById('paginator');
    const posts_page = await notificationWrapApiCall(
        getPostsPagesLatest,
        POSTS_RESPONSES,
        offset,
        limit,
    );
    if (!(posts_page===null)) {
        removeAllChildNodes(postsContainer);

        posts_page.posts.forEach(post => {
            makeShortPost(post);
        });
        const postsTotal = document.getElementById('posts-total');
        postsTotal.textContent = posts_page.total
        // paginator.innerHTML = getPaginatorHTML(
        //     posts_page.total,
        //     offset,
        //     limit,
        // );
        // updatePaginator(
        //     posts_page.total,
        //     offset,
        //     limit,
        // );
        
    } else {
        removeAllChildNodes(postsContainer);
    }
    

}

// function updatePaginator(
//     totalPosts,
//     currentOffset,
//     limit,
// ) {
//     const prevButton = document.getElementById('prev-button');
//     const nextButton = document.getElementById('next-button');

//     if (prevButton) {
//         prevButton.addEventListener('click', function () {
//             if (currentOffset - limit >= 0) {
//                 currentOffset -= limit;
//                 loadPostsPage(currentOffset, limit);
//             }
//         });
//     }
//     if (nextButton) {
//         nextButton.addEventListener('click', function () {
//             if (currentOffset + limit < totalPosts) {
//                 currentOffset += limit;
//                 loadPostsPage(currentOffset, limit);
//             }
//         });
//     }
// }

notificationManager.addNotificationArea('notification-catch-all');
document.addEventListener('DOMContentLoaded', populatePosts);
