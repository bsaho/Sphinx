import React, { Component } from 'react';
import "./table.css"
import ReactModal from 'react-modal';
import MyModal from "./Modal";
import Collapsible from 'react-collapsible';
// import Collapsibles from "./Collapsible.css"

class Table extends Component {
    constructor(props) {
       super(props)
       this.state = {
          currName : '',
          notes: [],
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

    getNoteData = async name => {

      const response = await  fetch('/api/notespec', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ post: name.target.value }),
       });
       const body = await  response.json();
       this.setState ({ notes: body.highlights});
       this.setState({currName: body.title});
      //  console.log (body);
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

    renderModalData () {
       const allNotes= this.state.notes;
      //  const newNotes = Array (allNotes[0]);
      //  console.log (Array.isArray (allNotes));
      //  console.log (typeof (allNotes));
      //  console.log (allNotes);
       return allNotes.map ((notes,index) =>{
          const { text } = notes 
          return (
            <Collapsible 
            triggerClassName="CustomTriggerCSS"
            triggerOpenedClassName="CustomTriggerCSS--open"
            contentOuterClassName="CustomOuterContentCSS"
            contentInnerClassName="CustomInnerContentCSS"
             easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} 
             key={index} 
             trigger={`${index}. ${text.split(" ").slice(0,20)}`} 
             >
               <p>{text}</p>
               </Collapsible>

          )
       })
    }
 
    render() {
       return (
          <div>
             <h1 id='title'>Bookshelf </h1>
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
        >  <h1>{this.state.currName}</h1>
        <button onClick={this.handleCloseModal}>Close Modal</button>
        <div  className="notesData"> 
           {this.renderModalData ()}
        </div>
         
        </ReactModal>
      </div>
        
       )
    }
 }
 
 export default Table;

 