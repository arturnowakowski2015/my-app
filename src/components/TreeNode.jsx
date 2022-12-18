import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { recits, tree } from '../data/dummy';

import "./TreeNode.css"
let c = 0;
let p = 0
let tdepth = [];
let tid = [];
let node = "";
let mode = 0;
let mdepth = [];
let mid = []
let parentnode = {};
let l = []
let o = -1;
let stop = 0;
let stop2 = 0;
let stop3 = 0;
let child = null
let childname = [];
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
  let mode = 0;
  let modeset = {}
  const navigate = useNavigate();
  const [familyTree, setFamilyTree] = useState(props.familyTree)

  useEffect(() => {
    makeidlev(tree.children, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)

    }
  }, [])



  const clear = (e, nodes, depth, id) => {
    makeidlev(nodes, 0, 0);

    markEl(e, nodes, depth, id);

  }
  const markEl = (e, nodes, depth, id) => {

    y = nodes && nodes.map((t) => {

      if (t.depth == tdepth[0] && t.id == tid[0] && t.bgcolor != "green") {

        t.bgcolor = "blue";
      }
      else if (t.bgcolor != "green") t.bgcolor = "white"

      markEl(e, t.children, depth, id)
      return t;
    })


    return y;
    tdepth = []; tid = [];
  }


  const markIn = (e, es, nodes, depth, id) => {

    y = nodes && nodes.map((t) => {

      if (t.depth == tdepth[0] && t.id == tid[0] && es && props.l != 0) {
        marked = 1;
        t.bgcolor = "green";
      }
      else t.bgcolor = "white"

      markIn(e, es, t.children, depth, id)
      return t;
    })


    return y;
    tdepth = []; tid = [];
  }
  let el = { id: null, depth: null }
  let marked = 0
  const findgreen = (nodes) => {

    nodes && nodes.map((t) => {
      if (t.bgcolor == "green") { el.id = t.id; el.depth = t.depth; }
      if (t.children) findgreen(t.children)
    })

  }
  const markedformer = (nodes) => {
    nodes.map((tt) => {
      if (tt.id == el.id && tt.depth == el.depth) {
        tt.bgcolor = "green";

      }
      if (tt.children) markedformer(tt.children)
    })
  }
  const pcl = (cat) => {
    let c = props.pc.filter((tt) => tt.cat == cat);
    if (props.pc[0] && c.length)
      return c[0].l;
  }
  const markel1 = (nodes, depth, id) => {
    nodes.map((t) => {
      if (t.children) markel1(t.children, depth, id)
      if (t.depth == depth && t.id == id) { alert(8); t.bgcolor = "green"; }
      t.bgcolor = "red";
      return t;

    })
  }

  const bck = (e, nodes, depth, id) => {
    if (node == "" || node == undefined) {
      tdepth.push(depth);
      tid.push(id);
    }
    else {
      mdepth.push(depth);
      mid.push(id)
    }

    let f = 0;
    let y = nodes.map((t) => {

      if (t.children) { bck(e, t.children, depth, id); }
      return t;
    });
    setFamilyTree(y)

    //setFamilyTree(tree.children) 
  }

  const markleaf = (e, nodes, depth, id) => {

    y = nodes && nodes.map((t) => {

      if (t.depth == tdepth[0] && t.id == tid[0]) {
        node = t.name
        t.bgcolor = "green";
      }
      else if (t.bgcolor != "red") t.bgcolor = "white"

      markleaf(e, t.children, depth, id)
      return t;
    })


    return y;
    tdepth = []; tid = [];
  }


  const markparent = (e, nodes, depth, id) => {

    y = nodes && nodes.map((t) => {

      if (t.depth == depth && t.id == id) {
        parentnode.name = t.name;
        parentnode.depth = t.depth;
        parentnode.id = t.id
        t.bgcolor = "red";
      }
      else if (t.bgcolor != "green") t.bgcolor = "white"

      markparent(e, t.children, depth, id)

      return t;
    })

    p = 1
    return y;
    tdepth = []; tid = [];
  }
  const reset = (nodes) => {
    let y = nodes.map((t) => {
      if (t.children) reset(t.children);
      return t;
    })
    setFamilyTree(y);
  }

  let arr = [];
  let ii = 0;
  let wparent = [];
  let wchild = ""
  let parentnode1 = {};
  let kk = 0
  const addel = (nodes) => {


    nodes.map((t, i) => {
      arr.push(t)

      ++ii;
      if (t.name == node) {
        alert(t.name + "P" + parentnode.name)
        if (t.depth > parentnode.depth)
          mode = 1;

        y = { name: t.name }
        childname.push(t.children)
        if (t.depth != 0)
          wparent = arr[ii - 2]
        else wparent = { name: "zero" }
        wchild = arr[ii - 1]
        parentnode1 = t;
        console.log(wparent.name + "   POP ccccccccc         /// " + parentnode1.name + " //  cccccccccccccc" + JSON.stringify(wchild))
        removeel(tree.children)

      }
      if (t.children)
        addel(t.children)


      return t

    })


  }
  let el1 = {}
  const removeel = (nodes) => {
    ii = 0;
    let y = []
    if (mode == 1)
      y = nodes.map((yy) => {


        if (yy.children) removeel(yy.children)


        if (yy.name == parentnode.name && stop3 == 0) {

          wparent.children && wparent.children.map((t2) => {
            if (yy.children == null)
              yy.children = []
            if (t2.name == node) {

              if (t2.children) {

                el1 = { name: t2.name }
                yy.children.push(el1)
              }
              else {

                yy.children.push(t2)

              } alert(stop3 + "  stop3")
              stop3 = 1;
            }
          })
        }
        return yy;

      })
    else {
      y = nodes.map((yy) => {


        if (yy.children) removeel(yy.children)


        if (yy.name == parentnode1.name && stop3 == 0) {
          alert(yy.name)

          wparent.children && wparent.children.map((t2) => {
            if (yy.children == null)
              yy.children = []
            if (t2.name == node) {

              if (t2.children) {

                el1 = { name: t2.name }
                yy.children.push(el1)
              }
              else {

                yy.children.push(t2)

              }
              stop3 = 1;
            }
          })
        }
        return yy;

      })
    }

    deleteel(nodes);

  }

  const deleteel = (nodes) => {
    if (mode == 1)
      nodes.forEach((t) => {
        if (t.children) deleteel(t.children)

        if (t.name == wchild)
          t.children.map((tt, i) => {
            alert(tt.name + ":" + wchild)
            tt.children && tt.children.map((y, p) => {
              alert(y.name + "lok" + node)
              if (y.name == node) {
                child = y;
                alert(child.name + "  child")
              }
            })
          })

      })
    setparent(nodes)

  }
  let j = 0;
  const setparent = (nodes) => {
    if (mode == 1) {
      let y =
        nodes.map((t) => {
          if (t.children) setparent(t.children)
          if (t.name == wparent.name && stop2 == 0) {
            alert(t.name + " stop")

            childname.map((u, i) => {
              if (u) {
                let r = { name: u[i].name }
                alert(t.name + "mm")

                t.children.push(r)
              }
            })

            t.children.map((tt, i) => {
              if (tt.name == node) j = i;
            })

            let u = t.children.filter((t) => { return t.name != node })
            t.children = u


            stop2 = 1;
          }

          if (t.name == parentnode.name) {
            delete wchild.children
            if (stop3 == 0)
              t.children.push(wchild)
          }

        })
      setFamilyTree(y)
    }
  }

  return <div className="nodeel">
    {props.config == 0 && familyTree.map((t, i) => {
      console.log(":::111::" + props.parent)
      return <div onMouseOut={() => { tdepth = []; tid = [] }}
        onClick={(e) => {

          e.stopPropagation()
          findgreen(tree.children)
          props.changeintree(t.name, 0);
          markIn(e, t.name == props.ac.cat, tree.children, t.depth, t.id)

          if (marked == 0) markedformer(tree.children)
          navigate("/a/" + t.name + "/pagination")
        }}
        onDoubleClick={(e) => {
          alert(0)
        }}
        onMouseOver={(e) => {
          bck(e, familyTree, t.depth, t.id);
          markEl(e, familyTree, t.depth, t.id)
        }}




        className="nodeel">

        <p
          onMouseOut={(e) => { bck(e, props.familyTree, t.depth, t.id); markEl(e, familyTree, t.depth, t.id) }}
          className="pnode"
          style={{ backgroundColor: t.bgcolor }}>{t.name}
          <span>{t.name == props.ac.cat ? props.ac.l : ""}</span>
          {pcl(t.name)}

        </p>


        {t.children && <TreeNode config={props.config} changeintree={props.changeintree}
          parent={props.parent}

          changeparent={props.changeparent}
          familyTree={t.children}
          settings={props.settings}
          ac={props.ac}
          pc={props.pc} id={0} depth={0} />}</div>


    })
    }


    {props.config == 1 && familyTree.map((t, i) => {
      console.log(t.depth + " :::::" + props.parent)
      return <div onMouseOut={() => { tdepth = []; tid = [] }}



        onClick={(e) => {
          bck(e, familyTree, t.depth, t.id);

          if (node == "")
            markleaf(e, familyTree, 0, 0)
          if (tid.length == 0)
            l.push({ d: t.depth, i: t.id })

          markparent(e, familyTree, l[0].d, l[0].i)
          parentnode.name = t.name;
          parentnode.depth = l[0].d;
          parentnode.id = l[0].i
        }

        }


        style={{ paddingLeft: "10px" }} >


        {t.name != props.pc[0] &&
          <p

            class="p fw-bold"
            style={{ backgroundColor: t.bgcolor }}>{t.name}....
            {t.name == props.ac.cat ? props.ac.l : ""}
            {pcl(t.name)}

          </p>
        }
        {t.name == props.pc[0] &&
          <div style={{ width: "200px", borderTop: "black solid 5px" }}>click on nodes
            <div style={{ paddingTop: "20px", width: "200px", display: "flex", flexDirection: "row" }}>
              <div style={{ height: "20px", width: "20px", backgroundColor: "red" }} >node</div>
              <div style={{ padding: "20px" }}>under</div>
              <div style={{ height: "20px", width: "20px", backgroundColor: "green", marginTop: "40px" }}>main</div>
            </div>{p == 1 && <button onClick={(e) => {
              addel(tree);
              c = 0;
              makeidlev(familyTree, 0, 0)
              for (let ii = 0; ii < 20; ii++) {
                c = 0;
                makeids(familyTree, ii)

              }; node = ""; props.changeconfig(0);
              setFamilyTree(familyTree)
            }}>hhh</button>}
          </div>
        }

        {t.children && <TreeNode changeintree={props.changeintree} config={props.config}
          parent={props.parent}

          changeparent={props.changeparent}
          familyTree={t.children}
          settings={props.settings}
          ac={props.ac}
          pc={props.pc} id={0} depth={0} />}</div>


    })}










  </div >
}

export default TreeNode;





