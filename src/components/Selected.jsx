import React from "react";
import MoveButton from "./MoveButton"
import Button from "./Button";
import Deletebutton from "./Deletebutton";
import TreeMove from "./TreeMove";
import {tree} from "../data/dummy"

const Selected = (props) => {
    return (
<> 
 {props.move!==1 &&  
<div className="checked" >
  <MoveButton {...props} />
<Button {...props} />
<Deletebutton  {...props} />
</div>
 
  }



  {props.move  
  &&  
  
  < >   <MoveButton {...props} />

  <TreeMove  style={{paddingTop:"100px"}} {...props} /> 
 
 </>
}  


 </>
    )
}
export default Selected;