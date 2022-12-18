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
    const setN = (v) => {
        alert(v * 10 - 10 + ":" + props.length)
        if (0 < v && v * 10 - 10 < props.length)
            props.setN(v)
    }
    return (
        <div className="my-3 text-center" >
            <button
                className="px-3 py-1 m-1 text-center btn-primary"
                onClick={() => setN(props.number - 1)}
            >
                Previous
            </button>

            {props.pageNumber.map((Elem, i) => {
                return (
                    <div class="pagbtn" >
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
                onClick={() => setN(props.number + 1)}
            >
                Next
            </button>
        </div>)
}


export default Pagination;