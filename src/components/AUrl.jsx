 

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
       const changeconfig = (i) => {
        props.changeconfig(i)
       }
    return (<div className="topnav" transition-style-1= {props.displ[0] ? "in:circle:center" : ""}>
        <div className="title"><span>ss
        { location.pathname.split("/")[2] }
        </span></div>
<Link className="el-1"  to={"/a/"+location.pathname.split("/")[2]+"/pagination/"} 
onClick={()=>changeconfig(2)} >app</Link>
<Link className="el-2" to={"/a/"+location.pathname.split("/")[2]+"/pagination/searchtext"} 
 onClick={()=>changeconfig(2)}>searching</Link> 
<Link  className="el-3" to={"/a/"+location.pathname.split("/")[2]+"/pagination/settings"} 
onClick={()=>changeconfig(1)}>settings</Link>
</div>)
}

export default AUrl;