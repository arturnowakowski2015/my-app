import React, { useState } from "react";
import {

    Link
} from "react-router-dom";
const Pagination = props => {
    const [el, setEl] = useState(0)

    let url = ""
    let ul = "";
    const funk = (e, i) => {
        //  ul = window.location.href.slice(window.location.href.lastIndexOf("/"), window.location.length + 1)
        e.preventDefault();
        e.stopPropagation();
        props.ChangePage(i)
        props.end()

    }
    return (
        <div className="my-3 text-center">
            <button
                className="px-3 py-1 m-1 text-center btn-primary"
                onClick={() => props.setN(props.number - 1)}
            >
                Previous
            </button>

            {props.pageNumber.map((Elem, i) => {
                return (
                    <div class="pagbtn" >
                        {
                            props.number == i + 1 ?
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
                onClick={() => props.setN(props.number + 1)}
            >
                Next
            </button>
        </div>)
}


export default Pagination;