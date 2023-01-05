import React, { useState } from 'react';
import "./AnimatedButton.css";
const AnimatedButton = () => {
    
    const [shake, setShake] = useState(false);
    const [out1, setOut1]=useState(false)
    const [still, setStill] =useState(false)
    const animate = () => {
        
        // Button begins to shake
        setShake(true);
        
        // Buttons stops to shake after 2 seconds
        setTimeout(() => setShake(false), 2000);
        
    }

  
    return(
        <button onClick = {animate} className = {(  shake ? `shake` : still ? "still" : null) }
    
        onMouseOut={() => setOut1(true)}>Click me</button>
    );
    
}

export default AnimatedButton;