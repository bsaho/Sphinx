import React from "react";
import Modal from "./Modal";
import "./modal.css";
import image from "./12891.png.avif"
import Counter from "./Counter"
import sample_text from "./Kindle.Highlights_The.Crisis.of.Islam"
import Parser from "./Parser"



class App extends React.Component {
  state = {
    
    show: false
  };

  // const [count, setCount] = useState ();

  showModal = e => {
    
    this.setState({
      show: !this.state.show
    });
  };

  render() {
    return (
      <div className="App" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        
      <button> Lord</button>
        <button
          class="toggle-button"
          id="centered-toggle-button"
          onClick={e => {
            this.showModal(e);
          }}
        > <img src={image} className="Sphinx-logo" alt="logo"/>
          {" "}
          show Modal{" "}
        </button>


        <Modal class="modal-dialog" onClose={this.showModal} show={this.state.show}>
         
         <Parser />
         <div>
         <button > 1 Day </button>
         <button> 2 Days</button>
         <button> 3 Days </button>
         </div>
        
        </Modal>
      </div>
    );
  }
}

export default App;