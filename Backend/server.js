const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;
const file_path = "users.json";
app.use(express.json());
app.use(cors());
// Helper function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync(file_path);
  return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(file_path, JSON.stringify(data, null, 2));
};

// Create a new student
app.post("/students", (req, res) => {
  const students = readData();
  const newStudent = req.body;
  students.push(newStudent);
  writeData(students);
  res.status(201).send(newStudent);
});

// Get all students
app.get("/students", (req, res) => {
  const students = readData();
  res.send(students);
});

// Get a student by ID
app.get("/students/:id", (req, res) => {
  const students = readData();
  const student = students.find((s) => s.id === req.params.id);
  if (student) {
    res.send(student);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

// Update a student by ID
app.put("/students/:id", (req, res) => {
  const students = readData();
  const index = students.findIndex((s) => s.id === req.params.id);
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    writeData(students);
    res.send(students[index]);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

// Delete a student by ID
app.delete("/students/:id", (req, res) => {
  let students = readData();
  const initialLength = students.length;
  students = students.filter((s) => s.id !== req.params.id);
  if (students.length < initialLength) {
    writeData(students);
    res.send({ message: "Student deleted" });
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
