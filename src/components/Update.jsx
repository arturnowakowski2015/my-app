
import React, { useState } from "react";
import {

    Link,
    useNavigate,
    useLocation
} from "react-router-dom";
import UserContext from "../User";



const Update = (props) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [str, setStr] = useState(state ? state.str : "ppp")

    const m = (e) => {
        setStr(e.target.value)

    }

    const mm = () => {

        props.furl(0, state.idrec, 0, "c", str)
        navigate("/a/" + props.acturl + "/pagination")
    }
    return <div><input type="text" value={str}
        onChange={(e) => m(e)} />
        <div style={{ cursor: "pointer", textDecoration: "underline" }} class="a4" onClick={() => mm()}>update</div>

    </div>
}

export default Update;









