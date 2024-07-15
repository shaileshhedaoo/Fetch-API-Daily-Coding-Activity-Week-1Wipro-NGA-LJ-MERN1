// script.js

const BlogModule = (function() {
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

    const getData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    };

    const displayPosts = (posts) => {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    };

    const displayError = (message) => {
        const postsContainer = document.getElementById('posts');
        const errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.textContent = message;
        postsContainer.innerHTML = '';
        postsContainer.appendChild(errorElement);
    };

    const init = async () => {
        try {
            const posts = await getData(postsUrl);
            displayPosts(posts);
        } catch (error) {
            displayError('Failed to fetch data. Please try again later.');
        }
    };

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', BlogModule.init);
