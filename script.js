const addTaskButton = document.getElementById("AddTaskButton");
const taskList = document.getElementById("TaskList");

fetch("http://127.0.0.1:5000/tasks")
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => renderTask(task));
        updateEmptyState();
    })
    .catch(error => {
        console.error("Failed to load tasks", error);
    });


addTaskButton.addEventListener("click", function () {
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {
        alert("Please fill in both title and description");
        return;
    }

    addTaskButton.disabled = true;
    addTaskButton.textContent = "Adding...";

    fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, description })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create task");
        }
        return response.json();
    })
    .then(task => {
        renderTask(task);
        titleInput.value = "";
        descriptionInput.value = "";
        updateEmptyState();
    })
    .catch(error => {
        console.error(error);
        alert("Something went wrong");
    })
    .finally(() => {
        addTaskButton.disabled = false;
        addTaskButton.textContent = "Add Task";
    });
});


taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
        event.target.parentElement.remove();
        updateEmptyState();
    }
});


function renderTask(task) {
    const taskItem = document.createElement("li");

    taskItem.innerHTML = `
        <strong>${task.title}</strong><br>
        <span>${task.description}</span><br>
        <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(taskItem);
}


function updateEmptyState() {
    const emptyState = document.getElementById("emptyState");
    if (!emptyState) return;

    emptyState.style.display =
        taskList.children.length === 0 ? "block" : "none";
}
