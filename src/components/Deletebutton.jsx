import React, { useState } from 'react';
 
const Deletebutton = (props) => {
     
  
    return ( 
 
        <div onClick={()=> props.delete()} >delete selected</div>  
 
      );
    
}

export default Deletebutton;