 

import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
 useLocation
} from "react-router-dom"; 
 

const AUrl = (props) => { 
       const location = useLocation();
       const changeconfig = (i) => {
        props.changeconfig(i)
       }
    return (<div className="s-2">
<Link className={ "s-1" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/"}  >app</Link>
<Link className={ "s-2" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/searchtext"} 
 onClick={()=>changeconfig(2)}>searching</Link>
<Link className={ "s-3" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/calendar"}  >calendar</Link>
<Link className={ "s-4" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/settings"} 
onClick={()=>changeconfig(1)}>settings</Link>
</div>)
}

export default AUrl;