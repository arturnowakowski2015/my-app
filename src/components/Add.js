import React, { useState } from 'react';
import {
    Route,
    Link
} from "react-router-dom";



const Add = (props) => {
    const [editfield, setEditfield] = useState("");
    const change = (e) => setEditfield(e.target.value);

    const add = (editfield) => {
        props.add(editfield);
    }
    return (<div>
        <input type="text" value={editfield} onChange={(e) => change(e)} />
        <button onClick={() => props.index !==== props.todos.length - 1 ? (props.changeind()) : props.add(editfield)}>add</button>
    </div>)
}


export default Add;