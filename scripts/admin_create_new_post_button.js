async function makeButton() {
    if (localStorage.getItem('access_token')) {
        const buttonContainer = document.getElementById('admin-create-post-button');
        const button = document.createElement('a')
        button.classList.add('button')
        button.textContent = 'Create New Post'
        button.href = `/pages/admin_create_blog_post.html`
        buttonContainer.appendChild(
            button
        )
    }
}

document.addEventListener('DOMContentLoaded', makeButton);
