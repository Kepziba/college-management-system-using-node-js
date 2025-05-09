const express = require('express');
const router = express.Router();    
const db = require('./db');

// Get all departments
router.get('/dept', (req, res) => {
    db.query('SELECT * FROM Department_details', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving departments');
        } else {
            res.json(results);
        }
    });
}); // Import the database connection

// Create a new department
router.post('/create', (req, res) => {
    const { Department_id, Department_name } = req.body; // Destructure the request body to get department details
    db.query('INSERT INTO Department_details (Department_id, Department_name) VALUES (?, ?)', [Department_id, Department_name], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding department');
        } else {
            res.status(201).json({ id: results.insertId, ...req.body });
        }
    });
});

//read all departments from the database
router.get('/read/:id', (req, res) => {
    const departmentId = req.params.id; // Extract the department ID from the request parameters
    db.query('SELECT * FROM Department_details where Department_id= ?', [departmentId],(err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving departments');
        } else {
            res.json(results);
        }
    });
}); 

// Update a department by ID
router.put('/update/:id', (req, res) => {
    const departmentId = req.params.id; // Extract the department ID from the request parameters
    const { Department_name } = req.body; // Destructure the request body to get updated department details
    db.query('UPDATE Department_details SET Department_name = ? WHERE Department_id = ?', [Department_name, departmentId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating department');
        } else {
            res.json({ id: departmentId, ...req.body });
        }
    });
}); 

// Delete a department by ID
router.delete('/delete/:id', (req, res) => {
    const departmentId = req.params.id; // Extract the department ID from the request parameters
    db.query('DELETE FROM Department_details WHERE Department_id = ?', [departmentId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting department');
        } else {
            res.json({ message: 'Department deleted successfully' });
        }
    });
}); 

module.exports = router; // Export the router to be used in other files