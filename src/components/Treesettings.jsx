import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import { tree } from "../data/dummy"
const Treesettings = (props) => {
    let arr = [];
    let ii = 0;
    let act = "";
    let y = [];
    let kk = 0;
    let wparent = []
    let wchild = [];
    let pname = "";
    let c = 0;
    let stop = 0;
    const [ftree, setFtree] = useState(props.ftree)

    useEffect(() => {
        makeidlev(props.tree, 0, 0)
        for (let ii = 0; ii < 20; ii++) {
            c = 0;
            makeids(props.tree, ii)

        }

    }, [])

    const makeids = (nodes, i) => {
        nodes && nodes.map((t) => {
            {
                if (t.depth === i)
                    t.id = c++;
                t.bgcolor = "white"
            }
            if (t.children) { makeids(t.children, i); }
        })
    };
    const makeidlev = (nodes, i, tt) => {
        return nodes && nodes.forEach((t) => {
            t.depth = tt;
            t.bgcolor = "white";

            if (t.children) { makeidlev(t.children, 0, ++tt); --tt }
        });

    };

    const addel = (nodes) => {


        nodes.map((t, i) => {
            arr.push(t)

            ++ii;
            if (t.name === props.pc) {
                y = { name: t.name }
                pname = arr[ii - 2].name
                wparent = arr[ii - 2]
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


            if (yy.name === wparent.name) {
                wparent.children && wparent.children.map((t) => {

                    if (t.name === props.pc) {
                        t.children && t.children.map((tt) => {
                            if (stop === 0) {
                                yy.children.push(tt)
                                stop = 1;
                            }
                        })
                    }
                })
            }

            if (yy.name === "selected") {

                yy.children.map((t, i) => {
                    if (t.name === props.pc) {
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
            if (t.name === pname)
                o = t.children.map((tt, i) => {
                    if (tt.name === props.pc) {
                        o = i
                        t.children && t.children.splice(o, 1)
                    }
                })


        })
        props.changeconfig(0)
    }
    const setparent = (nodes) => {

        nodes.map((t) => {

            if ((kk === 0 || kk !== 1) && t.name === props.parent) {
                if (t.children === null)
                    t.children = [];



                t.children.push(y)
                kk = 1;
            }

        })
        removeel(nodes)

    }
    let tdepth = [];

    let tid = []




    const bck = (e, nodes, depth, id) => {
        tdepth.push(depth);
        tid.push(id);
        let f = 0;
        let y = nodes.map((t) => {

            if (t.children) { bck(e, t.children, depth, id); }
            return t;
        })
        setFtree(y)
        //setFamilyTree(tree.children) 


    }







    const chooseel = (nodes, d, id) => {

        let u = nodes.map((tt) => {

            tt.bgcolor = "red";
            if (tt.children) chooseel(tt.children, d, id)
            return tt;
        })

            ;
    }
    return (<div style={{ paddingLeft: "10px" }}>
        {ftree && ftree.map((t, i) => {
            return t && < div onClick={(e) => {

                bck(e, props.ftree, t.depth, t.id); chooseel(props.ftree, t.depth, t.id);

            }}>
                <p style={{ backgroundColor: t.bgcolor, width: "20px" }} > {t.name}</p> {t.children && < Treesettings ftree={t.children} depth={props.depth + 1} id={i} />}</div>

        })
        }
    </div >
    )























}

export default Treesettings;