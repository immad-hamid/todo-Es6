// variable for the UI element on which I will bind events
const form = document.querySelector('#task-form');          // form for tasks
const taskInput = document.querySelector('#task');          // input for tasks
const filter =  document.querySelector('#filter');          // filter input
const taskList = document.querySelector('.collection');     // task list container
const clearBtn = document.querySelector('.clear-tasks');    // clear tasks button

// load all event listners
loadEventListerners();

// emmiting all the events within this funciton'f scope
function loadEventListerners() {
    // locd tasks
    document.addEventListener('DOMContentLoaded', getTasks);
    // add tasks
    form.addEventListener('submit', addTask);
    // remove task
    taskList.addEventListener('click', removeTask);
    // remove all tasks
    clearBtn.addEventListener('click', removeAllTasks);
    // filter tasks
    filter.addEventListener('keyup', filterTasks);
};

// loading the tasks onLoad
function getTasks() {
    let tasks;

    // if localStorage has no tasks then we will set it as an empty array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } 
    // else we will get the tasks saved in localStorage and save it in our array
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(
        (task) => {
            // create list item
            const li = document.createElement('li');
            // adding class to the list item
            li.className = 'collection-item';
            // append the task text to the li
            li.appendChild(document.createTextNode(task));

            // create a link
            const link = document.createElement('a');
            // adding class to the link
            link.className = 'delete-item secondary-content';
            // adding icon inside the link tag
            link.innerHTML = `<i class="fa fa-remove"></i>`;

            // append link to the li
            li.appendChild(link);

            // append the whole li to the ul
            taskList.appendChild(li);
        }
    );
}

// adding a task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add atleast one task');
    }

    else {
        // create list item
        const li = document.createElement('li');
        // adding class to the list item
        li.className = 'collection-item';
        // append the task text to the li
        li.appendChild(document.createTextNode(taskInput.value));

        // create a link
        const link = document.createElement('a');
        // adding class to the link
        link.className = 'delete-item secondary-content';
        // adding icon inside the link tag
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        // append link to the li
        li.appendChild(link);

        // append the whole li to the ul
        taskList.appendChild(li);

        // before clearing the data, saving the task to LC for which we will call a function
        storeTask(taskInput.value);

        // clear the input field
        taskInput.value = '';
    }

    e.preventDefault();
}

function storeTask(task) {
    let tasks;

    // if localStorage has no tasks then we will set it as an empty array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } 
    // else we will get the tasks saved in localStorage and save it in our array
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // pushing the current task in tasks array
    tasks.push(task);

    // and atlast saving it back again in our localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove a task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            const selectedListItem = e.target.parentElement.parentElement;
            // removing the selected item from the DOM
            selectedListItem.remove();
            // calling a funciton to remove the item from local storage also
            removeTaskFromLS(selectedListItem);
        }
    }
}

// removing single task from 
function removeTaskFromLS(taskItem) {
    let tasks;

    // if localStorage has no tasks then we will set it as an empty array
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } 
    // else we will get the tasks saved in localStorage and save it in our array
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(
        (task, index) => {
            if (taskItem.textContent === task) {
                tasks.splice(index, 1);
            }
        }
    );

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove all tasks
function removeAllTasks(e) {

    // removing all the child nodes from the DOM
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // removing all the tasks from localStorage
    localStorage.removeItem('tasks');

    e.preventDefault();
}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('.collection-item');

    tasks.forEach(
        (task) => {
            const item = task.firstChild.textContent;

            if (item.toLowerCase().indexOf(text) !== -1) {
                task.style.display = 'block';
            } else task.style.display = 'none';
        }
    );

}
