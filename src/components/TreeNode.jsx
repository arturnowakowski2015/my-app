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
let modesplice = 0;
let arr = [];
let root = 0;
let elmenu = {
  mode: 0,
  parent: { name: "", depth: null, id: null },
   child: { name: "", depth: null, id: null, children: [] }, parentold: { name: "", depth: null, id: null },
  parentformer: { name: "" },
  parentroot:{name:""}
}
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
    if(t.bgcolor!="yellow")
    t.bgcolor = "white";

    if (t.children) { makeidlev(t.children, 0, ++tt); --tt }
  });

};

let pp = []
let disp = true;
let y = [];
let yy=-1
const TreeNode = (props) => {
  const icons = {
    "received": <i class="fa fa-bolt" ></i>,
    "new": <i class="fa fa-bell"></i>,
    "postponed": <i class="fa fa-star"></i>,
    "removed": <i class="fa fa-envelope"></i>,
    "selected": <i class="fa fa-paper-plane"></i>,
    "labels": <i class="fa fa-file-o"></i>
  };



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



  const clear = () => {
    makeidlev(tree.children, 0, 0);

    markEl(null, tree.children, 0, 0);

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
    let c = 0;
    Object.keys(props.pc).filter((tt) => {
      c = props.pc[cat] ? props.pc[cat] : ""
    });
    return c.length
  }
  const markel1 = (nodes, depth, id) => {
    nodes.map((t) => {
      if (t.children) markel1(t.children, depth, id)
      if (t.depth == depth && t.id == id) { t.bgcolor = "green"; }
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

      if (t != undefined && t.children) { bck(e, t.children, depth, id); }
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

    if (mode == 0)
      nodes.map((t, i) => {
        if (t.name == elmenu.parent.name && mode == 0 && elmenu.child.name != t.name) {
          if (t.children == null && mode == 0)
            t.children = []
          if (t.children.filter((tt) => tt.name == elmenu.child.name).length == 0 && mode == 0)
            if (t.name == elmenu.parentold.name && mode == 0)
              t.children.unshift({ name: elmenu.child.name, depth: 3, id: 0, bgcolor: "white", opacity: 0.4 })
            else
              t.children.unshift({ name: elmenu.child.name, depth: 0, id: 0, bgcolor: "orange" })

          makeidlev(tree.children, 0, 0)
          for (let ii = 0; ii < 20; ii++) {
            c = 0;
            makeids(tree.children, ii)

          }


          mode = 1;
        }
        if (t.children)
          addel(t.children)


        return t

      })
      


  }
  const addtoroot = (tr) =>{alert(tr.name+"PPP")
    tr.children.splice(1,0, {name: elmenu.child.name})
    makeidlev(tree.children, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)

    }
  setFamilyTree(props.familyTree)
  props.changeconfig(2)
  }
  let el1 = {}

  let v = 0


  let j = 0;


  const zrobopacity = (e, str, d, id) => {
    e.stopPropagation();

    makeopacity(tree.children, str, d, id)


  }
  const makeopacity = (nodes, str, d, id) => {

    nodes.map((t, i) => {
      if(t.depth==0)
        arr.push(t.name)
      if (t.name == str) {

        elmenu.child.name = str; t.opacity = 0.4;
        elmenu.child.depth = t.depth;
        elmenu.child.id = t.id;
        t.cursor = "pointer"
        elmenu.child.children = t.children
        if(t.depth==0){
          elmenu.parentroot.name=i-1
        }

      } 
      if (t.depth == d && t.id == id) {
        elmenu.parentold.name = t.name
        elmenu.parentold.depth = d;
        elmenu.parentold.id = id;
        t.bgcolor = "yellow"
      } 
      
      if (t.children) { makeopacity(t.children, str, d, id); }
        setFamilyTree(familyTree);
        props.changeconfig(1)
    })

  }

  const onDragOver1 = (nodes, str, d, id) => {
    nodes.map((t) => {

      if (t.children) { onDragOver1(t.children, str, d, id); }
      if (t.name == str && t.bgcolor != "yellow") {
        t.bgcolor = "blue";
        elmenu.parentformer.name = elmenu.parent.name
        elmenu.parent.name = t.name;
        elmenu.parent.depth = t.depth;
        elmenu.parent.id = t.id;
        removeorange(tree.children, elmenu.parentformer.name)
      }
      else if (t.bgcolor != "yellow") t.bgcolor = "white"
      if (t.name != elmenu.child.name)
        t.opacity = 1;

    })

  }
  const removeorange = (nodes, str) => {
    nodes.map((t) => {

      if (str == t.name && t.bgcolor == "white") {
        if (t.children.filter((tt) => {
          return tt.name == elmenu.child.name && tt.opacity != 0.4
        }).length == 1) {
          t.children.shift()
          setFamilyTree(props.familyTree)
        }

      }
      if (t.children) removeorange(t.children, str)
    })
    setFamilyTree(props.familyTree)
  }
  let y = -1;
  const removefromroot = (tr, str) => {
    if (str == "parent")
      tr.children.map((t, i) => {
        t.children.map((t) => { if (t.name == elmenu.parent.name) y = i })
        t.children.splice(y, 1)
      })
    else {
      tr.children.map((t, i) => {
        if (t.name == elmenu.child.name) y = i;
      })
      tr.children.splice(y, 1)
    }
  }
  const zrob = (e, level) => {
    console.log(e.target.id + "  level           " + level + "::" + elmenu.child.depth)
    e.stopPropagation()
    
      addel(tree.children);
     // removeprobe(tree.children, 1, 1)
 
    setFamilyTree(props.familyTree)
    props.changeconfig(2)
  }

  const removeopacity = (tr) => {

    if (tr.children != undefined && mode == 0) {
      tr.children.map((t, i) => {
        if (t.name == elmenu.child.name)
          y = i;
      })
      alert(y)
      if (elmenu.child.children)
        tr.children.splice(y, 1, elmenu.child.children[0])
      else tr.children.splice(y, 1)

      console.log(JSON.stringify(tree))


    }
    else {
      tr.map((t) => {
        if (t.name == elmenu.parentold.name) {
          t.children.map((tt, i) => {
            if (tt.name == elmenu.child.name) y = i;
          })
          if (elmenu.child.children)
            t.children.splice(y, 1, elmenu.child.children[0])
          else t.children.splice(y, 1)
        }
        if (t.children) removeopacity(t.children)
      })

    }
    makeidlev(tree.children, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)

    }
    setFamilyTree(props.familyTree)
    props.changeconfig(props.config == 1 ? 2 : 1)
    mode = 1
  }
 
  const removeprobe = (nodes, r, remchild) => {
    if (r == 0 && remchild!="root") {

      nodes.map((t, i) => {
        if (t.name == elmenu.child.name){ yy = i
      alert(yy)
      if (yy > -1)
        nodes.splice(yy, 1)
      mode = 1
        }
      })

    }
    if(remchild=="root")
    {      if(nodes && nodes[1])
      nodes[1].children.map((tt, i) =>{
        if(tt.name==elmenu.child.name)yy=i; 
        //nodes[elmenu.parentroot.name].children.splice(yy, 1)  
        alert(nodes[1].children[yy].name)
         nodes[1].children.splice(yy, 1)
      })
      makeidlev(tree.children, 0, 0)
      for (let ii = 0; ii < 20; ii++) {
        c = 0;
        makeids(tree.children, ii)

      }
    setFamilyTree(props.familyTree)
    props.changeconfig(1)
    }

    nodes.map((t) => {
 


      if (t.children) removeprobe(t.children, r, remchild)
      makeidlev(tree.children, 0, 0)
      for (let ii = 0; ii < 20; ii++) {
        c = 0;
        makeids(tree.children, ii)

      }
    })

  }
  const addroot = (e, tt) => {

    e.stopPropagation();
    if (tt.children.filter((t) => {
      return t.name == elmenu.child.name && t;
    }).length == 0)
      tt.children.splice(1, 0, { name: elmenu.child.name })
    makeidlev(tree.children, 0, 0)
    for (let ii = 0; ii < 20; ii++) {
      c = 0;
      makeids(tree.children, ii)

    }
    setFamilyTree(props.familyTree)
    props.changeconfig(1)

  }



  return <div className="nodeel" >    {props.config == 0 && familyTree.map((t, i) => {



    return t && t.bgcolor != "orange" && <div key={i} onMouseOut={() => { tdepth = []; tid = [] }}
      onClick={(e) => {

        e.stopPropagation()
        findgreen(tree.children)
        props.changeintree(t.name, 0, 1);


        let c = 0;
        Object.keys(props.pc).filter((tt) => {
          c = props.pc[t.name] ? props.pc[t.name].length : 0
        });




        markIn(e, c, tree.children, t.depth, t.id)
        if (marked == 0) markedformer(tree.children)
        navigate("/a/" + t.name + "/pagination")
      }}

      onMouseOver={(e) => {
        bck(e, familyTree, t.depth, t.id);
        markEl(e, familyTree, t.depth, t.id)
      }}

    >


      <p
        onMouseOut={(e) => { bck(e, props.familyTree, t.depth, t.id); markEl(e, familyTree, t.depth, t.id) }}
        className="pnode"
        style={{ backgroundColor: t.bgcolor }}>        {icons[t.name]}{t.name}
        <span style={{ align: "right" }}>{t.name == props.ac.cat ? props.ac.l : ""}</span>
        {pcl(t.name) != 0 ? pcl(t.name) : ""}

      </p>


      {t.children && <TreeNode config={props.config} changeintree={props.changeintree}
        parent={props.parent}

        changeparent={props.changeparent}
        familyTree={t.children}
        settings={props.settings}
        ac={props.ac}
        pc={props.pc} id={i} depth={props.depth + 1} />}</div>


  })
  }


    {props.config == 1 && familyTree.map((t, i) => {


      return <div key={i}


        /*
        
                onClick={(e) => {
                  bck(e, familyTree, t.depth, t.id);
        
                  if (node == "")
                    markleaf(e, familyTree, 0, 0)
                  if (tid.length == 0)
                    l.push({ d: t.depth, i: t.id })
                  if (l[0]) {
                    markparent(e, familyTree, l[0].d, l[0].i)
                    parentnode.name = t.name;
                    parentnode.depth = l[0].d;
                    parentnode.id = l[0].i
                  }
                }
        
                }
        
        */
        style={{ paddingLeft: "10px", paddingTop: "5px" }} >


        {t.name != props.pc[0] && <div className="x" id="f" style={{ opacity: t.opacity, cursor: t.cursor }} draggable="true" onMouseDown={(e) => {

          zrobopacity(e, t.name, props.depth - 1, props.id)
          if (e.dataTransfer)
            e.dataTransfer.setData("text", e.target.id)


        }}

          onDragOver={(e) => {

            e.preventDefault();
            if (e.dataTransfer)
              e.dataTransfer.getData("text");

            if (e.target.id == "ff")
              t.opacity = 0.1
            console.log(t.name + "mmm" + elmenu.child.name)
            if (t.name != elmenu.child.name) {
              removeprobe(tree.children, 1, 0);
              if (mode == 0) {

                onDragOver1(tree.children, t.name, props.depth, props.id);
                zrob(e, t.depth);
                props.changeconfig(1)
              }
            }
          }}


          onDragLeave={() => {

            mode = 0;

          }
          }


          onDrop={(e) => {
            mode = 0; e.stopPropagation(); 
          }}











        >aadrag'n'drop

          <p id="text"


            className="p fw-bold"
            style={{ backgroundColor: t.bgcolor }}>{t.name}....
            {pcl(t.name) != 0 ? pcl(t.name) : ""}

          </p>
        </div>
        }
        {
          t.name == props.pc[0] &&
          <div style={{ width: "200px", borderTop: "black solid 5px" }}>click on nodes
            <div style={{ paddingTop: "20px", width: "200px", display: "flex", flexDirection: "row" }}>
              <div style={{ height: "20px", width: "20px", backgroundColor: "red" }} >node</div>
              <div style={{ padding: "20px" }}>under</div>
              <div style={{ height: "20px", width: "20px", backgroundColor: "green", marginTop: "40px" }}>main</div>
            </div>
          </div>
        }

        {
          t.children && <TreeNode changeintree={props.changeintree} config={props.config}
            parent={props.parent}
            changeconfig={props.changeconfig}

            changeparent={props.changeparent}
            familyTree={t.children}
            settings={props.settings}
            ac={props.ac}
            pc={props.pc} id={i} depth={props.depth + 1} />
        }

        {
          t.line && root == 0 && <div id="ff" draggable={true} onDragOver={(e) => {
            
            e.preventDefault();
            e.dataTransfer.getData("text");

            console.log("mode           " + mode)
            removeprobe(tree.children, root, "root");
            addtoroot(tree)







          }} 
            style={{ marginTop: "-30px", height: "50px", width: "100%", backgroundColor: "red" }} >##  ROOT</div>
        }</div>


    })}












{props.config == 2 && familyTree.map((t, i) => {


return <div key={i}


  /*
  
          onClick={(e) => {
            bck(e, familyTree, t.depth, t.id);
  
            if (node == "")
              markleaf(e, familyTree, 0, 0)
            if (tid.length == 0)
              l.push({ d: t.depth, i: t.id })
            if (l[0]) {
              markparent(e, familyTree, l[0].d, l[0].i)
              parentnode.name = t.name;
              parentnode.depth = l[0].d;
              parentnode.id = l[0].i
            }
          }
  
          }
  
  */
  style={{ paddingLeft: "10px", paddingTop: "5px" }} >


  {t.name != props.pc[0] && <div className="x" id="f" style={{ opacity: t.opacity, cursor: t.cursor }} draggable="true" onMouseDown={(e) => {

    zrobopacity(e, t.name, props.depth - 1, props.id)
    if (e.dataTransfer)
      e.dataTransfer.setData("text", e.target.id)


  }}

    onDragOver={(e) => {

      e.preventDefault();
      if (e.dataTransfer)
        e.dataTransfer.getData("text");

      if (e.target.id == "ff")
        t.opacity = 0.1
      console.log(t.name + "mmm" + elmenu.child.name)
      if (t.name != elmenu.child.name) {
        removeprobe(tree.children, 1, 0);
        if (mode == 0) {

          onDragOver1(tree.children, t.name, props.depth, props.id);
          zrob(e, t.depth);
          props.changeconfig(1)
        }
      }
    }}


    onDragLeave={() => {

      mode = 0;

    }
    }


    onDrop={(e) => {
      mode = 0; e.stopPropagation(); 
    }}











  >aadrag'n'drop

    <p id="text"


      className="p fw-bold"
      style={{ backgroundColor: t.bgcolor }}>{t.name}....
      {pcl(t.name) != 0 ? pcl(t.name) : ""}

    </p>
  </div>
  }
  {
    t.name == props.pc[0] &&
    <div style={{ width: "200px", borderTop: "black solid 5px" }}>click on nodes
      <div style={{ paddingTop: "20px", width: "200px", display: "flex", flexDirection: "row" }}>
        <div style={{ height: "20px", width: "20px", backgroundColor: "red" }} >node</div>
        <div style={{ padding: "20px" }}>under</div>
        <div style={{ height: "20px", width: "20px", backgroundColor: "green", marginTop: "40px" }}>main</div>
      </div>
    </div>
  }

  {
    t.children && <TreeNode changeintree={props.changeintree} config={props.config}
      parent={props.parent}
      changeconfig={props.changeconfig}

      changeparent={props.changeparent}
      familyTree={t.children}
      settings={props.settings}
      ac={props.ac}
      pc={props.pc} id={i} depth={props.depth + 1} />
  }

  {
    t.line && root == 0 && <div id="ff" draggable={true} onDragOver={(e) => {
      
      e.preventDefault();
      e.dataTransfer.getData("text");

      console.log("mode           " + mode)
      removeprobe(tree.children, root, "root");
      addtoroot(tree)







    }} 
      style={{ marginTop: "-30px", height: "50px", width: "100%", backgroundColor: "red" }} >##  ROOT</div>
  }</div>


})}























  </div >
}

export default TreeNode;

