import React from "react";
const Tab = (props) => {
return <div className={props.searchi.new==props.j ? "tab-"+props.j+"-"+0 : props.searchi.old ? "tab-"+props.j+"-1" : "tab-"+props.j}
                                 key={props.j}
                                 onClick={()=> {props.setsi()}}>
                                     {props.name} </div>                  
}
export default Tab;