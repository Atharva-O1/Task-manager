const addTaskButton = document.getElementById("AddTaskButton");
const taskList = document.getElementById("TaskList");

addTaskButton.addEventListener("click", function () {
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {
        alert("Please fill in both title and description");
        return;
    }


    fetch("http://127.0.0.1:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to create task");
        }
        return response.json();
    })
    .then(data => {

        const taskItem = document.createElement("li");

        taskItem.innerHTML = `
            <strong>${data.title}</strong><br>
            <span>${data.description}</span><br>
            <button class="deleteBtn">Delete</button>
        `;

        taskList.appendChild(taskItem);

        titleInput.value = "";
        descriptionInput.value = "";
    })
    .catch(error => {
        console.error(error);
        alert("Something went wrong");
    });
});

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("deleteBtn")) {
        event.target.parentElement.remove();
    }
});
