const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/',(req,res)=>{
    const name = req.body.name;
    //console.log(`Welcome ${name}`);
    res.send(`Welcome ${name}`);
});

app.listen(port, (error)=>{
    if(error) console.log(error);
    else console.log(`server running on ${port}`);
    
});