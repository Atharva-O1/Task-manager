const addTaskButton = document.getElementById("AddTaskButton");
const taskList = document.getElementById("TaskList");

addTaskButton.addEventListener("click", function () {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (title === "" || description === "") {
        alert("Please fill in both title and description!");
        return;
    }

    const taskItem = document.createElement("li");

    taskItem.innerHTML = `
    <strong>${title}</strong><br>
    <span>${description}</span>
    <br>
    <button class="deleteBtn">Delete</button>
    `;

    taskList.appendChild(taskItem);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
});

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
        event.target.parentElement.remove();
    }
});