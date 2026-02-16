const addTaskButton = document.getElementById("AddTaskButton");

addTaskButton.addEventListener("click", function () {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (title === "" || description === "") {
        alert("Please fill in both title and description!");
        return;
    }

    console.log("Valid input:", title, description);
});