import React, {useState} from "react";
import CheckboxInput from "./CheckboxInput";
import Table from "./Table";




const Settings = props => {

    const [postPerPage, setPostPerPage] = useState(props.postPerPage)
    const [max, setMax] = useState(props.postPerPage)
     return (
        <div>
            {
                  props.columns.map((t, i) => { 
                    return   <CheckboxInput label={t.col.name} name={t.col.name} checked={t.col.disp} 
                                value={i} checkedCol={props.checkedCol} />
                })
            }

            <input type="range" id="cowbell" name="cowbell" min="1" max={props.data.length} value={postPerPage} step="1"
                onChange={(e) => { setPostPerPage(e.target.value); console.log(postPerPage);props.changePPP(postPerPage) }} />
            <label for="cowbell">pagination's page per site  </label>
 
        </div>
    )
}

export default Settings;