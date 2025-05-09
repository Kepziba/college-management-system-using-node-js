import React, { useEffect, useState } from "react";
import "./MarkList.css";

const MarkList = () => {
    const [marks, setMarks] = useState([]);
    const [newMark, setNewMark] = useState({ Student_id: "", Subject_id: "", mark: "" });
    const [selectedMark, setSelectedMark] = useState(null);
    const [editMark, setEditMark] = useState(null);

    // 1️⃣ Fetch all marks
    useEffect(() => {
        fetchMarks();
    }, []);

    const fetchMarks = () => {
        fetch("http://localhost:8080/mark")
            .then(response => response.json())
            .then(data => setMarks(data))
            .catch(error => console.error("Error fetching marks:", error));
    };

    // 2️⃣ Create a new mark
    const addMark = () => {
        const { Student_id, Subject_id, mark } = newMark;

        if (!Student_id || !Subject_id || !mark) {
            alert("Student ID, Subject ID, and Marks are required!");
            return;
        }

        fetch("http://localhost:8080/mark/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMark)
        })
        .then(response => response.json())
        .then(newMarkData => {
            setMarks([...marks, newMarkData]);
            setNewMark({ Student_id: "", Subject_id: "", mark: "" });
        })
        .catch(error => console.error("Error adding mark:", error));
    };

    // 3️⃣ Read mark details
    const readMark = (studid, subid) => {
        fetch(`http://localhost:8080/mark/read/${studid}/${subid}`)
            .then(response => response.json())
            .then(mark => setSelectedMark(mark[0])) // Ensure correct data retrieval
            .catch(error => console.error("Error retrieving mark details:", error));
    };

    // 4️⃣ Update a mark
    const updateMark = () => {
        const { Student_id, Subject_id, mark } = editMark;

        if (!mark) {
            alert("Marks are required for updating!");
            return;
        }

        fetch(`http://localhost:8080/mark/update/${Student_id}/${Subject_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mark })
        })
        .then(() => {
            setEditMark(null);
            fetchMarks();
        })
        .catch(error => console.error("Error updating mark:", error));
    };

    // 5️⃣ Delete a mark
    const deleteMark = (studid, subid) => {
        fetch(`http://localhost:8080/mark/delete/${studid}/${subid}`, { method: "DELETE" })
        .then(() => fetchMarks())
        .catch(error => console.error("Error deleting mark:", error));
    };

    return (
        <div className="mark-container">
            <h2>Mark Management (CRUD Operations)</h2>

            {/* Create */}
            <div className="input-group">
                <input type="number" placeholder="Student ID" value={newMark.Student_id} onChange={(e) => setNewMark({ ...newMark, Student_id: e.target.value })} />
                <input type="number" placeholder="Subject ID" value={newMark.Subject_id} onChange={(e) => setNewMark({ ...newMark, Subject_id: e.target.value })} />
                <input type="number" placeholder="Mark" value={newMark.mark} onChange={(e) => setNewMark({ ...newMark, mark: e.target.value })} />
                <button onClick={addMark}>Add Mark</button>
            </div>

            {/* Read */}
            {selectedMark && (
                <div className="selected-mark">
                    <h3>Mark Details</h3>
                    <p>Student ID: {selectedMark.Student_id}</p>
                    <p>Subject ID: {selectedMark.Subject_id}</p>
                    <p>Mark: {selectedMark.mark}</p>
                    <button onClick={() => setSelectedMark(null)}>Close</button>
                </div>
            )}

            {/* Update */}
            {editMark && (
                <div className="input-group">
                    <input type="number" placeholder="Edit Mark" value={editMark.mark} onChange={(e) => setEditMark({ ...editMark, mark: e.target.value })} />
                    <button onClick={updateMark}>Update</button>
                    <button onClick={() => setEditMark(null)}>Cancel</button>
                </div>
            )}

            {/* List */}
            <ul>
                {marks.map((mark) => (
                    <li key={`${mark.Student_id}-${mark.Subject_id}`} className="mark-item">
                        {mark.Student_id} - {mark.Subject_id} - {mark.mark}
                        <div className="button-group">
                            <button onClick={() => readMark(mark.Student_id, mark.Subject_id)}>View</button>
                            <button onClick={() => setEditMark(mark)}>Edit</button>
                            <button onClick={() => deleteMark(mark.Student_id, mark.Subject_id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MarkList;
