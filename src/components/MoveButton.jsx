import React, { useState, useEffect } from 'react';
 
const MoveButton = (props) => {
     const[i, setI]=useState(0)
     let j=1
  const move =() =>{  
    props.changemove()
 
  }
 
    return ( 
        <>
         {props.movestatus===1 && <div onClick={(e)=> {  props.movetodestination()}} >move selected</div>  }
         {props.movestatus!==1 && <div onClick={(e)=> {move()}} >choose destination</div>  }
        </>
      );
    
}

export default MoveButton;