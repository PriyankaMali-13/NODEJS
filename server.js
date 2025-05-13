const mysql = require('mysql2');
const express = require('express');
const app = express();

app.use(express.json());

//create mysql connection
const db = mysql.createConnection({
    host:'localhost',
    database:'testdb',
    user:'root',
    password:'root'
});

//connect to db
db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log("DB Connection Success!");    
    }
});

//create post route to add users
app.post('/users',(req,res)=>{
    const {name, city} = req.body;
    const query = "INSERT INTO users (name, city) VALUES (?, ?)"
    db.query(query,[name,city],(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Database error');
        }
        else{
            res.send('User inserted successfully');
        }
    });
});

//create get route to fetch the users
app.get('/users',(req,res)=>{
    const query = "SELECT * FROM users";
    db.query(query,(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Database error - Failed to fetch data');
        }
        res.send(results);
    });
});

//create patch route to update the users where we provide user id in code itself
app.patch('/users/:id', (req,res)=>{
    const query = "UPDATE users SET name='Ranjana' WHERE id=12";
    db.query(query, (err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Database error - Failed to update the data');     
        }
        res.send('Value Updated Successfully',results.affectedRows);
    });
});

//listen to server on port 3000
app.listen(3000,()=>{
    console.log("Server Running");
});