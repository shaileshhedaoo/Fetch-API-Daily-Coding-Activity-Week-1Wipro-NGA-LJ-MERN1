// todos.js

const TodoModule = (function() {
    const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

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

    const displayTodos = (todos) => {
        const todosContainer = document.getElementById('todos');
        todosContainer.innerHTML = '';
        todos.forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.classList.add('todo');
            todoElement.innerHTML = `
                <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? 'checked' : ''}>
                <label for="todo-${todo.id}" class="${todo.completed ? 'completed' : ''}">${todo.title}</label>
            `;
            todosContainer.appendChild(todoElement);

            const checkbox = todoElement.querySelector('input');
            checkbox.addEventListener('change', () => {
                const label = todoElement.querySelector('label');
                if (checkbox.checked) {
                    label.classList.add('completed');
                } else {
                    label.classList.remove('completed');
                }
            });
        });
    };

    const displayError = (message) => {
        const todosContainer = document.getElementById('todos');
        const errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.textContent = message;
        todosContainer.innerHTML = '';
        todosContainer.appendChild(errorElement);
    };

    const init = async () => {
        try {
            const todos = await getData(todosUrl);
            displayTodos(todos);
        } catch (error) {
            displayError('Failed to fetch data. Please try again later.');
        }
    };

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', TodoModule.init);
