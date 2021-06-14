import React, { Component } from 'react';
import './App.css';
import Table from "./Table";
import logo from './logo.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Shelf from "./Shelf";

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    show : false, 
    showTable: false,
    showShelf : false,
    columns: [
      "Book ",
      "Author ",
      "Total Notes ",
      "No. of Notes",
      "Note Content"

    ],
    noteData : [],
    shelfData : [],
    images : []
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  hideNoteData = () =>{
    this.setState ({showTable : false });
  }

  hideGoodreads = () =>{
    this.setState ({showShelf : false });
  }

getNoteData = async () => {
  const response = await fetch ("/api/notes");
  const body = await response.json ();
  // console.log (bodega);
  if (response.status !==200) throw Error (body.message);
  this.setState ({ noteData : body});
  this.setState ({ showTable : true});
  
  
}  

getGoodReadsData = async () => {
  const response = await fetch ("/api/goodreads");
  const body = await response.json ();
  if (response.status !==200) throw Error (body.message);
  this.setState ({ shelfData : body});
  this.setState ({showShelf : true });
 

  
  
}  



  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        
          <div>
           {this.state.showTable ? <button onClick = {this.hideNoteData}> Hide Notes</button> :<button onClick = {this.getNoteData}> Load Notes</button> }
           {this.state.showShelf ?  <button onClick = {this.hideGoodreads}> Hide Goodreads Shelf</button> : <button onClick = {this.getGoodReadsData}> Load Goodreads Shelf</button> }
          </div>
          
        

        </header>
        {/* <p>{this.state.response}</p> */}
    

      
        {this.state.showTable ? <Table columns={this.state.columns} noteData={this.state.noteData}  /> : null}
        {this.state.showShelf ? <Shelf shelfData = {this.state.shelfData} /> : null}
        

      </div>
    );
  }
}

export default App;