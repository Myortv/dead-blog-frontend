import { getCategory } from "../api/blog_category.js";
import {settings} from "../config/settings.js";


async function loadCategoryPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');
    const category = await getCategory(categoryId);
    document.title = `/home/${settings.siteName}/blog/${category.title}`;

    // const focused_button = document.getElementById("focused-tab");
    // focused_button.innerText = `~/blog/${category.title}`

    const categoryHat = document.getElementById("category-hat");
    categoryHat.classList.add('category-hat');
    // categoryHat.classList.add('card');

    const title = document.createElement('h1');
    title.textContent = category.title;

    const caption = document.createElement('div');
    caption.classList.add('caption');
    caption.textContent = category.caption || settings.captionPlaceholder;

    const is_pinned = document.createElement('div');
    is_pinned.classList.add('is_pinned');
    if (category.is_pinned) {
        is_pinned.innerHTML= "pinned: <span class=\"selected-text\">Y</span>"
    } else {
        is_pinned.innerHTML= "pinned: <span class=\"selected-text\">N</span>"
    }


    categoryHat.appendChild(title);
    categoryHat.appendChild(caption);
    categoryHat.appendChild(is_pinned);
}


document.addEventListener('DOMContentLoaded', loadCategoryPage);
