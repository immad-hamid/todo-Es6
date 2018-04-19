const form = document.querySelector('#task-form');          // form for tasks
const taskInput = document.querySelector('#task');         // input for tasks
const filter =  document.querySelector('#filter');          // filter input
const taskList = document.querySelector('.collection');     // task list container
const clearBtn = document.querySelector('.clear-tasks');    // clear tasks button

// load all event listners
loadEventListerners();


function loadEventListerners() {
    // add tasks
    form.addEventListener('submit', addTask);
    // remove task
    taskList.addEventListener('click', removeTask);
    // remove all tasks
    clearBtn.addEventListener('click', removeAllTasks);
};

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

        // clear the input field
        taskInput.value = '';
    }

    e.preventDefault();
}

// remove a task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log(e.target.parentElement.parentElement);
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// remove all tasks
function removeAllTasks(e) {
    // selecting all the list items
    // const taskItems = document.querySelectorAll('.collection-item');
    
    // for (let i = 0; i < taskItems.length; i++) {
    //     console.log(taskItems[i]);
    //     taskItems[i].remove();
    // }

    // faster method
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    e.preventDefault();
}






















// // Define UI Vars
// const form = document.querySelector('#task-form');
// const taskList = document.querySelector('.collection');
// const clearBtn = document.querySelector('.clear-tasks');
// const filter = document.querySelector('#filter');
// const taskInput = document.querySelector('#task');

// // Load all event listeners
// loadEventListeners();

// // Load all event listeners
// function loadEventListeners() {
//   // Add task event
//   form.addEventListener('submit', addTask);
// }

// // Add Task
// function addTask(e) {
//   if(taskInput.value === '') {
//     alert('Add a task');
//   }

//   // Create li element
//   const li = document.createElement('li');
//   // Add class
//   li.className = 'collection-item';
//   // Create text node and append to li
//   li.appendChild(document.createTextNode(taskInput.value));
//   // Create new link element
//   const link = document.createElement('a');
//   // Add class
//   link.className = 'delete-item secondary-content';
//   // Add icon html
//   link.innerHTML = '<i class="fa fa-remove"></i>';
//   // Append the link to li
//   li.appendChild(link);

//   // Append li to ul
//   taskList.appendChild(li);

//   // Clear input
//   taskInput.value = '';

//   e.preventDefault();
// }