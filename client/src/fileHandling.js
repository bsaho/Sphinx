const { json } = require("body-parser");
var fs = require("fs");
const path = require("path");

var testFolder = "./client/src/JSON/";

// function readMasterNotes (filePath="./allNotes.json"){
//     return new Promise(function(resolve, reject) {
//         fs.readFile (filePath, (err, data) => {
//             if (err) throw err;
//             var student = JSON.parse(data);
//             console.log (student);
//             resolve ("success");
//         })
//         });
// };


function readMasterNotes (filePath="./allNotes.json"){
    fs.readFile (filePath, (err, data) => {
        if (err)  throw err;
        var student = JSON.parse(data);
        console.log (student);
        return student;
    })

}

function getFileNames(fileArr) {

  const errorLog = [];
  const jsonArr = [];

  fileArr.forEach ((element) =>
  {
    filePath= testFolder+element.name + element.ext;
    // console.log (filePath)
    fs.readFile (filePath, (err, data) => {
        if (err) throw err;
        var student = JSON.parse(data);
        // console.log (student);
        // console.log (student.title);
        jsonArr.push (student.title);
    })

  });

//   for (let i = 0; i < fileArr.length; i++) {

//         var filePath = testFolder + fileArr[i].name + fileArr[i].ext;
//         // console.log (filePath);

//         fs.readFileSync (filePath, (err, data) => {
//             if (err) throw err;
//             let student = JSON.parse(data);
//             jsonArr.push (student.title);
//         });
        
        
   
    //     var fileName = fs.readFile (filePath);
    
    // try{
    //  let file=  JSON.parse(JSON.stringify(fileName));
    // }catch (error){
    //     errorLog.push (error);
    //     console.log ("Lol");
    // }

    // try {

    //   file  = JSON.parse(JSON.stringify(fileName));
    //   jsonArr.push(file.title);
    // } catch (error) {
    //   errorLog.push(error);
    // }

  
  return [jsonArr, errorLog];
}

function  readSingFile (dir = "./client/src/JSON/", fileName) {
  filePath= dir+fileName+".json";
  console.log (filePath);

  fs.readFile (filePath, (err, data) => {
    if (err)  throw err;
    var student = JSON.parse(data);
    console.log (student);
    return student;
})


}

/**
 * @description Read files synchronously from a folder, with natural sorting
 * @param {String} dir Absolute path to directory
 * @returns {Object[]} List of object, each object represent a file
 * structured like so: `{ filepath, name, ext, stat }`
 */
function readFilesSync(dir = "./client/src/JSON/") {
  const files = [];

  fs.readdirSync(dir).forEach((filename) => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const content = JSON.parse (fs.readFileSync (`${dir}${filename}`));
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();
    const contentLen = content.highlights.length ;
    const title = content.title; 
    const authors = content.authors;

    if (isFile) files.push({ filepath, name, ext, title, authors, contentLen });
  });

  // files.sort((a, b) => {
  //   // natural sort alphanumeric strings
  //   // https://stackoverflow.com/a/38641281
  //   return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
  // });
  try {
  fs.writeFile("allNotes.json", JSON.stringify(files), (err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("File written successfully\n"); 
    //   console.log(fs.readFileSync("books.txt", "utf8")); 
    } 
  }); }catch (error){
    console.log ("Write failed " + error);
  }

  return files;
}
exports.readFilesSync = readFilesSync;
exports.getFileNames = getFileNames;
exports.readMasterNotes = readMasterNotes;
exports.readSingFile= readSingFile;