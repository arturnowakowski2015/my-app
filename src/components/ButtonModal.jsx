import React, {useEffect, useState} from "react";
import '../index.css';
import { 
    useNavigate,
   useLocation
  } from "react-router-dom";
const ButtonModal = props =>{
    const markEl = (nodes,d, ii) => { 
        let r = nodes.map((t, i) => {
            if(t.children ) markEl(t.children, d, ii);
              return t.depth==2 ? alert(9) : alert(t.id+":"+ii +":"+ t.depth+":"+d)
     
        })
 
    return r; 
} 

    const makeColor = (nodes, d, i) => {
        arr=  nodes.map((t, ii) => { alert(t.depth+":"+d+":"+t.id+":"+i)
            if(t.children)makeColor(t.children, d, i)
            if(t.depth==d && t.id==i)t.bgcolor="blue"
            else t.bgcolor="red"
            return t;
        })
        return arr;
    }
    let arr = [];
    const makeEl = (nodes, d) => {
        
        return nodes.map((t, i) => {
           return   <div ><label style={{backgroundColor: t.bgcolor}} 
           onMouseOver={() => { makeColor(props.familyTree, d, i); setEl(makeEl(arr, 0))}} for="recipient-name" class="col-form-label" key={i}>{t.name}</label>
                        {t.children ? makeEl(t.children, d+1) : null}</div>  

        }) 
    }  
 
    const [el, setEl] = useState(makeEl(props.familyTree, 0))
  
return (
    <div>
      <div  class="deleteset">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Launch static backdrop modal
        </button>
        <button type="button" class="btn btn-primary" onClick={() => props.checkall()} >
          check/uncheck
        </button>        
        <button type="button" class="btn btn-primary" onClick={() => props.deleteel()} >
          delete
        </button></div>
 
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="mb-3">
        .{el}
 
             </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
 
      </div>
    </div>
  </div>
</div>
        </div>
)
}
export default ButtonModal;