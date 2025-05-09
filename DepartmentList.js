import React, { useEffect, useState } from "react";
import "./DepartmentList.css";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [newDept, setNewDept] = useState({ id: "", name: "" });
    const [selectedDept, setSelectedDept] = useState(null);
    const [editDept, setEditDept] = useState({ id: null, name: "" });

    // 1️⃣ Fetch all departments
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        fetch("http://localhost:8080/dept/dept")
            .then(response => response.json())
            .then(data => setDepartments(data))
            .catch(error => console.error("Error fetching departments:", error));
    };

    // 2️⃣ Create a new department (Requires Department ID)
    const addDepartment = () => {
        if (!newDept.name || !newDept.id) {
            alert("Department ID and Name are required!");
            return;
        }

        fetch("http://localhost:8080/dept/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Department_id: newDept.id, Department_name: newDept.name })
        })
        .then(response => response.json())
        .then(newDeptData => {
            setDepartments([...departments, newDeptData]); // Append new department
            setNewDept({ id: "", name: "" });
        })
        .catch(error => console.error("Error adding department:", error));
    };

    // 3️⃣ Read department details
    const readDepartment = (id) => {
        const dept = departments.find(dept => dept.Department_id === id);
        setSelectedDept(dept);
    };

    // 4️⃣ Update a department
    const updateDepartment = () => {
        if (!editDept.id || !editDept.name) {
            alert("Both ID and Name are required for updating!");
            return;
        }

        fetch(`http://localhost:8080/dept/update/${editDept.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Department_name: editDept.name })
        })
        .then(() => {
            setEditDept({ id: null, name: "" });
            fetchDepartments();
        })
        .catch(error => console.error("Error updating department:", error));
    };

    // 5️⃣ Delete a department
    const deleteDepartment = (id) => {
        fetch(`http://localhost:8080/dept/delete/${id}`, { method: "DELETE" })
        .then(() => fetchDepartments())
        .catch(error => console.error("Error deleting department:", error));
    };

    return (
        <div className="department-container">
            <h2>Department List (CRUD Operations)</h2>

            {/* Create a new department */}
            <div className="input-group">
                <input 
                    type="number" 
                    placeholder="Department ID" 
                    value={newDept.id} 
                    onChange={(e) => setNewDept({ ...newDept, id: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Department Name" 
                    value={newDept.name} 
                    onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} 
                />
                <button onClick={addDepartment}>Add Department</button>
            </div>

            {/* Read department details */}
            {selectedDept && (
                <div className="selected-dept">
                    <h3>Department Details</h3>
                    <p>ID: {selectedDept.Department_id}</p>
                    <p>Name: {selectedDept.Department_name}</p>
                    <button onClick={() => setSelectedDept(null)}>Close</button>
                </div>
            )}

            {/* Update department */}
            {editDept.id && (
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Edit Department Name" 
                        value={editDept.name} 
                        onChange={(e) => setEditDept({ ...editDept, name: e.target.value })} 
                    />
                    <button onClick={updateDepartment}>Update</button>
                    <button onClick={() => setEditDept({ id: null, name: "" })}>Cancel</button>
                </div>
            )}

            {/* Fetch and display all departments */}
            <ul>
                {departments.map(dept => (
                    <li key={dept.Department_id} className="department-item">
                        {dept.Department_id} - {dept.Department_name}
                        <div className="button-group">
                            <button onClick={() => readDepartment(dept.Department_id)}>View</button>
                            <button onClick={() => setEditDept({ id: dept.Department_id, name: dept.Department_name })}>Edit</button>
                            <button onClick={() => deleteDepartment(dept.Department_id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
