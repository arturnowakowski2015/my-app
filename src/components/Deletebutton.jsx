import React, { useState, useEffect } from 'react';
 
const Deletebutton = (props) => {
     const[i, setI]=useState(0)
     let j=1
  const del =() =>{  
    props.delete(1)
 
  }
 
    return ( 
 
        <div onClick={(e)=> { del()}} >delete selected:{props.length+"::"+j}</div>  
 
      );
    
}

export default Deletebutton;