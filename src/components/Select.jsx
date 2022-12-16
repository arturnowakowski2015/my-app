import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import Table from "./Table";


const Select = (props) => {
    const navigate = useNavigate();
    const [vstr, setVstr] = useState("ddd")
    const [b, setB] = useState(0);
    const [strd, setStrd] = useState(props.strd);
    const [id, setId] = useState(0);
    useEffect(() => {
        setStrd(props.strd)
    }, [props.strd]);
    const url = (e) => {
        setB(1); setVstr(e.target.value);

        setId(e.target.value)
    }
    const back = () => {

        props.changeRecits(id, 0)
        props.changeconfig(0);
        props.changecategory("new", 2);
        navigate("/a/" + props.acturl + "/pagination/")
    }
    return (<div>
        <select onChange={e => { url(e) }} value={vstr}>
            {strd}
        </select>
        <div>
            {b == 0 && <div class="btn2" >choose database</div>} </div>
        {b == 1 && <button onClick={() => back()}>deploy</button>}

    </div>)
}

export default Select;