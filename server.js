const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000

function addJSON(item){
    output = JSON.parse(fs.readFileSync('./db/db.json'))
    for (o of output){
        if (o.id == item.id){
            o.title = item.title
            o.text = item.text
            output = JSON.stringify(output)
            fs.writeFile('./db/db.json',output,(err) => console.log(err))
            return
        }
    }
    output.push(item)
    index = 0
    for (o of output){
        o.id = index
        index += 1
    }
    output = JSON.stringify(output)
    fs.writeFile('./db/db.json',output,(err) => console.log(err))
    return
}

function deleteJSON(id,res){
    output = JSON.parse(fs.readFileSync('./db/db.json'))
        res.send('Deleted')
        for (x = 0; x<output.length;x++){
            if (output[x].id == id){
                output.splice(id,1)
            }
        }
        index = 0
        for (o of output){
            o.id = index
            index += 1
        }
    output = JSON.stringify(output)
    fs.writeFile('./db/db.json',output,(err) => console.log(err))
    return
}

app.use(express.json());
app.use(express.static('public'));

app.get("/", (req,res) => res.sendFile(path.join(__dirname, './public/index.html')))
app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, './public/notes.html')))
app.get("/api/notes", (req,res) => res.json(JSON.parse(fs.readFileSync('./db/db.json'))))
app.post("/api/notes", (req,res) => addJSON(req.body))
app.delete('/api/notes/:id', (req, res) => deleteJSON(req.params.id,res))

app.listen(PORT);


