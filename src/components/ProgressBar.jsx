import React, {useState} from "react";
import { useEffect } from "react";
import "./ProgreesBar.css";
import {tree} from "../data/dummy";
export default function ProgreesBar() {
  let [distance, setDistance] = useState([1, 1 , 1, 1]);
  const arr =["100px", "200px", "300px"]
  const [ii, setIi]=useState(0)
  const [left1, setLeft1] = useState(100)
  const [top, setTop]=useState(0)
  let t =0;
  let tt=0;
  const color =_ =>{
    setIi(ii+1);

    setTimeout(()=> color(), 50*ii)
  }
 
 const move = _ => 
    {setLeft1(left1=>left1+10);console.log(t);    t+=2
       t<200 && setTimeout(()=> move(), 100/left1)
       
  } 
  const pod = (str) => 
  {    
     tt+=2

     str=="wys" && setTop(top=>top+5) 
     str=="spod" && setTop(top=>top-5)
     str=="spod1" && setTop(top=>top+15)
     tt<10 && setTimeout(()=> pod(str), 1*tt)
     
} 

  return (
    <div className="body">
        
      <h1>Progress Bar</h1>
        <div className={"mover"} style={{position:"absolute", left:left1 + "px", top:"0px"  }}>
        <div className={distance[ii>0 ? 0 : null] ? "c1" : "d1" }
        onMouseOver={()=> {tt=0;pod("wys")}}
        onMouseOut={()=> {tt=0;pod("spod")}}
        onClick={()=> {tt=0;pod("spod1")}} >dddaaaaaaaaa</div>
        <div  className={distance[ii>1 ? 1 : null] ? "c2" : "d2" }>22222</div>
        <div className={distance[ii>2 ? 2 : null] ? "c3" : "d3" }>3333</div>
      </div>
      <div className={"spod"} style={{position:"absolute", left:left1 + "px" , top:top + "px"  }}>
      <div className="bott1">aaaa</div>
        <div className="bott">22222</div>
 
      </div>
      <div className="btn-box">
        <button onClick={() => {color();}}>Load Progress Bar</button>
      </div>

      <div id="container">
   <div id="header">header</div>
   <div id="body">     <h1>Progress Bar</h1>
        <div className={"mover"} style={{position:"relative",height:"100px", left:left1 + "px", top:"0px"  }}>
        <div className={distance[ii>0 ? 0 : null] ? "c1" : "d1" }
        onMouseOver={()=> {tt=0;pod("wys")}}
        onMouseOut={()=> {tt=0;pod("spod")}}
        onClick={()=> {tt=0;pod("spod1")}} >dddaaaaaaaaa</div>
        <div  className={distance[ii>1 ? 1 : null] ? "c2" : "d2" }>22222</div>
        <div className={distance[ii>2 ? 2 : null] ? "c3" : "d3" }>3333</div>
      </div></div>
   <div id="footer">footer</div>
</div>
    </div>
  );
}