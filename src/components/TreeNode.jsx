import React, { useState, useEffect } from 'react';

import { recits, tree } from '../data/dummy';
import "../index.css"
let c = 0;
let p = [];
let tdepth = [];
let tid = [];
const makeids = (nodes, i) => {
  nodes && nodes.map((t) => {
    {
      if (t.depth == i)
        t.id = c++;
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

let pp = []
let disp = true;
let y = [];

const TreeNode = (props) => {
  const [familyTree, setFamilyTree] = useState(props.familyTree)
  useEffect(() => {
    makeidlev(props.familyTree, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(props.familyTree, ii)

    }
  }, [])



  const clear = (e, nodes, depth, id) => {
    makeidlev(nodes, 0, 0);

    markEl(e, nodes, depth, id);

  }
  const markEl = (e, nodes, depth, id) => {

    y = nodes && nodes.map((t) => {

      if (t.depth == tdepth[0] && t.id == tid[0] && t.bgcolor != "green")

        t.bgcolor = "blue";
      else if (t.bgcolor != "green") t.bgcolor = "white"

      markEl(e, t.children, depth, id)
      return t;
    })


    return y;
    tdepth = []; tid = [];
  }

  const bck = (e, nodes, depth, id) => {
    tdepth.push(depth);
    tid.push(id);
    let f = 0;
    let y = nodes.map((t) => {

      if (t.children) { bck(e, t.children, depth, id); }
      return t;
    })
    setFamilyTree(y)
    //setFamilyTree(tree.children) 


  }

  const markIn = (e, es, nodes, depth, id) => {

    y = nodes && nodes.map((t) => {

      if (t.depth == tdepth[0] && t.id == tid[0] && es)

        t.bgcolor = "green";
      else t.bgcolor = "white"

      markIn(e, es, t.children, depth, id)
      return t;
    })


    return y;
    tdepth = []; tid = [];
  }


  const pcl = (cat) => {
    let c = props.pc.filter((tt) => tt.cat == cat);
    if (props.pc[0] && c.length)
      return c[0].l;
  }
  return <div style={{ paddingLeft: "10px", width: "50px" }} >
    {familyTree.map((t, i) => {
      console.log(props.pc[0] && props.pc[0].cat + ":::::" + props.ac.cat)
      return <div class="fw-bold text-nowrap" onMouseOut={() => { tdepth = []; tid = [] }}
        onClick={(e) => {
          props.changeintree(t.name, 0);
          e.stopPropagation();
          e.preventDefault();

          markIn(e, t.name == props.ac.cat, tree.children, t.depth, t.id)
        }}
        onMouseOver={(e) => { bck(e, props.familyTree, t.depth, t.id); markEl(e, familyTree, t.depth, t.id) }}
        style={{ paddingLeft: "10px" }} >
        <p
          onMouseOut={(e) => { bck(e, props.familyTree, t.depth, t.id); markEl(e, familyTree, t.depth, t.id) }}
          class="p fw-bold"
          style={{ backgroundColor: t.bgcolor }}>{t.name}
          {t.name == props.ac.cat ? props.ac.l : ""} ...
          {pcl(t.name)}

        </p>


        {t.children && <TreeNode changeintree={props.changeintree}
          familyTree={t.children}
          menu={0}
          ac={props.ac}
          pc={props.pc} id={0} depth={0} />}</div>


    })
    }
  </div >
}

export default TreeNode;





