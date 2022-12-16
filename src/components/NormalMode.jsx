import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useLocation
} from "react-router-dom";
import Table from "./Table";
import TreeNode from "./TreeNode";
import Settings from "./Settings"
import { tree } from '../data/dummy';
export const NormalMode = (props) => {
    return (
        <div >

            <div class="LT">
                <div class="TreeNode">
                    <TreeNode changeintree={props.changeintree}
                        changeparent={props.changeparent}
                        config={props.config}
                        familyTree={props.familyTree}
                        changeconfig={props.changeconfig}
                        settings={props.settings}
                        ac={props.categories.actual[0]}
                        pc={props.categories.new} id={0} depth={0}
                        l={props.data[props.l]}
                        parent={props.parent} />

                </div>
                <div class="LTchild">
                    <Settings data={props.data} columns={props.columns} changePPP={props.changePPP}
                        checkedCol={props.checkedCol}

                        flagsettings={props.flagsettings} postPerPage={props.postPerPage}

                    />
                    <Link class="a2" to={"/a/" + props.categories.actual[0].cat + "/pagination"} onClick={() => this.setState({ settings: 0 })}>back to main</Link>
                    <Link class="a2" to={"/a/" + props.categories.actual[0].cat + "/pagination/url"} onClick={() => this.setState({ settings: 2 })}>change database</Link>



                    <Table i={props.i} data={props.data1} setch={props.setch} familyTree={tree.children}
                        columns={props.columns1}
                        flagsettings={props.flagsettings} postPerPage={props.postPerPage}
                        dff={props.dff} str={this.props.params.str}
                        furl={props.furl} id={props.id1} settingsid={props.settings}
                        acturl={props.categories.actual[0].cat}
                    />




                </div>
            </div>
        </div>
    )
}

export default NormalMode;



























