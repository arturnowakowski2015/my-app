
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";
import UserContext from "../User";

import { useLocation } from "react-router-dom";


function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}



const Update = (props) => {
    const [str, setStr] = useState(props.str)


    const m = (e) => {
        setStr(e.target.value)

    }

    const mm = (str) => {
        props.furl(0, props.id, str)
    }
    return <div> update<input type="text" value={str}
        onChange={(e) => m(e)} />
        <Link class="a4" to={"/a/pagination"} onClick={() => mm(str)}>upd     te</Link>
    </div>
}

export default withParams(Update);









