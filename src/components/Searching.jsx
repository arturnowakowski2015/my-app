import React,{useState} from "react";
import "./Searching.scss"
const Searching = (props) => {
    const [d, setD]=useState(1)
    setTimeout(()=> {setD(0)}, 1000)
    return <div className={d==1 ? "e1" :  "e"} ><input type="text" defaultValue value={d}></input></div>
}

export default Searching;