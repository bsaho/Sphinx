function Parser (sample_text) {
    console.log (`File name is ${sample_text}`)
    let notesJson= JSON.parse (JSON.stringify(sample_text));
    let allNotes = notesJson.highlights;
    // console.log (allNotes[1]);
    // for (let val in allNotes){
    //    console.log  ( allNotes [val].text);
    // }
    const randomNote = allNotes[Math.floor(Math.random() * allNotes.length)];
    return notesJson.title;
    // return randomNote.text
        // for (note in notesJson){
    //     if (note instanceof (Object)){

    //     }
    

}
exports.Parser = Parser;
