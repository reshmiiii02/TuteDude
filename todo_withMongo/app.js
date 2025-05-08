const express = require("express");
const mongoose = require("mongoose");

var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/todo", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Schema and model for tasks
const trySchema = new mongoose.Schema({
    name: String
});
const item = mongoose.model("task", trySchema);

// Default items (optional, if database is empty)
const todo = new item({
      name: "Create some videos"
});
const todo2 = new item({
    name: "Learn DSA"
});
const todo3 = new item({
    name: "Learn React"
});
const todo4 = new item({
    name: "Take some rest"
});

// Un-comment the following lines if you want to save the default items once
// todo.save();
// todo2.save();
// todo3.save();
// todo4.save();

// GET route - Render tasks
app.get("/", function (req, res) {
  item.find({})  // Find all tasks
    .then((foundItems) => {
      res.render("list", { dayej: foundItems });  // Render the list of tasks
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching tasks");
    });
});

// POST route - Add a new task
app.post("/", function (req, res) {
  const itemName = req.body.ele1;
  const todo4 = new item({ name: itemName });

  todo4.save()  // Save the new task
    .then(() => {
      res.redirect("/");  // Redirect to the homepage to see the updated list
    })
    .catch((err) => {
      res.status(500).send("Failed to save item.");
    });
});

app.post("/delete", function (req, res) {
  const checked = req.body.checkbox1;
  item.findByIdAndRemove(checked)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting item.");
    });
});

// Start server on port 4000
app.listen(4000, function () {
  console.log("Server is running ");
});
