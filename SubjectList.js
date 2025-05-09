import React, { useEffect, useState } from "react";
import "./SubjectList.css";

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState({ Department_id: "", Subject_id: "", Subject_name: "" });
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [editSubject, setEditSubject] = useState(null);

    // 1️⃣ Fetch all subjects
    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = () => {
        fetch("http://localhost:8080/sub")
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error("Error fetching subjects:", error));
    };

    // 2️⃣ Create a new subject
    const addSubject = () => {
        const { Department_id, Subject_id, Subject_name } = newSubject;

        if (!Department_id || !Subject_id || !Subject_name) {
            alert("Department ID, Subject ID, and Subject Name are required!");
            return;
        }

        fetch("http://localhost:8080/sub/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSubject)
        })
        .then(response => response.json())
        .then(newSubjectData => {
            setSubjects([...subjects, newSubjectData]);
            setNewSubject({ Department_id: "", Subject_id: "", Subject_name: "" });
        })
        .catch(error => console.error("Error adding subject:", error));
    };

    // 3️⃣ Read subject details
    const readSubject = (id) => {
        fetch(`http://localhost:8080/sub/read/${id}`)
            .then(response => response.json())
            .then(subject => setSelectedSubject(subject[0])) // Ensure correct data retrieval
            .catch(error => console.error("Error retrieving subject details:", error));
    };

    // 4️⃣ Update a subject
    const updateSubject = () => {
        const { Department_id, Subject_id, Subject_name } = editSubject;

        if (!Department_id || !Subject_name) {
            alert("All fields are required for updating!");
            return;
        }

        fetch(`http://localhost:8080/sub/update/${Subject_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Department_id, Subject_name })
        })
        .then(() => {
            setEditSubject(null);
            fetchSubjects();
        })
        .catch(error => console.error("Error updating subject:", error));
    };

    // 5️⃣ Delete a subject
    const deleteSubject = (id) => {
        fetch(`http://localhost:8080/sub/delete/${id}`, { method: "DELETE" })
        .then(() => fetchSubjects())
        .catch(error => console.error("Error deleting subject:", error));
    };

    return (
        <div className="subject-container">
            <h2>Subject Management (CRUD Operations)</h2>

            {/* Create */}
            <div className="input-group">
                <input type="number" placeholder="Department ID" value={newSubject.Department_id} onChange={(e) => setNewSubject({ ...newSubject, Department_id: e.target.value })} />
                <input type="number" placeholder="Subject ID" value={newSubject.Subject_id} onChange={(e) => setNewSubject({ ...newSubject, Subject_id: e.target.value })} />
                <input type="text" placeholder="Subject Name" value={newSubject.Subject_name} onChange={(e) => setNewSubject({ ...newSubject, Subject_name: e.target.value })} />
                <button onClick={addSubject}>Add Subject</button>
            </div>

            {/* Read */}
            {selectedSubject && (
                <div className="selected-subject">
                    <h3>Subject Details</h3>
                    <p>Department ID: {selectedSubject.Department_id}</p>
                    <p>Subject ID: {selectedSubject.Subject_id}</p>
                    <p>Subject Name: {selectedSubject.Subject_name}</p>
                    <button onClick={() => setSelectedSubject(null)}>Close</button>
                </div>
            )}

            {/* Update */}
            {editSubject && (
                <div className="input-group">
                    <input type="number" placeholder="Edit Department ID" value={editSubject.Department_id} onChange={(e) => setEditSubject({ ...editSubject, Department_id: e.target.value })} />
                    <input type="text" placeholder="Edit Subject Name" value={editSubject.Subject_name} onChange={(e) => setEditSubject({ ...editSubject, Subject_name: e.target.value })} />
                    <button onClick={updateSubject}>Update</button>
                    <button onClick={() => setEditSubject(null)}>Cancel</button>
                </div>
            )}

            {/* List */}
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.Subject_id} className="subject-item">
                        {subject.Subject_id} - {subject.Subject_name} (Dept: {subject.Department_id})
                        <div className="button-group">
                            <button onClick={() => readSubject(subject.Subject_id)}>View</button>
                            <button onClick={() => setEditSubject(subject)}>Edit</button>
                            <button onClick={() => deleteSubject(subject.Subject_id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubjectList;
