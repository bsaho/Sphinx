import React from "react";
import ReactModal from 'react-modal';
import PropTypes from "prop-types";


export default class Modal extends React.Component {
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

render() {
  return (
     <div>
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