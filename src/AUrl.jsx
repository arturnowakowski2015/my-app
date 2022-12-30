 

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
    return (<div className="s-2">
<Link className={ "s-1" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/"}  >app</Link>
<Link className={ "s-1" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/searchtext"}  >searching</Link>
<Link className={ "s-1" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/calendar"}  >calendar</Link>
<Link className={ "s-1" } to={"/a/"+location.pathname.split("/")[2]+"/pagination/settings"} >settings</Link>
</div>)
}

export default AUrl;