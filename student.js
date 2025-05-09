const express = require('express');
const router = express.Router();        
const db = require('./db'); 

router.get('/', (req, res) => {
    db.query('SELECT * FROM Student_details', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving students');
        } else {
            res.json(results);
        }
    });
}); // Import the database connection   

// Create a new student
router.post('/create', (req, res) => {
    const { Student_id, Student_name, age, Student_dob, Department_id } = req.body; // Destructure the request body to get student details
    db.query('INSERT INTO Student_details (Student_id, Student_name, age, Date_of_birth, Department_id) VALUES (?, ?, ?, ?, ?)', [Student_id, Student_name, age, Student_dob, Department_id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding student');
        } else {
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    });
});

// read all students from the database
router.get('/read/:id', (req, res) => {
    const studentId = req.params.id; // Extract the student ID from the request parameters
    db.query('SELECT * FROM Student_details where Student_id= ?', [studentId],(err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving students');
        } else {
            res.json(results);
        }
    });
}); 

// Update a student by ID
router.put('/update/:id', (req, res) => {
    const studentId = req.params.id; // Extract the student ID from the request parameters
    const { Student_name, age, Student_dob, Department_id } = req.body; // Destructure the request body to get updated student details
    db.query('UPDATE Student_details SET Student_name = ?, age = ?, Date_of_birth = ?, Department_id = ? WHERE Student_id = ?', [Student_name, age, Student_dob, Department_id, studentId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating student');
        } else {
            res.json({ id: studentId, ...req.body });
        }
    });
}); 

//delete a student by ID

router.delete('/delete/:id', (req, res) => {
    const studentId = req.params.id; // Extract the student ID from the request parameters
    db.query('DELETE FROM Student_details WHERE Student_id = ?', [studentId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting student');
        } else {
            res.json({ message: 'Student deleted successfully' });
        }
    });
}); 

module.exports = router; // Export the router for use in other files