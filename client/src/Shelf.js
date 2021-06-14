import React, { Component } from 'react';
import "./table.css"
import ReactModal from 'react-modal';
import MyModal from "./Modal";
import Collapsible from 'react-collapsible';
import LazyLoad from "react-lazyload";
import placeHolder from "./nocoverimage.jpg"
class Shelf extends Component {


    constructor(props) {
        
        super(props)
        this.state = {
            currName : '',
            books: [],
            showModal : false,
            currName: ''

        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    
    }

    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }
      getNoteData = async title => {

        const response = await  fetch('/api/notesearch', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ post: title }),
         });
         const body = await  response.json();
        //  this.setState ({ notes: body.highlights});
        //  this.setState({currName: body.title});
       return body;
        //  this.handleOpenModal ();
        
        
      }  

      getDetails  = async  title =>{

        //get notes
        const notes = this.getNoteData (title).PromiseResult;
        console.log (notes);
        if (notes ===undefined){
            console.log ("No notes");
        }
        // else if (notes.len <1){
        //     console.log ("No notes");
        // }
        else {
            console.log ("We found Notes!");
        }

       

        //if notes don't exist say so

        //populate modal.

        //show modal
        

      }
  

      
      getBookCover =  url =>{
        const cover = new Image ();
        cover.src = url;
        
        if (cover.naturalHeight>1) {
            console.log ("Image good");
            return url;
        }
        else {
            console.log ("Image bad, using placeholder");
            return placeHolder;
        }
       

      }

    
  
    renderShelfData() {
        console.log (this.props.shelfData);
        if (typeof this.props.shelfData !=="undefined"){
            const smallSlice = this.props.shelfData.slice (0,11);
        return smallSlice.map((student, index) => {
           const { title, author, googleData, isbn } = student //destructuring
           const cover= this.getBookCover (googleData);
            
           return (
             <img className="thumb" key={isbn} src={cover} value={title} onClick={() => this.getDetails ("A Secular Age")}  />
           )
        })}
     }
 

    render() {
        return (
            
            <div className="Book Gallery" > 
                <h1 id='title'>Bookshelf </h1>
                {this.renderShelfData ()}
            </div>
        )
    }
}

export default Shelf;

