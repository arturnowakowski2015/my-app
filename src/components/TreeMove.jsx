import React, {useState}     from "react";
import { useEffect } from "react";
import {tree} from "../data/dummy"
let c=0;
const makeids = (nodes, i) => {
    nodes && nodes.map((t) => {
      {
        if (t.depth == i)
          t.id = c++;
      }
      if (t.children) { makeids(t.children, i); }
    })
  };
  
  const makeidlev = (nodes, i, tt, depth, id) => {
    return nodes && nodes.forEach((t) => {
  
  
      t.depth = tt;
 
      t.bgcolor = "white";
  
      if (t.children) { makeidlev(t.children, 0, ++tt, depth, id); --tt }
    });
  
  };
const TreeMove = (props) => {
    const[btn, setBtn]=useState(false)
    const [familyTree, setFamilyTree] = useState(props.familyTree)
    const [destination, setDestination] =useState([0,0])
    const bck = ( nodes, depth, id) => {

 

        
        let y = nodes.map((t) => {
  
            if(t.depth==destination[0] && t.id==destination[1]) 
            t.id=12
            else t.bgcolor="white"
          if ( t.children) { bck( t.children, depth, id); }
          return t;
        });

        
        setFamilyTree(y)
        setBtn(true)
 
      }
      useEffect(()=> {
        setDestination(destination=>[props.dest[0], props.dest[1]])
 
      }, [props.changedest])
    return (
    <div> {btn ?
 props.familyTree.map((t, i) => {


    return <div key={i}
    
    
      style={{ paddingLeft: "10px", paddingTop: "5px" }} >{"depth:"+t.dep+"  id:"+ t.id+":::"+JSON.stringify(destination)}
    
    
      {t.name != props.pc[0] && <div   style={{ opacity: t.opacity, cursor: t.cursor }}

      
    
      > 
    
       {destination[0]==t.depth && destination[1]==i? <p id="text" onClick={(e) => {
 
        props.changedest(t.depth, t.id)
        setBtn(false)
        }}j

    
          className="p fw-bold"
          style={{ backgroundColor: "green" }}>{t.name} 
      
    
        </p>
        :
        <p id="text" onClick={(e) => {
            e.stopPropagation();
        props.changedest(t.depth, t.id)
        setBtn(false)
        }}j

    
          className="p fw-bold"
          style={{ backgroundColor: t.bgcolor }}>{t.name} 
      
    
        </p>}
      </div>
      }
    
      {
        t.children && <TreeMove changeintree={props.changeintree} config={props.config}
          parent={props.parent}
          changedest={props.changedest}
          dest={props.dest}
          changeconfig={props.changeconfig}
    
          changeparent={props.changeparent}
          familyTree={t.children}
          settings={props.settings}
          ac={props.ac}
          pc={props.pc} id={i} depth={props.depth + 1} />
      }
    
     </div>
    
    
    }) 
: props.familyTree.map((t, i) => {


    return <div key={i}
    
    
      style={{ paddingLeft: "10px", paddingTop: "5px" }} > 
    
    
      {t.name != props.pc[0] && <div   style={{ opacity: t.opacity, cursor: t.cursor }}

      
    
      > 
    
       {destination[0]==t.depth && destination[1]==i? <p id="text" onClick={(e) => {
 
        props.changedest(t.depth, t.id)
        setBtn(false)
        }}j

    
          className="p fw-bold"
          style={{ backgroundColor: "green" }}>{t.name} 
      
    
        </p>
        :
        <p id="text" onClick={(e) => {
            e.stopPropagation();
        props.changedest(t.depth, t.id)
        setBtn(false)
        }}j

    
          className="p fw-bold"
          style={{ backgroundColor: t.bgcolor }}>{t.name} 
      
    
        </p>}
      </div>
      }
    
      {
        t.children && <TreeMove changeintree={props.changeintree} config={props.config}
          parent={props.parent}
          changedest={props.changedest}
          dest={props.dest}
          changeconfig={props.changeconfig}
    
          changeparent={props.changeparent}
          familyTree={t.children}
          settings={props.settings}
          ac={props.ac}
          pc={props.pc} id={i} depth={props.depth + 1} />
      }
    
     </div>
    
    
    }) }</div>

    )

    
}

export default TreeMove;