document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let title = document.getElementById("taskTitle").value;
    let dueDate = document.getElementById("taskDueDate").value;
    let priority = document.getElementById("taskPriority").value;

    if (title === '') {
        alert("Task title cannot be empty");
        return;
    }

    let task = { title, dueDate, priority, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    document.getElementById("taskTitle").value = '';
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = \`\${task.title} - Due: \${task.dueDate} - Priority: \${task.priority} 
                        <button onclick="markCompleted(\${index})">✔</button> 
                        <button onclick="deleteTask(\${index})">X</button>\`;
        if (task.completed) {
            li.classList.add("completed");
        }
        taskList.appendChild(li);
    });
}

function markCompleted(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function loadTasks() {
    displayTasks();
}
