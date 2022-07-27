// the array to hold todo Items
let toDoItems = [];
const list = document.querySelector('.app_tasks');

function updateItemsCount() {
    let count = document.querySelectorAll('div.task.active').length;
    document.querySelector('.items_count').innerHTML = count.toString()+" items left";
}


function renderTodo(todo) {
    const item = document.querySelector(`[data-key='${todo.id}']`);
    const isActive = todo.completed ? 'completed' : 'active';
    const node = document.createElement("div");
    node.setAttribute('class', 'task item ' + isActive);
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
    <input id="${todo.id}" class="checkbox js-check ${isActive}" type="checkbox" maxlength="200" ><p>${todo.text}</p><button class="delete_btn js-delete-task"></button>`;

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
    updateItemsCount();
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
    updateItemsCount();
}

function deleteTodo(key) {
    item = document.querySelector(`div[data-key="${key}"]`)

    // remove from todo array
    toDoItems = toDoItems.filter(item => item.id !== Number(key));
    // remove from DOM
    item.remove();
    updateItemsCount();
}

// type todo and press Enter to add it to bottom of list
$("input[type='text']").keypress(function (e) {
    if (e.which === 13 && $(this).val()) {
        //grab text
        const text = $(this).val();

        todo = addTodo(text);
        renderTodo(todo);

        updateItemsCount();

        //clear text
        $(this).val("");
    }
});

list.addEventListener('click', event => {
    // click on the checkbox to check the item as completed
    if (event.target.classList.contains('js-check')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleCompleted(itemKey);
    }
    // Click on the X button to delete task
    if (event.target.classList.contains('js-delete-task')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.querySelector('.clear_btn').addEventListener('click', event => {
    document.querySelectorAll('.task.completed').forEach(e => e.remove());
    toDoItems = toDoItems.filter(obj => {
        return !obj.completed;
    });
    console.log(toDoItems);
});

// click on the filter options to filter tasks by: all, active, completed
filters = document.querySelector('.app__filters');

filters.addEventListener('click', event => {
    if (event.target.id == 'showAll') {
        $(".task").show();
    } else if (event.target.id == 'showActive') {
        $(".task.completed").hide();
        $(".task.active").show();
    } else if (event.target.id == 'showCompleted') {
        $(".task.active").hide();
        $(".task.completed").show();
    }

});

updateItemsCount();