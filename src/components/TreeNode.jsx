import React, { useState, useEffect } from 'react';
import { recits, tree } from '../data/dummy';
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
    t.bgcolor = "yellow";
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

      if (t.depth == tdepth[0] && t.id == tid[0])
        t.name = "1rr";
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

      t.name = "ddddddddddddddddddddddr";
      if (t.children) { bck(e, t.children, depth, id); }
      return t;
    })
    setFamilyTree(y)
    //setFamilyTree(tree.children) 


  }
  return <div style={{ paddingLeft: "20px", width: "50px" }} >
    {familyTree.map((t, i) => {
      return <div onMouseOut={() => { tdepth = []; tid = [] }}
        onMouseOver={(e) => { bck(e, props.familyTree, t.depth, t.id); markEl(e, familyTree, t.depth, t.id) }}
        style={{ paddingLeft: "20px" }} >{t.name}:{t.depth}:{t.id}
        {t.children && <TreeNode familyTree={t.children} id={i} depth={props.depth + 1} />}</div>
    })
    }

  </div>
}

export default TreeNode;





