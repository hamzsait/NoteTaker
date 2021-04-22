const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

function add(item){
    
}

app.use(express.json());
app.use(express.static('public'));

app.get("/", (req,res) => res.sendFile(path.join(__dirname, './public/index.html')))
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, './public/notes.html')))
app.get("/api/notes", (req,res) => res.json(JSON.parse(fs.readFileSync('./db/db.json'))))
app.post("/api/notes", (req,res) => )


app.listen(PORT);

