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
  <MoveButton dest={props.dest}
  act={props.cat} movetodestination={props.movetodestination} 
  movestatus={props.move} changemove={props.changemove}  
  lenel={props.lenel} />
<Button changesettings={props.setmove} checkallel={ props.checkallel}  
 length={props.length} 
 lenel={props.lenel} />
<Deletebutton  move={props.move}      actcat={props.actcat} delete1={props.delete1}  pc={props.data} 
 checkall1={props.checkall} length={props.length} 
i={props.i}/>
</div>
 
  }



  {props.move  
  &&  
  
  < >   <MoveButton dest={props.dest}
  act={props.act} movetodestination={props.movetodestination} 
  movestatus={props.move} changemove={props.changemove}  
  lenel={props.lenel} />

  <TreeMove  style={{paddingTop:"100px"}}  changeintree={props.changedata}
    changedest={props.changedest}
    
    dest={props.dest}
    actcat={props.actcat}
    move={props.move}
 
     changeparent={props.changeparent}
     config={props.config}
     familyTree={tree.children}
     changeconfig={props.changeconfig}
     settings={props.settings}
     ac={props.ac} 
     pc={props.pc} id={0} depth={0} p={0} pdepth={-1} pid={0}

     parent={props.parent} /> 
 
 </>
}  


 </>
    )
}
export default Selected;