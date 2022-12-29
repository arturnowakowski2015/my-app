import React,{useState, useEffect} from "react";
import "./Searching.scss"
const Searching = (props) => {
    const [d, setD]=useState(1);
    const [str, setStr] = useState("")
    const [i, setI] =useState(0)
    setTimeout(()=> {setD(0)}, 1000)
    const z = (str) =>{
        props.setValue(str)
       // setStr(str)
    }
 
useEffect(()=>{console.log(i+":  ::"+props.searchtext)
    const timer =  setTimeout(() =>    {
    setStr(props.searchtext);
    setI(0)
 
}, i*50)

}, [props.searchtext])
 
    return <div className={  "e"} ><input type="text" defaultValue 
            value={str} onChange={(e) => z(e.target.value)}></input>
                        {props.saved == 2 && <button onClick={()=>props.savetab()}>save record</button> }</div>
}

export default Searching;