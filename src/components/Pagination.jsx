import React, { useState } from "react";
import {

    Link
} from "react-router-dom";
import { data } from "../data/dummy";
import "./Pagination.css";

const Pagination = props => {
    const [el, setEl] = useState(0)

    let url = ""
    let ul = "";
    const funk = (e, i) => {
        //  ul = window.location.href.slice(window.location.href.lastIndexOf("/"), window.location.length + 1)
        e.preventDefault();
        e.stopPropagation();
        if (0 < i)
            props.ChangePage(i)


    }
    const setN = (str, v) => {

        let t = 0;
        props.number >= 10 && props.firstPost < props.length ? t = props.number + props.postPerPage : t = props.postPerPage
        /*       if (  props.firstPost < props.length - props.postPerPage && str=="Next")
                  props.setN(v)
               if (  props.firstPost < props.length - props.postPerPage && str=="Previous")
                  props.setN(v-1)
                  */
        if (v > 0 && str == "Previous")
            props.setN(v)
        if (v <= 0 && str == "Next")
            props.setN(v + 1)
        if (v > 0 && str == "Next" && props.firstPost < props.length - props.postPerPage)
            props.setN(v)
    }
    return (
        <div className="my-3 text-center" >
            <button
                className="px-3 py-1 m-1 text-center btn-primary"
                onClick={(e) => setN(e.target.innerHTML, props.number - 1)}
            >
                Previous
            </button>

            {props.pageNumber.map((Elem, i) => {
                return (
                    <div className="pagbtn" key={i}>
                        {
                            props.number == i + props.fp ?
                                <div><Link to={"/a/" + props.acturl + "pagination/" + Elem} onClick={(event) => funk(event, Elem)}


                                >
                                    #
                                </Link>
                                </div>
                                :
                                <div><Link to={"/a/" + props.acturl + "pagination/" + Elem} onClick={(event) => funk(event, Elem)}


                                >
                                    {Elem}
                                </Link>
                                </div>
                        }
                    </div>
                );
            })
            }
            <button
                className="px-3 py-1 m-1 text-center btn-primary"
                onClick={(e) => setN(e.target.innerHTML, props.number + 1)}
            >
                Next
            </button>
        </div>)
}


export default Pagination;