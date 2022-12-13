import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import Pagination from "./Pagination"
import Update from "./Update";
import "../index.css"
import UserContext from "../ctx/User";










const Table = (props, columns) => {
    const [count, updateCount] = React.useContext(UserContext);
    const navigate = useNavigate();


    const [flagel, setFlagel] = useState(true)
    const [end1, setEnd1] = useState(0)
    const [sort, setSort] = useState(true)
    const [view, setView] = useState(1)
    const [id, setId] = useState(0);
    const [number, setNumber] = useState(1); // No of pages
    const [element, setElement] = useState(3)
    const [start, setStart] = useState(new Date().getTime())
    const { data } = props;
    const [postPerPage, setPostPerPage] = useState(props.postPerPage);
    useEffect(() => {
        setPostPerPage(props.postPerPage)
    }, [props.postPerPage]);

    let r = "";
    useEffect(() => {

        let r = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);

        if (r.charAt(0) != 0 && r != "p" && typeof r.charAt(0) != "string") {
            setNumber(r.charAt(0))
            r = "";
        }

    }, [setNumber]);




    let ttt = 0;

    const arr = [];
    const lastPost = number * postPerPage;
    const firstPost = lastPost - postPerPage;
    //  console.log("fg    " + JSON.stringify(data))
    let e = data.filter(f => count.filter(item => f.id === item.id))
    const currentPost = props.flag == 1 ? e.slice(firstPost, lastPost) : data.slice(firstPost, lastPost)
    // console.log("bbbbbbbbbbbbbbbbbb    " + JSON.stringify(data))
    const pageNumber = [];
    let cell = { col: { name: "ddd", disp: true } };
    let col = [cell];
    for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
        pageNumber.push(i);
    }

    const buildHeader = (header, columns) => {
        data.map((t, i) => {
            let ii = 0; for (let f of Object.values(t)) { if (typeof f == "object") arr.push(ii); ii++ }
        })
        header.map((k, i) => { return arr.indexOf(i) == -1 ? (cell = { col: { name: "", disp: true } }, cell.col.name = k, col.push(cell)) : null })
        let h = header.map((k, i) => {
            return (arr.indexOf(i) == -1 && props.columns[i]
                && props.columns[i].col.disp == true)
                ? (<th class="col" onClick={() => sortarr(k, i)}> {k} {k == "title" || k != "body" ? "^" : ""}</th>) : null
        })

        col.shift();

        return (<tr width="60px"><div></div> {h}</tr>)
    }
    const df = (i, o) => {
        props.df(i, o)
        setElement(1)
    }
    let url = "";

    const loop = () => {
        for (let i = 0; i < 1111100; i++) {
            Math.sqrt(i);
        }
    }
    const mkf = (e) => {
        setFlagel(false)
    }
    const setch = (id, r) => {

        navigate("/a/" + props.acturl + "/pagination/putin", { state: { id } })
        props.setch(id, { id: 90, checked: true })
        let t = count.filter((t) => { return t.id == id })
        updateCount(t.length ? "" : { id: id, checked: true }, id, 0)

    }


    /*                    <Link toonMouseOver={() => {  }} onClick={(e) => mkf(e)} >edit</Link> \
    navigate(window.location.href, { state: { id: 7, items: props.items } })
    
    */
    const dv = (url, str, i) => {

        props.furl(3, i, props.i, "u", "");
        navigate(url, {
            state: {
                id: props.id,
                idrec: i,
                str: str,
                settingsid: props.settingsid
            }
        });
    };
    const buildRow = (row, i) => {
        let m = 0;

        console.log("count    " + JSON.stringify(count))

        let tr = Object.keys(row).map((k, j) => {
            return typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp == true && j != 2
                ?
                <td onMouseOver={() => { url = "/" + row.id + "/edit"; setId(row.id); }} >{row[k]}</td>
                : typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp == true
                    && j == 2 ?


                    <td onMouseOver={() => { url = "/a/" + props.acturl + "/pagination/" + row[k] + "/" + row.id + "/" + row[k] + "/1/edit"; setId(row.id); }} >
                        <div style={{ cursor: "pointer", textDecoration: "underline" }} onMouseOver={() => { setId(row.id); }}
                            onClick={() => dv(url, row[k], row.id)} >edit</div>



                        {row[k]} .
                    </td>




                    : col[j].col.disp = false

        });






        //   console.log("b1ba   " + JSON.stringify(e));
        return (<tr class="cell">{row.checkbox == true ? <input type="checkbox" id={row.id + "/"}
            checked={count[i].checked ? "" : ""} />
            : <input type="checkbox" id={row.id} checked={(count.filter((tt) => { return tt.id == row.id })[0] != undefined
                ? count.filter((tt) => { return tt.id == row.id })[0].checked
                : "")}
                onChange={(r) => setch(row.id, r)} />}{tr}</tr>);

    }



    const d = () => { ttt = 1;; }
    const sortarr = (k, i) => {
        setSort(!sort)
        let r = Object.keys(data[0]).filter((t, index) => { return data[0][t] })

        sort ? (data.sort(function (a, b) {
            return typeof a[r[i]] == "string" ? a[r[i]].localeCompare(b[r[i]]) : a[r[i]] - b[r[i]];
        })
        )
            :
            (data.sort(function (a, b) {
                return typeof a[r[i]] == "string" ? b[r[i]].localeCompare(a[r[i]]) : b[r[i]] - a[r[i]];

            })
            )

    }

    const ChangePage = (pageNumber) => {
        setNumber(pageNumber);

    };
    const end = (props) => {
        props.end()
    }

    const setN = number => {
        r = "p"
        setNumber(number)
    }

    const routeElement = (r) => {
        return (<tr><td>ddddd</td></tr>);
    }


    const el = <div>
        {props.flagsettings != 4 && <Pagination acturl={props.acturl} number={number} pageNumber={pageNumber} ChangePage={ChangePage} setN={setN} end={end} />}
        <div>
            {
                element == 1 ? null
                    :

                    <div> <table className="table table-striped">

                        <thead >
                            {data[0] ? buildHeader(Object.keys(data[0]), data.columns) : null}
                        </thead>
                        <tbody>

                            {
                                view == 1 ?
                                    currentPost.length >= 0 ? currentPost.map(buildRow) : <div>vvvv</div>
                                    :
                                    <tr><td>dddddddddddd</td></tr>

                            }







                        </tbody>
                    </table>
                    </div>

            }
        </div>
    </div>;

    return (



        <div>
            {flagel == true ?
                el : ""
            }
        </div>

    )
}

export default Table;