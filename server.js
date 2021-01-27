const express = require('express');
const fs = require('fs');
const path = require('path');

const parserTools = require ("./client/src/Parser");
const fileTools = require ("./client/src/fileHandling");

// try {
//   fileTools.readFilesSync ();
// }catch (error){
//   console.log (error);
// }

const bodyParser = require('body-parser');
const { json } = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});



app.get('/api/notes', (req, res) => {
  const readFile =fileTools.readFilesSync ();
  console.log (readFile);

  // const allNotes = new Promise ((resolve, reject) => {
    
  //   let notesComp = function () {
  //     fs.readFile ("./allNotes.json", (err, data) => {
  //     if (err)  return undefined ;
  //     var student = JSON.parse(data);
  //     // console.log (student);
  //     return student;
  // })} ();
  //   if (notesComp!=="undefined"){
  //     resolve (notesComp);
  //   }else{
  //     reject ("Fail");
  //   }
  // });

  // allNotes.then ((message) =>{
  //   // res.json (allNotes);
  //   console.log ("Created file with " + allNotes.length );
  // }).catch ((error) => {
  //   console.log  ("Data receive fail");
  // });
  res.send (readFile);

});


app.post('/api/world', (req, res) => {
  console.log(req.body);
  
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}. But I want to give you something back:\n
    ${parserTools.Parser (jsonSamp)}`, 
  );
});


app.post('/api/notespec', (req, res) => {
  // console.log(req.body.post);
  // notes = fileTools.readSingFile (undefined, req.body.post);

  filePath="./client/src/JSON/" + req.body.post + ".json";
  fs.readFile (filePath, (err, data) => {
    if (err)  throw err;
    var student = JSON.parse(data);
    console.log (student)
    res.send (student.highlights);
})

  // console.log (notes);
  
  // res.send(
  //   `I received your POST request. This is what you sent me: ${req.body.post}. But I want to give you something back:\n
  //   ${parserTools.Parser (jsonSamp)}`, 
  // );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
