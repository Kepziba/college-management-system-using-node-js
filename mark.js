const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the database connection

// Get all marks
router.get('/', (req, res) => {
    db.query('SELECT * FROM Mark_details', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving marks');
        } else {
            res.json(results);
        }
    });
});

// Create a new mark
router.post('/create', (req, res) => {
    const { Student_id, Subject_id, Marks } = req.body; // Destructure the request body to get mark details
    db.query('INSERT INTO Mark_details (Student_id, Subject_id, Marks) VALUES (?, ?, ?)', [Student_id, Subject_id, Marks], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding mark');
        } else {
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    });
});

// Read all marks from the database
router.get('/read/:studid/:subid', (req, res) => {
    const studentId = req.params.studid; // Extract the student ID from the request parameters
    const subjectId = req.params.subid; // Extract the subject ID from the request parameters
    db.query('SELECT * FROM Mark_details where Student_id= ? AND Subject_id= ?', [studentId, subjectId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving marks');
        } else {
            res.json(results);
        }
    });
});

// Update a mark by ID
router.put('/update/:studid/:subid', (req, res) => {
    const studentId = req.params.studid; // Extract the student ID from the request parameters
    const subjectId = req.params.subid; // Extract the subject ID from the request parameters
    const { mark } = req.body; // Destructure the request body to get updated mark details
    db.query('UPDATE Mark_details SET mark = ? WHERE Student_id = ? AND Subject_id = ?', [mark, studentId, subjectId], (err, results) => {
       if (err) {
            console.error(err);
            res.status(500).send('Error updating mark');
        } else {
            res.json({ ...req.body });
        }
    });
});

// Delete a mark by ID
router.delete('/delete/:studid/:subid', (req, res) => {
    const studentId = req.params.studid; // Extract the student ID from the request parameters
    const subjectId = req.params.subid; // Extract the subject ID from the request parameters
    db.query('DELETE FROM Mark_details WHERE Student_id = ? AND Subject_id = ?', [studentId, subjectId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting mark');
        } else {
            res.json({ message: 'Mark deleted successfully' });
        }
    });
});

module.exports = router; // Export the router to use in other files