const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
    { id: 1, name: "Saloni", course: "MCA" },
    { id: 2, name: "Rahul", course: "MCA" },
    { id: 3, name: "Priya", course: "MCA" }
];

// : Get all students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// : Get one student 
app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// CREATE: Add a student
app.post("/api/students", (req, res) => {
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    const newId = students.length
        ? Math.max(...students.map(s => s.id)) + 1 : 1;

    const newStudent = { id: newId, name, course };
    students.push(newStudent);

    res.status(201).json(newStudent);
});

// Update a student
app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Name and course are required"
        });
    }

    student.name = name;
    student.course = course;

    res.json(student);
});

// Remove a student
app.delete("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

// text Box 
// text area 
// file append kr ke data Show 
// fs.unlink remove file
