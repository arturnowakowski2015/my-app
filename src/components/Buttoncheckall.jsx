import React, { useState } from 'react';
import "./AnimatedButton.css";
const AnimatedButton = (props) => {
    
    const [shake, setShake] = useState(false);
    const [out1, setOut1]=useState(false)
    const [still, setStill] =useState(false)
 

  
    return(
        <button 
    
        onClick={() => props.checkall(!props.checked)}>Click me</button>
    );
    
}

export default AnimatedButton;