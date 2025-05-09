import React, { useEffect, useState } from "react";
import "./StudentList.css";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        Student_id: "",
        Student_name: "",
        age: "",
        Student_dob: "",
        Department_id: ""
    });
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        fetch("http://localhost:8080/stud")
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error("Error fetching students:", error));
    };

    const addStudent = () => {
        const { Student_id, Student_name, age, Department_id } = newStudent;

        if (!Student_id || !Student_name || !age || !Department_id) {
            alert("Student ID, Name, Age, and Department ID are required!");
            return;
        }

        fetch("http://localhost:8080/stud/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent)
        })
        .then(response => response.json())
        .then(newStudentData => {
            setStudents([...students, newStudentData]);
            setNewStudent({
                Student_id: "",
                Student_name: "",
                age: "",
                Student_dob: "",
                Department_id: ""
            });
        })
        .catch(error => console.error("Error adding student:", error));
    };

    const readStudent = (id) => {
        const student = students.find(student => student.Student_id === id);
        setSelectedStudent(student);
    };

    const updateStudent = () => {
        const { Student_id, Student_name, age, Student_dob, Department_id } = editStudent;

        if (!Student_name || !age || !Department_id) {
            alert("All fields are required for updating!");
            return;
        }

        fetch(`http://localhost:8080/stud/update/${Student_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Student_name, age, Student_dob, Department_id })
        })
        .then(() => {
            setEditStudent(null);
            fetchStudents();
        })
        .catch(error => console.error("Error updating student:", error));
    };

    const deleteStudent = (id) => {
        fetch(`http://localhost:8080/stud/delete/${id}`, { method: "DELETE" })
            .then(() => fetchStudents())
            .catch(error => console.error("Error deleting student:", error));
    };

    return (
        <div className="student-container">
            <h2>Student Management (CRUD Operations)</h2>

            {/* Create */}
            <div className="input-group">
                <input
                    type="number"
                    placeholder="Student ID"
                    value={newStudent.Student_id}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, Student_id: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Student Name"
                    value={newStudent.Student_name}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, Student_name: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={newStudent.age}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, age: e.target.value })
                    }
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={newStudent.Student_dob}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, Student_dob: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Department ID"
                    value={newStudent.Department_id}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, Department_id: e.target.value })
                    }
                />
                <button onClick={addStudent}>Add Student</button>
            </div>

            {/* View */}
            {selectedStudent && (
                <div className="selected-student">
                    <h3>Student Details</h3>
                    <p>ID: {selectedStudent.Student_id}</p>
                    <p>Name: {selectedStudent.Student_name}</p>
                    <p>Age: {selectedStudent.age}</p>
                    <p>Date of Birth: {selectedStudent.Date_of_birth ? new Date(selectedStudent.Date_of_birth).toLocaleDateString() : "N/A"}</p>
                    <p>Department ID: {selectedStudent.Department_id}</p>
                    <button onClick={() => setSelectedStudent(null)}>Close</button>
                </div>
            )}

            {/* Update */}
            {editStudent && (
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Edit Name"
                        value={editStudent.Student_name}
                        onChange={(e) =>
                            setEditStudent({ ...editStudent, Student_name: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Edit Age"
                        value={editStudent.age}
                        onChange={(e) =>
                            setEditStudent({ ...editStudent, age: e.target.value })
                        }
                    />
                    <input
                        type="date"
                        placeholder="Edit DOB"
                        value={editStudent.Student_dob}
                        onChange={(e) =>
                            setEditStudent({ ...editStudent, Student_dob: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Edit Department ID"
                        value={editStudent.Department_id}
                        onChange={(e) =>
                            setEditStudent({ ...editStudent, Department_id: e.target.value })
                        }
                    />
                    <button onClick={updateStudent}>Update</button>
                    <button onClick={() => setEditStudent(null)}>Cancel</button>
                </div>
            )}

            {/* List */}
            <ul>
                {students.map((student) => (
                    <li key={student.Student_id} className="student-item">
                        {student.Student_id} - {student.Student_name} - Age: {student.age} - Dept: {student.Department_id}
                        <div className="button-group">
                            <button onClick={() => readStudent(student.Student_id)}>View</button>
                            <button onClick={() => setEditStudent(student)}>Edit</button>
                            <button onClick={() => deleteStudent(student.Student_id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;
