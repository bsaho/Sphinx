import React, { Component } from 'react';
import './App.css';
import Table from "./Table"
import logo from './logo.svg';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    show : false, 
    showTable: false,
    columns: [
      "Book ",
      "Author ",
      "Total Notes ",
      "No. of Notes",
      "Note Content"

    ],
    noteData : [],
    shelfData : []
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

getNoteData = async () => {
  const response = await fetch ("/api/notes");
  const body = await response.json ();
  // console.log (bodega);
  if (response.status !==200) throw Error (body.message);
  this.setState ({ noteData : body});
  
  
}  

getGoodReadsData = async () => {
  const response = await fetch ("/api/goodreads");
  const body = await response.json ();
  // console.log (bodega);
  if (response.status !==200) throw Error (body.message);
  this.setState ({ shelfData : body});
  
  
}  


componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

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
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            <button onClick = {this.getNoteData}> Load Notes</button>
            <button onClick = {this.getGoodReadsData}> Load Goodreads Shelf</button>
          </div>
          
        

        </header>
        <p>{this.state.response}</p>
    


        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
        <Table columns={this.state.columns} noteData={this.state.noteData} />
        

      </div>
    );
  }
}

export default App;