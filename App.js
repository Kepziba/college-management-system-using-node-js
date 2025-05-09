import React from "react";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>College Management System</h1>
        <p>Manage Departments, Students, Subjects, and Marks efficiently</p>
      </header>

      {/* List Section */}
      <div className="list-container">
        <div className="list-item">Departments</div>
        <div className="list-item">Students</div>
        <div className="list-item">Subjects</div>
        <div className="list-item">Marks</div>
      </div>
    </div>
  );
}

export default App;
