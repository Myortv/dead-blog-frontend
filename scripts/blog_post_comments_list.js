import { getCommentsByPostId, postComment } from "../api/blog_post_comment.js";
import {settings} from "../config/settings.js";


const LIMIT = 10;
const blogPostPageUrl = 'blog_post_page.html'

function getBlogPostIdFromUrl() {
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

function makeShortComment(comment) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.classList.add('comments-container');
    commentsContainer.classList.add('card-container');

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');
    commentContainer.classList.add('card');

    const username = document.createElement('a');
    username.classList.add('username');
    username.classList.add('card-item');
    username.textContent = comment.user_name;
    // title.href = `${blogcommentPageUrl}?id=${comment.id}`

    const body = document.createElement('div');
    body.classList.add('comment-body');
    body.classList.add('card-item');
    body.textContent = comment.body;

    const created_at = document.createElement('div');
    created_at.classList.add('comment-time');
    created_at.classList.add('card-item');
    created_at.innerHTML= `created at: <span class=\"selected-text\">${comment.created_at}</span>`;


    commentContainer.appendChild(username);
    commentContainer.appendChild(body);
    commentContainer.appendChild(created_at);

    commentsContainer.appendChild(commentContainer);
}

async function populateComments() {
    const postId = getBlogPostIdFromUrl();

    let offset = 0;
    const limit = LIMIT;

    loadCommentsElement(
        postId,
        offset,
        limit
    )
}


async function loadCommentsElement(
    postId,
    offset,
    limit
) {
    const commentsContainer = document.getElementById('comments-container');
    const paginator = document.getElementById('comments-paginator');
    const comments_page = await getCommentsByPostId(
        postId,
        offset,
        limit,
    );

    removeAllChildNodes(commentsContainer);

    if ('status' in comments_page & comments_page.status === 404) {
        commentsContainer.innerHTML = `<p>${settings.postCommentsEmpty}</p>`;
        return
    } else {
        comments_page.comments.forEach(post => {
            makeShortComment(post);
        });
    }
    paginator.innerHTML = getPaginatorHTML(
        comments_page.total,
        offset,
        limit,
    );
    updatePaginator(
        comments_page.total,
        offset,
        limit,
        postId,
    );

}

function updatePaginator(
    totalComments,
    currentOffset,
    limit,
    postId,
) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    if (prevButton) {
        prevButton.addEventListener('click', function () {
            if (currentOffset - limit >= 0) {
                currentOffset -= limit;
                loadCommentsElement(postId, currentOffset, limit);
            }
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', function () {
            if (currentOffset + limit < totalComments) {
                currentOffset += limit;
                loadCommentsElement(postId, currentOffset, limit);
            }
        });
    }
}


document.getElementById('commentForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const postId = getBlogPostIdFromUrl();


    const user_name = document.getElementById('user_name').value;
    const body = document.getElementById('body').value;

    const commentData = {
        blog_post_id: postId,
        user_name: user_name,
        body: body,
    };
    await postComment(commentData, postId);
    location.reload();

});


document.addEventListener('DOMContentLoaded', populateComments);
