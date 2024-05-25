// script.js
let todo = [];
let totalTasksSpan = document.getElementById('total-tasks');
let completedTasksSpan = document.getElementById('completed-tasks');

document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('clear-completed').addEventListener('click', clearCompletedTasks);
document.getElementById('sort-tasks').addEventListener('click', sortTasks);
document.getElementById('toggle-mode').addEventListener('click', toggleDarkMode);

function addTask() {
    let taskInput = document.getElementById('task-input');
    let prioritySelect = document.getElementById('priority-select');
    let task = taskInput.value.trim();
    let priority = prioritySelect.value;

    if (task) {
        todo.push({ task, priority, completed: false });
        displayTasks();
        taskInput.value = '';
    }
}

function displayTasks() {
    let taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    let completedCount = 0;

    todo.forEach((item, index) => {
        let li = document.createElement('li');
        li.className = `priority-${item.priority} ${item.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleComplete(${index})">${item.task}</span>
            <span class="priority">${item.priority}</span>
            <button class="delete-task" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
        `;
        taskList.appendChild(li);
        if (item.completed) {
            completedCount++;
        }
    });

    totalTasksSpan.textContent = todo.length;
    completedTasksSpan.textContent = completedCount;
}

function deleteTask(index) {
    todo.splice(index, 1);
    displayTasks();
}

function toggleComplete(index) {
    todo[index].completed = !todo[index].completed;
    displayTasks();
}

function clearCompletedTasks() {
    todo = todo.filter(task => !task.completed);
    displayTasks();
}

function sortTasks() {
    todo.sort((a, b) => {
        if (a.completed === b.completed) {
            if (a.priority === b.priority) {
                return 0; 
            }
            return a.priority < b.priority ? -1 : 1;
        }
        return a.completed ? 1 : -1; 
    });
    displayTasks();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    let toggleModeButton = document.getElementById('toggle-mode');
    toggleModeButton.querySelector('i').classList.toggle('fa-moon');
    toggleModeButton.querySelector('i').classList.toggle('fa-sun');
}

displayTasks();