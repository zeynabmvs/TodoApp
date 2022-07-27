// the array to hold todo Items
let toDoItems = [];
const list = document.querySelector('.app_tasks');

function renderTodo(todo) {
    const item = document.querySelector(`[data-key='${todo.id}']`);
    const isActive = todo.completed ? 'completed' : 'active';
    const node = document.createElement("div");
    node.setAttribute('class', 'task item ' + isActive);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <input id="${todo.id}" class="checkbox js-check ${isActive}" type="checkbox" maxlength="200" ><p>${todo.text}</p><button class="delete_btn"><img src="/images/icon-cross.svg" alt="Delete task"></button>`;

    if (item) {
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}

function addTodo(text) {
    const todo = {
        text,
        completed: false,
        id: Date.now()
    };

    toDoItems.push(todo);

    return todo;
}

function toggleCompleted(key) {
    // findIndex is an array method that returns the position of an element
    // in the array.
    const index = toDoItems.findIndex(item => item.id === Number(key));

    // Locate the todo item in the toDoItems array and set its checked
    // property to the opposite. That means, `true` will become `false` and vice
    // versa.
    toDoItems[index].completed = !toDoItems[index].completed;
    renderTodo(toDoItems[index]);
}

// type todo and press Enter to add it to bottom of list
$("input[type='text']").keypress(function (e) {
    if (e.which === 13) {

        //grab text
        const text = $(this).val();

        todo = addTodo(text);
        renderTodo(todo);

        // updateCount();

        //clear text
        $(this).val("");
    }
});

// click on the checkbox to check the item as completed

list.addEventListener('click', event => {
    if (event.target.classList.contains('js-check')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleCompleted(itemKey);
    }
});