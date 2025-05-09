
const mysql=require("mysql2");


const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'college'
})

con.connect((err)=>{
    if(err)
    {
       console.log(err) 
    }
    else{
        console.log("connected !!")
    }
});
module.exports=con;