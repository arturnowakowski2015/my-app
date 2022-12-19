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
import "./Table.css"
import UserContext from "../ctx/User";










const Table = (props, columns) => {
    const [count, updateCount] = React.useContext(UserContext);
    const navigate = useNavigate();


    const [flagel, setFlagel] = useState(true)
    const [biw, setBiw] = useState(0)
    const [sort, setSort] = useState(true)
    const [view, setView] = useState(1)
    const [id, setId] = useState(0);
    const [number, setNumber] = useState(1); // No of pages
    const [element, setElement] = useState(3)
    const [chevron, setChevron] = useState("false")
    const [i, setI] = useState(0);
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
    let lastPost = 0;
    let firstPost = 0;

    if (props.number1 == 0) {
        lastPost = number * postPerPage;
        firstPost = lastPost - postPerPage;
    } else {

        lastPost = number * postPerPage;
        firstPost = lastPost - postPerPage;
        if (firstPost > data.length) {
            firstPost = 0;
            setNumber(Math.floor(data.length / postPerPage))

        }
    }
    let e = data.filter(f => count.filter(item => f.id === item.id))
    const currentPost = props.flag == 1 ? e.slice(firstPost, lastPost) : data.slice(firstPost, lastPost)
    // console.log("bbbbbbbbbbbbbbbbbb    " + JSON.stringify(data))
    const pageNumber = [];
    let cell = { col: { name: "ddd", disp: true } };
    let col = [cell];


    const border = [0, postPerPage * 10, postPerPage * 20, postPerPage * 30, postPerPage * 40,
        postPerPage * 50, postPerPage * 60, postPerPage * 70, postPerPage * 80, postPerPage * 90
    ];

    let fp = border[biw] ? border[biw] / postPerPage + 1 : 1;
    if (firstPost > border[biw]) {


        for (let i = 0; i < 10; i++) {

            pageNumber.unshift()

        }
    }

    let span = 0
    Math.floor(data.length / postPerPage) >= 10 ? span = 10 : span = Math.floor(data.length / postPerPage) + 1

    for (let i = (fp); i <= border[biw] / postPerPage + span; i++) {

        if (Math.floor(data.length / postPerPage) < 10 + 1)
            pageNumber.push(i - border[biw] / postPerPage);
        else
            pageNumber.push(i);
    }

    const buildHeader = (header, columns) => {
        data.map((t, i) => {
            let ii = 0; for (let f of Object.values(t)) { if (typeof f == "object") arr.push(ii); ii++ }
        })
        header.map((k, i) => { return arr.indexOf(i) == -1 ? (cell = { col: { name: "", disp: true } }, cell.col.name = k, col.push(cell)) : null })
        let h = header.map((k, ii) => {
            return (arr.indexOf(ii) == -1 && props.columns[i]
                && props.columns[ii].col.disp == true)
                ? (<th className="tr" onClick={() => { sortarr(k, i); setChevron(!chevron); }}>
                    <div onMouseOver={() => setI(ii)} >
                        {
                            chevron && ii == i ? <i class="fa fa-chevron-up"></i> : chevron == false && ii == i ?
                                <i class="fa fa-chevron-down"></i> : ""
                        }
                        c{k}</div></th >) : null
        })

        col.shift();

        return (<tr ><th className="tr"> selected </th> {h}</tr>)
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
        if (r == true)
            navigate("/a/" + props.acturl + "/pagination/putin", { state: { id } })
        else
            navigate("/a/" + props.acturl + "/pagination", { state: { id } })
        props.setch(id, { id: 90, checked: true })
        let t = count.filter((t) => { return t.id == id })

        updateCount(t.length == 0 ? { id: id, checked: !t.checked } : id, id, 0, null, r.toString())

    }

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


        let tr = Object.keys(row).map((k, j) => {
            return typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp == true && j != 2
                ?
                <td onMouseOver={() => { url = "/" + row.id + "/edit"; setId(row.id); }} ><div className="div1">{row[k]}</div></td >
                : typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp == true
                    && j == 2 ?


                    <td onMouseOver={() => { url = "/a/" + props.acturl + "/pagination/" + row[k] + "/" + row.id + "/" + row[k] + "/1/edit"; setId(row.id); }} >
                        <div className="div1">{row[k]}</div>
                    </td >




                    : col[j].col.disp = false

        });


        return (<tr   >{row.checkbox == true ? <input type="checkbox" id={row.id + "/"}
            checked={count[i].checked ? "" : ""} />
            : <input style={{ position: "relative", top: "10px", float: "left" }} type="checkbox" id={row.id} checked={(count.filter((tt) => { return tt.id == row.id })[0] != undefined
                ? count.filter((tt) => { return tt.id == row.id })[0].checked
                : "")}
                onChange={(e) => { setch(row.id, e.target.checked) }} />}<div style={{ cursor: "pointer", textDecoration: "underline" }}
                    onMouseOver={() => { url = "/a/" + props.acturl + "/pagination/" + row.title + "/" + row.id + "/" + row.title + "/1/edit"; setId(row.id); }}
                    onClick={(e) => dv(url, row.title, row.id)} >edit</div>{tr}</tr>);

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
        console.log(pageNumber + "              mbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
    };

    const setN = number => {
        r = "p"
        setNumber(number)
        console.log(pageNumber + "              m2")
        setBiw(props.number1 == 0 ? Math.floor((number - 1) / 10) : Math.floor((number) / 10))

    }

    const routeElement = (r) => {
        return (<tr><td>ddddd</td></tr>);
    }


    const el = <div>{firstPost + "-" + (parseInt(firstPost) + parseInt(currentPost.length)) + " from " + pageNumber}
        {props.flagsettings != 4 && <Pagination acturl={props.acturl} fp={fp} span={span} postPerPage={postPerPage} number={number} pageNumber={pageNumber}
            ChangePage={ChangePage} setN={setN} length={data.length} firstPost={firstPost} />}
        <div >
            {
                element == 1 ? null
                    :

                    <div className="table"> <table>

                        <thead className="th">
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