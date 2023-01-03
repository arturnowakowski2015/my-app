 

import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
 useLocation
} from "react-router-dom"; 
import "./AUrl.scss"

const AUrl = (props) => { 
       const location = useLocation();
       const[item, setItem]=useState([true, true, true])
       const changeconfig = (i, ii) => { 
        item[0]=true;
        item[1]=true;
        item[2]=true;
        item[ii]=false
    
            setItem(item=>item)
     
        props.changeconfig(i)
       }
    return (<div className={ "topnav-1" } >
             <div className={"topnav-"+item.indexOf(false)}     >/{ location.pathname.split("/")[2] }/</div>
             
              <div className="title"> 
                <span></span>
                </div>
            <Link className={item[0] ? "el-1" : "el-1-1"} 
                  to={"/a/"+location.pathname.split("/")[2]+"/pagination/"} 
                  onClick={(e)=>{  ;changeconfig(2, 0)}} >app
            </Link>
            <Link 
                  className={item[1] ? "el-2" : "el-2-1"} 
                  to={"/a/"+location.pathname.split("/")[2]+"/pagination/searchtext"} 
                  onClick={()=>changeconfig(2, 1)}>searching</Link> 
            <Link 
                 className={item[2] ? "el-3" : "el-3-1"} 
                to={"/a/"+location.pathname.split("/")[2]+"/pagination/settings"} 
                onClick={()=>changeconfig(1, 2)}>settings
            </Link>
        </div>)
}

export default AUrl;