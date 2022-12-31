import React, { useState, useEffect } from 'react';
 
const MoveButton = (props) => {
     const[i, setI]=useState(0)
     let j=1
  const move =() =>{  
    props.move()
 
  }
 
    return ( 
        <>
         <div onClick={(e)=> { move()}} >move selected</div>  
        </>
      );
    
}

export default MoveButton;