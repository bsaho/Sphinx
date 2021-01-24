import React from "react";
import Modal from "./Modal";
import "./modal.css";
import image from "./12891.png.avif"
import Counter from "./Counter"
import sample_text from "./Kindle.Highlights_The.Crisis.of.Islam"


function Parser () {
    let notesJson= JSON.parse (JSON.stringify(sample_text));
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
export default Parser;