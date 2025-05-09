const express = require("express")
const app=express();
const port=8080;
const studentRoute=require("./student")
const departmentRoute=require("./department")
const subjectRoute=require("./subject")
const markRoute=require("./mark")
const db=require("./db");
const cors=require("cors")
app.use(cors());

app.use(express.json());

//student route
app.use("/stud",studentRoute);
//department route
app.use("/dept",departmentRoute);
//subject route
app.use("/sub",subjectRoute);
//mark route
app.use("/mark", markRoute);

//test route
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});

