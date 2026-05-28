const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// memory array
let tasks = [];

// home page
app.get("/", (req, res) => {
    res.render("home");
});

// show add task page
app.get("/add", (req, res) => {
    res.render("add");
});

// add task (post)
app.post("/add", (req, res) => {
    const newTask = {
        text: req.body.task,
        done: false
    };
    tasks.push(newTask);
    res.redirect("/success");
});


// view tasks
app.get("/view", (req, res) => {
    res.render("view", { tasks: tasks });
});

// delete task
app.get("/delete/:index", (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.redirect("/view");
});

// confirmation page
app.get("/success", (req, res) => {
    res.render("success");
});

//edit task
app.get("/edit/:index", (req, res) => {
    const index = req.params.index;
    res.render("edit", { task: tasks[index], index: index });
});

// edit task (post)
app.post("/edit/:index", (req, res) => {
    const index = req.params.index;

    tasks[index].text = req.body.task;

    tasks[index].done = false;

    res.redirect("/updated");
});

// update task (post)
app.get("/updated", (req, res) => {
    res.render("updated");
});

// mark as done
app.get("/done/:index", (req, res) => {
    const index = req.params.index;
    tasks[index].done = true;
    res.redirect("/view");
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});