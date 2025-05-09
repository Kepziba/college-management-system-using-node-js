const express = require('express');
const router = express.Router(); 
const db = require('./db');

// Get all subjects
router.get('/', (req, res) => {
    db.query('SELECT * FROM Subject_details', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving subjects');
        } else {
            res.json(results);
        }
    });
}); // Import the database connection

// Create a new subject
router.post('/create', (req, res) => {
    const { Department_id, Subject_id, Subject_name } = req.body; // Destructure the request body to get subject details
    db.query('INSERT INTO Subject_details (Department_id, Subject_id, Subject_name) VALUES (?, ?, ?)', [Department_id, Subject_id, Subject_name], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding subject');
        } else {
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    });
});

// Read all subjects from the database
router.get('/read/:id', (req, res) => {
    const subjectId = req.params.id; // Extract the subject ID from the request parameters
    db.query('SELECT * FROM Subject_details where Subject_id= ?', [subjectId],(err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving subjects');
        } else {
            res.json(results);
        }
    });
});

// Update a subject by ID
router.put('/update/:id', (req, res) => {
    const subjectId = req.params.id; // Extract the subject ID from the request parameters
    const { Department_id, Subject_name } = req.body; // Destructure the request body to get updated subject details
    db.query('UPDATE Subject_details SET Department_id = ?, Subject_name = ? WHERE Subject_id = ?', [Department_id, Subject_name, subjectId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating subject');
        } else {
            res.json({ id: subjectId, ...req.body });
        }
    });
});

// Delete a subject by ID
router.delete('/delete/:id', (req, res) => {
    const subjectId = req.params.id; // Extract the subject ID from the request parameters
    db.query('DELETE FROM Subject_details WHERE Subject_id = ?', [subjectId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting subject');
        } else {
            res.json({ message: 'Subject deleted successfully' });
        }
    });
});


module.exports = router;