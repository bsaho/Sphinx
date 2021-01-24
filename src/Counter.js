
import React,{useState} from "react";
import Modal from "./Modal";
import "./modal.css";
import image from "./12891.png.avif"
function Counter () {

    const [count, setCount] = useState (0);
   return (
    //    <div> 
    //    <h1> Hello World</h1>
    //    </div>
           <div>
           <h1> {count}</h1> 
           <h1 onClick={ ()=> setCount (count-1)} > Subtract </h1>
           <h1 onClick={ ()=> setCount (count+1)} > Add </h1>
           </div>
   );
}

export default Counter;
