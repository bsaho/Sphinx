const express = require('express');
const fs = require('fs');
// const request = require('request');

const path = require('path');
const https = require('https');
const fetch = require('node-fetch');


const parserTools = require ("./client/src/Parser");
const fileTools = require ("./client/src/fileHandling");
const bookcovers = require("bookcovers");

async function grabHelper (isbn){
  let results;
  bookcovers.withIsbn (isbn).then( res => results =  res);
  return results;
}

async function grabCover (isbn){
  const genderTrouble = '0415900433';

    const data = await bookcovers.withIsbn(genderTrouble).then (function (res) {
      return res;
    });
    
    return data;
}
// bookcovers
//   .withIsbn("9781570273148")
//   .then(results => console.log (results));

// async function grabCover (isbn){
//  url =  `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=`
// //  console.log (url);
// //  app.get(url, (req, res) => {
// //   res.send({ express: 'Hello From Express' });
// // });
//   // const response = await fetch (url);
//   // const body = await response.json ();
//   // // console.log (bodega);
//   // if (response.status !==200) throw Error (body.message);
//   // console.log (body);

//   https.get(url, (resp) => {
//   let data = '';

//   // A chunk of data has been received.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     // console.log(JSON.parse(data));
//     return JSON.parse (data);
//   });

//   // return url ;

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });


// }
// gBooks = fetch ("https://www.googleapis.com/books/v1/volumes?q=isbn:9780674004238&key=")


const xlsxFile = require('read-excel-file/node');
 
function checkReadByShelf (book){

  if (book[18]==="read"){
    return true;
  }else {
    return false;
  }
  
}

function checkReadByDate (book){

  if (book[14]!==null && book[14]!==undefined ){
    return true;
  }else {
    return false;
  }
  
}



// var workbook = XLSX.readFile('./client/src/goodreads_library_export.xlsx');
// console.log (workbook.slice (0,1));


const bodyParser = require('body-parser');
const { json } = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/goodreads', (req, res) => {
  xlsxFile('./client/src/goodreads_library_export.xlsx').then((rows) => {
    var cols = rows.slice (0,1);
    console.log (cols);
    //date read is index 14
   
    // newArray = rows.filter ( book => checkReadByDate (book) );
    readBooks = rows.filter ( book => checkReadByShelf (book) );
    fixedBooks =[]
    // console.log (readBooks.length + " " + rows.length);
    readBooks = readBooks.slice  (0,3)
  
    for (let i=0;i<readBooks.length; i++){
  
      const title = readBooks[i][1];
      const author = readBooks[i][2];
      const author_l_f = readBooks[i][3];
      const ISBN = readBooks[i][5];
      const ISBN13 = readBooks[i][6];
      const googleData = grabCover (ISBN13);
      console.log (googleData)
      ;
      const myRating = readBooks[i][7];
      const avgRating = readBooks[i][8];
      const noPages = readBooks[i][11];
      const originalPubYear = readBooks[i][13];
      const dateRead = readBooks[i][14];
      const dateAdded = readBooks[i][15];
      const myReview = readBooks[i][19];
      const readCount = readBooks[i][22];
      fixedBooks.push ({title, author, author_l_f,ISBN,ISBN13,myRating,avgRating,noPages,originalPubYear,dateRead,dateAdded,myReview,readCount,googleData});
      
    }
    
    // console.log (fixedBooks);
    try {
      fs.writeFile("allBooksGoodReads.json", JSON.stringify(fixedBooks), (err) => { 
        if (err) 
          console.log(err); 
        else { 
          console.log("File written successfully\n"); 
        //   console.log(fs.readFileSync("books.txt", "utf8")); 
        } 
      }); }catch (error){
        console.log ("Write failed " + error);
      }
    
  })
  


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
    res.send (student);
})

  // console.log (notes);
  
  // res.send(
  //   `I received your POST request. This is what you sent me: ${req.body.post}. But I want to give you something back:\n
  //   ${parserTools.Parser (jsonSamp)}`, 
  // );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
