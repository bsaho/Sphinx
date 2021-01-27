import React, { Component } from 'react';
import "./table.css"
import ReactModal from 'react-modal';


class Table extends Component {
    constructor(props) {
       super(props)
       this.state = {
          currName : '',
          notes: [],
          showModal : false
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

    getNoteData = async name => {

      const response = await  fetch('/api/notespec', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ post: name.target.value }),
       });
       const body = await  response.text();
       this.setState ({notes: body});
       this.handleOpenModal ();
      
      
    }  
    
 
    renderTableHeader() {
       let header = this.props.columns
      //  console.log (header);
       return header.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
       })
    }
 
    renderTableData() {
       return this.props.noteData.map((student, index) => {
          const { filepath, title, authors, contentLen,name } = student //destructuring
          
          return (
             <tr key={filepath}>
                <td>{index}</td>
                <td>{title}</td>
                <td>{authors}</td>
                <td>{contentLen}</td>
                <td><button onClick={this.getNoteData} value={name} > Click for Notes </button> </td>
             </tr>
          )
       })
    }
 
    render() {
       return (
          <div>
             <h1 id='title'>React Dynamic Table</h1>
             <table id='books'>
                <tbody>
                   <tr>{this.renderTableHeader()}</tr>
                   {this.renderTableData()}
                </tbody>
             </table>
             <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           ariaHideApp={false}
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
        
       )
    }
 }
 
 export default Table;