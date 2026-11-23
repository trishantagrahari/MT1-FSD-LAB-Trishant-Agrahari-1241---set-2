const express = require('express');

const app = express();
app.use(express.json());

let students = [
    {
        id: 201,
        rollNumber: "CSE2401",
        name: "Aarav Sharma",
        branch: "CSE",
        semester: 3,
        email: "aarav@example.com"
    },
    {
        id: 202,
        rollNumber: "ECE2402",
        name: "Diya Verma",
        branch: "ECE",
        semester: 3,
        email: "diya@example.com"
    },
    {
        id: 203,
        rollNumber: "CSE2403",
        name: "Kabir Singh",
        branch: "CSE",
        semester: 3,
        email: "kabir@example.com"
    }
];

let nextId = 204;



app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});



app.post('/api/students', (req, res) => {
    const { rollNumber, name, branch, semester, email } = req.body;

    if (
        !rollNumber || typeof rollNumber !== 'string' ||
        !name || typeof name !== 'string' ||
        !branch || typeof branch !== 'string' ||
        semester === undefined || typeof semester !== 'number' ||
        !email || typeof email !== 'string'
    ) {
        return res.status(400).json({
            message: "Please enter all student details correctly"
        });
    }

    const newStudent = {
        id: nextId,
        rollNumber: rollNumber,
        name: name,
        branch: branch,
        semester: semester,
        email: email
    };

    students.push(newStudent);
    nextId++;

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});



app.get('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});



app.put('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { rollNumber, name, branch, semester, email } = req.body;

    if (
        !rollNumber || typeof rollNumber !== 'string' ||
        !name || typeof name !== 'string' ||
        !branch || typeof branch !== 'string' ||
        semester === undefined || typeof semester !== 'number' ||
        !email || typeof email !== 'string'
    ) {
        return res.status(400).json({
            message: "Please enter all student details correctly"
        });
    }

    student.rollNumber = rollNumber;
    student.name = name;
    student.branch = branch;
    student.semester = semester;
    student.email = email;

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});



app.delete('/api/students/:id',(req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});



app.get('/api/students/filter',(req, res) => {
    const branch = req.query.branch;

    if (!branch) {
        return res.status(400).json({
            message: "Please provide a branch"
        });
    }

    const result = students.filter(s =>
        s.branch.toLowerCase() === branch.toLowerCase()
    );

    res.status(200).json(result);
});



app.listen(3000,() => {
    console.log("Server is running on port 3000");
});