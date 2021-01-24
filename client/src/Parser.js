
// import sample_text from "./Kindle.Highlights_The.Crisis.of.Islam"


// getRandNote ()=>{
//     let notesJson= JSON.parse (JSON.stringify(sample_text));
//     let allNotes = notesJson.highlights;
//     const randomNote = allNotes[Math.floor(Math.random() * allNotes.length)];
//     return randomNote.text;
  
//   }
  
function Parser () {
    try{
    ntes=jQuery.getJSON("./Kindle.Highlights_The.Crisis.of.Islam")
    }catch (error){
        console.error (error);
    }
    let notesJson= JSON.parse (JSON.stringify(ntes));
    let allNotes = notesJson.highlights;
    // console.log (allNotes[1]);
    // for (let val in allNotes){
    //    console.log  ( allNotes [val].text);
    // }
    const randomNote = allNotes[Math.floor(Math.random() * allNotes.length)];
    return randomNote.text
        // for (note in notesJson){
    //     if (note instanceof (Object)){

    //     }
    

}
exports.Parser = Parser;
// export default Parser;