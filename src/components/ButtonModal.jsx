import React, { useEffect, useState } from "react";
import { Link, useVavigate } from "react-router-dom";
import '../index.css';
import {
  useNavigate
} from "react-router-dom";
const ButtonModal = props => {
  const [name, setName] = useState(props.ac)
  const navigate = useNavigate()
  const markEl = (nodes, d, ii) => {
    let r = nodes.map((t, i) => {
      if (t.children) markEl(t.children, d, ii);
      return t.depth == 2 ? "" : ""

    })

    return r;
  }

  const makeColor = (nodes, d, i) => {
    arr = nodes.map((t, ii) => {
      if (t.children) makeColor(t.children, d, i)
      if (t.depth == d && t.id == i) t.bgcolor = "blue"
      else t.bgcolor = "white"
      return t;
    })
    return arr;

  }
  let arr = [];
  const makeEl = (nodes, d) => {

    return nodes.map((t, i) => {
      return <div style={{ paddingLeft: "5px" }}><label style={{ backgroundColor: t.bgcolor }}
        onClick={() => { makeColor(props.familyTree, d, i); setEl(makeEl(arr, 0)); setName(t.name) }}
        className="col-form-label" key={i}>{t.name}</label>
        {t.children ? makeEl(t.children, d + 1) : null}</div>

    })
  }

  const [el, setEl] = useState(makeEl(props.familyTree, 0))

  return (
    <div>
      <div className="deleteset">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          move ckecked to choosen folder         </button>
        <button type="button" className="btn btn-primary" onClick={() => props.checkall()} onMouseOut={() => navigate("/a/" + props.ac[0].cat + "/pagination")}>
          check/uncheck
        </button>
        <button type="button" className="btn btn-primary" onClick={() => props.deleteel()} >
          delete
        </button></div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Closea"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  .{el}

                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => { props.changeintree(name, 0, 2); props.changecategory(name, 2, 1); navigate("/a/" + props.ac.cat + "/pagination") }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ButtonModal;