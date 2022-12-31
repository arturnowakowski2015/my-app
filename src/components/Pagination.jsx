import React, { useState } from "react";
import { useEffect } from "react";
import {

    Link
} from "react-router-dom";
import { data } from "../data/dummy";
import "./Pagination.css";

const Pagination = props => {
    const [el, setEl] = useState(0)
    const[ ind, setInd]=useState(Math.ceil(props.length/10))
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
    let rrr= 0;
    useEffect(()=>{
        setInd(ind=>props.checkall && Math.ceil(props.length/10) )
    }, [props.length])
    return (
        <div className="my-3" >
            <div
                className=" "
                onClick={(e) =>  setN(e.target.innerHTML, props.number - 1)}
            >
                Previous
            </div>

            {props.pageNumber.map((Elem, i) => {
                return ( 
                    <div className="pagbtn" key={i}>ind.{ind}
                        {
                             props.checkall==false && props.number == i + props.fp ?
                                <div><Link style={{backgroundColor:"red"}}   to={"/a/" + props.acturl + "pagination/" + Elem} onClick={(event) => funk(event, Elem)}


                                >
                                    #
                                </Link>
                                </div>
                                :
                                <div>{i<Math.ceil((props.length ? props.length: 100)/10) && <Link className={ props.oldel==i  ?  "green" : "s"} to={"/a/" + props.acturl + "pagination/" + Elem}
                                 onClick={(event) => {event.preventDefault(); funk(event, Elem)}}


                                >{   Elem}
                                </Link>}
                                </div>
                        }
                    </div>
                );
            })
            }
            <div
                className=" "
                onClick={(e) => setN(e.target.innerHTML, props.number + 1)}
            >
                Next
            </div>
        </div>)
}


export default Pagination;


/*


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
 
                  if (v > 0 && str == "Previous")
                  props.setN(v)
              if (v <= 0 && str == "Next")
                  props.setN(v + 1)
              if (v > 0 && str == "Next" && props.firstPost < props.length - props.postPerPage)
                  props.setN(v)
          }
          let rrr= 0;
          return (
              <div className="my-3" >
                  <div
                      className=" "
                      onClick={(e) =>  setN(e.target.innerHTML, props.number - 1)}
                  >
                      Previous
                  </div>
      
                  {props.pageNumber.map((Elem, i) => {
                      return ( 
                          <div className="pagbtn" key={i}>
                              {
                                  props.number == i + props.fp ?
                                      <div><Link   to={"/a/" + props.acturl + "pagination/" + Elem} onClick={(event) => funk(event, Elem)}
      
      
                                      >
                                          #
                                      </Link>
                                      </div>
                                      :
                                      <div>{i<Math.ceil((props.length ? props.length: 100)/10) && <Link className={ props.oldel==i  ?  "green" : "s"} to={"/a/" + props.acturl + "pagination/" + Elem}
                                       onClick={(event) => {event.preventDefault(); funk(event, Elem)}}
      
      
                                      >{   Elem}
                                      </Link>}
                                      </div>
                              }
                          </div>
                      );
                  })
                  }
                  <div
                      className=" "
                      onClick={(e) => setN(e.target.innerHTML, props.number + 1)}
                  >
                      Next
                  </div>
              </div>)
      }
      
      
      export default Pagination;
      */