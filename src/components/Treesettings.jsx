import React from "react";
import TreeNode from "./TreeNode";
import { tree } from "../data/dummy"
const Treesettings = (props) => {
    let arr = [];
    let ii = 0;
    let act = "";
    let y = [];
    let kk = 0;
    let wparent = []
    let pname = "";
    let wchild = [];
    let stop = 0;
    const addel = (nodes) => {


        nodes.map((t, i) => {
            arr.push(t)

            ++ii;
            if (t.name == props.pc) {
                y = { name: t.name }
                pname = arr[ii - 2].name
                wparent = arr[ii - 2]
                console.log("wparent" + JSON.stringify(wparent))
                wchild = arr[ii - 2].children
                removeel(tree.children)

            }
            if (t.children)
                addel(t.children)


            return t

        })
        setparent(nodes)

    }

    const removeel = (nodes) => {
        ii = 0;
        nodes.map((yy) => {


            if (yy.children) removeel(yy.children)


            if (yy.name == wparent.name) {
                wparent.children && wparent.children.map((t) => {

                    if (t.name == props.pc) {
                        t.children && t.children.map((tt) => {
                            if (stop == 0) {
                                yy.children.push(tt)
                                stop = 1;
                            }
                        })
                    }
                })
            }

            if (yy.name == "selected") {

                yy.children.map((t, i) => {
                    if (t.name == props.pc) {
                        kk = i;
                    }
                })

            }
        })

        deleteel(nodes);

    }
    const deleteel = (nodes) => {
        let o = 0;
        nodes.forEach((t) => {
            if (t.children) deleteel(t.children)
            console.log(act + ":" + props.pc + ":" + props.parent)
            if (t.name == pname)
                o = t.children.map((tt, i) => {
                    if (tt.name == props.pc) {
                        o = i
                        t.children && t.children.splice(o, 1)
                    }
                })


        })
        props.changeconfig(0)
        console.log("yy  " + JSON.stringify(nodes))
    }
    const setparent = (nodes) => {

        nodes.map((t) => {

            if ((kk == 0 || kk != 1) && t.name == props.parent) {
                if (t.children == null)
                    t.children = [];



                t.children.push(y)
                kk = 1;
            }

        })
        removeel(nodes)

    }

    return (<div><TreeNode changeintree={props.changeintree}
        changeparent={props.changeparent}
        config={props.config}
        familyTree={tree.children}
        changeconfig={props.changeconfig}
        menu={0}
        ac={props.ac}
        pc={props.pc} id={0} depth={0}
        l={props.l}
        parent={props.parent}
        addel={() => addel(tree.children)} />

    </div>
    )
}

export default Treesettings;