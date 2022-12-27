import React, {useState} from "react";
import { useEffect } from "react";
import "./ProgreesBar.css";
import {tree} from "../data/dummy";
export default function ProgreesBar() {
  let [distance, setDistance] = useState([1, 1 , 1, 1]);
  const arr =["100px", "200px", "300px"]
  const [ii, setIi]=useState(0)
  const [left1, setLeft1] = useState(30)
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

t=20;
const x = () => { setLeft1(left1=>left1+31); t+=5;
    t<100 && setTimeout(() => x(), 310)
}
  return (
    <div className="body">
  

      <div id="container">
   <div id="header" onClick={() => x()} style={{clip: "rect(10px,"+(left1+70)+ "px,"+left1+"px, 20px)", position:"absolute", height:left1/10+"px"}}>

 
        <div >ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        <div style={{cursor:"pointer"}} 
        onMouseOver={()=> {tt=0;pod("wys")}}
        onMouseOut={()=> {tt=0;pod("spod")}}
        onClick={()=> {tt=0;pod("spod1")}} >dddaaaaaaaaa</div>
        <div >22222</div>
        <div >3333</div>
      </div>
 

   </div>
   <div id="body">      </div>
   <div id="footer"  style={{position:"absolute", top:left1+"px"}}>{left1} footer</div>
</div>
    </div>
  );
}