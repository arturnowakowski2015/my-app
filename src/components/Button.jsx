import React, { useState } from 'react';
 
const Button = (props) => {
     
  
    return (<>
    {props.checkall1==true ?
        <div onClick={()=> props.checkallel(!props.checkall1)} >check all</div>  
        :
        <div onClick={()=> props.checkallel(!props.checkall1)} >unchecka all</div>  
    }
    </>
      );
    
}

export default Button;