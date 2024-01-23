import {settings} from "../config/settings.js";

const apiUrl = `${settings.apiUrl}/comment`;


async function getCommentsByPostId(category_id, offset, limit) {
    try {
        const response = await fetch(
            `${apiUrl}/page/by-blog-post?post_id=${category_id}&offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("WHILE FETCHING COMMENTS: ", error)
        return [];
    }
}


async function getCommentById(comment_id) {
    try {
        const response = await fetch(
            `${apiUrl}?comment_id=${comment_id}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("WHILE FETCHING COMMENT: ", error)
        return [];
    }
}

async function postComment(comment, postId) {
    try {
        const response = await fetch(`${apiUrl}/`, {
            method: 'POST'    ,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(comment),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("WHILE POSTING COMMENT: ", error)
        return [];
    }
}


export { getCommentsByPostId};
export { getCommentById };
export { postComment };

