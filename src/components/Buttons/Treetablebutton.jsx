import React from "react";
const Treetablebutton =(props) =>{

    return (
        <>
        {props.treetable[1]==true && <div onClick={()=>props.on([true, false, false])}>{props.title}</div> }
        {props.treetable[1]==false && <div onClick={()=>props.on([true, true, false])}>{props.title}</div> }
        </>
    )
}

export default Treetablebutton;