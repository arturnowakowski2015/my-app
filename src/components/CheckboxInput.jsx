import React, { useState } from "react";
const CheckboxInput = props => {
    const [check, setCheck] = useState(props.checked)
    const ch = (check, e) => {
        setCheck(!check);  
        props.checkedCol(check, e.target.value) 
    }
    return (
        <label>
            <input type="checkbox"
                name={props.name}
                checked={check}
                onClick={(e) => { ch(check, e)}}
                value={props.value} />
            {props.label}
        </label>
    );
}

export default CheckboxInput;