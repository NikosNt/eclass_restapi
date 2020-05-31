
//load app server using express somehow...
const express = require('express'); 
const app = express();
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('short'))// deixnei request kanei xrono klp
//app.use(morgan('combined'))// deixnei polles plirofories gia to request mas

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eclass'
})

// localhost:3003
app.listen(3003,()=>{
    console.log("Server is up and listening on 3003")
})

//Root
app.get("/",(req, res)=>{
    console.log("Responding to root route");
    res.send("Hello from ROOT")
})

//=================================================================================
app.get("/user/:id",(req, res)=>{
    console.log("Fetching user with id: " + req.params.id)
    const userId = req.params.id
    const queryString = "Select * from user where id = ?"
    connection.query(queryString, [userId] ,(err,rows,fields) => {
        if(err){
            console.log("Failed to query for users: " + err);
            res.sendStatus(500)
            return
            // throw err 
        }

        console.log("I think we fetched user succesfully");

        const users = rows.map((row) => {
           return {ID: row.id,UserName: row.username} 
        })

        res.json(users)
       // res.json(rows)
    })

   // res.end()
})

app.get("/users",(req, res)=>{
    const queryString = "Select * from user"
    connection.query(queryString,(err,rows,fields) => {
        if(err){
            console.log("Failed to query for users: " + err);
            res.sendStatus(500)
            return
            // throw err 
        }

        console.log("Fetched  succesfully");

        const users = rows.map((row) => {
            return {ID: row.id,UserName: row.username} 
         })
 
         //res.json(users)
         res.json(rows)
    })

})
app.get("/courses",(req, res)=>{
    const queryString = "Select * from course"
    connection.query(queryString,(err,rows,fields) => {
        if(err){
            console.log("Failed to query for course: " + err);
            res.sendStatus(500)
            return
            // throw err 
        }

        console.log("Fetched  succesfully");

        const course = rows.map((row) => {
            return {Title: row.title,Code: row.code} 
         })
 
         res.json(course)
        // res.json(rows)
    })

})

app.get("/document",(req, res)=>{
    const queryString = "Select * from document"
    connection.query(queryString,(err,rows,fields) => {
        if(err){
            console.log("Failed to query for document: " + err);
            res.sendStatus(500)
            return
            // throw err 
        }

        console.log("Fetched  succesfully");

        const document = rows.map((row) => {
            return {path:row.path, FIlename:row.filename, Format:row.format} 
         })
 
        res.json(document)
        //res.json(rows)
    })

})