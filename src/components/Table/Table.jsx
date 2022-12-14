import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate , useLocation
} from "react-router-dom";
import Pagination from "./Pagination"
import Searching from "../Different/Searching";
import Update from "../Different/Update";
import "./Table.scss"
 
import Tab from "../Different/Tab";
import { findByLabelText } from "@testing-library/react";
import { tab } from "@testing-library/user-event/dist/tab";
import { clear } from "@testing-library/user-event/dist/clear";










const Table = (props, columns) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [flagel, setFlagel] = useState(true)
    const [biw, setBiw] = useState(0)
    const [sort, setSort] = useState(true)
    const [view, setView] = useState(1)
    const [id, setId] = useState(0);
    const [number, setNumber] = useState(1); // No of pages
    const [element, setElement] = useState(3)
    const [chevron, setChevron] = useState("false")
    const [i, setI] = useState(0);
    let { data } = props;
    const[green, setGreen]=useState(0)
    const [postPerPage, setPostPerPage] = useState(props.postPerPage);
    const [oldnumber, setOldnumber]=useState(1);
    const[oldel, setOldel]= useState(0)
    const [view1, setView1]=useState(1)
    const [index, setIndex] = useState(3)
    const[oldindex, setOldIndex]=useState(1)
    const [tovalue, setTovalue] = useState(0);
    const [name, setName] = useState("####")
    const[countdown, setCountdown]=useState(0);
    const[data1, setData1]=useState([]);
    const[stop, setStop] = useState(0)
    const[sliced, setSliced]=useState([])
    const[paginationdesapear, setPaginationdesapear]=useState(true);
    const[indextab, setIndextab]=useState(location.pathname.split("/")[2])
    const [ limit, setLimit] = useState(props.data.length)
    useEffect(() => {
        setPostPerPage(props.postPerPage)

        setSearchtext({
            new:{searchtext:[""]},  received:{searchtext:[""]}, selected:{searchtext:[""]}, postponed:{searchtext:[""]}, 
            removed:{searchtext:[""]},   labels:{searchtext:[""]}
        })
    }, [props.postPerPage]);
 

    const [searchtext, setSearchtext]=useState({
        new:{searchtext:[""]},  received:{searchtext:[""]}, selected:{searchtext:[""]}, postponed:{searchtext:[""]}, 
        removed:{searchtext:[""]},   labels:{searchtext:[""]}
    })
    const [searchi, setSearchi]=useState({new:0, old:0})
    const [to, setTo] = useState(
        {
            new:{eltabs:[{name:"all records", words:"", saved:1},], searchtext:searchtext},
            received:{eltabs:[{name:"all records", words:"", saved:1},], searchtext:searchtext},
         selected:{eltabs:[{name:"all records", words:"", saved:1},], searchtext:searchtext},
        postponed:{eltabs:[{name:"all records", words:"", saved:1},], searchtext:searchtext},
        removed:{eltabs:[{name:"all records", words:"", saved:1},], searchtext:searchtext},
        labels:{eltabs:[{name:"all records", words:"", saved:1},], searchtext:searchtext}
      })
    let r = "";
    useEffect(() => {

        let r = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);

        if (r.charAt(0) !== 0 && r !== "p" && typeof r.charAt(0) !== "string") {
            setNumber(r.charAt(0))
            r = "";
        }

    }, [setNumber]);
        let pageNumber = [];
        let cell = { col: { name: "ddd", disp: true } };
        let col = [cell];
    
    
        const border = [0, postPerPage * 10, postPerPage * 20, postPerPage * 30, postPerPage * 40,
            postPerPage * 50, postPerPage * 60, postPerPage * 70, postPerPage * 80, postPerPage * 90
        ];
    
        let fp = border[biw] ? border[biw] / postPerPage + 1 : 1;
        let span = 0
        let e =""
        let currentPost =""
        const ChangePage = (pageNumber) => {
            window.location.href.indexOf("searchtext")!==-1 &&
            setStop(stop=>stop)
            window.location.href.indexOf("searchtext")===-1 &&
            setStop(stop=>0)
 
            setNumber(pageNumber);
        };
    const makepagination = () => {
    

    if(props.checkall[0]===0){
 
        if (props.number1 === 0) {
            lastPost = number * postPerPage;
            firstPost = lastPost - postPerPage;
        } else {
    
            lastPost = number * postPerPage;
            firstPost = lastPost - postPerPage;
            if (firstPost > data.length) {
                firstPost = 0;
                setNumber(Math.floor(data1.length / postPerPage))
    
            }
        }
    }
    else{
        firstPost=  props.data.length-10
        lastPost = props.data.length
    }
 
        if (firstPost < 0) {
            firstPost = 0;
    
        }
 
 
        if (lastPost === 0)
            lastPost = postPerPage
            if(data)
              currentPost =   data.slice(firstPost, lastPost)
     
        if (firstPost > border[biw]) {
    
    
            for (let i = 0; i < 10; i++) {
    
                pageNumber.unshift() 
            }
        }


        Math.floor(data1.length / postPerPage) >= 10 ? span = 10 : span = Math.floor(data && data.length / postPerPage) + 1
    
        for (let i = (fp); i <= border[biw] / postPerPage + span; i++) {
    
            if (Math.floor(data1.length / postPerPage) < 10 + 1)
                pageNumber.push(i - border[biw] / postPerPage);
            else
                pageNumber.push(i);
        }
   
        let r = (props.checkedall===false ?  {firstPost:  props.length-10, lastPost: props.data.length}: 
        {firstPost:  firstPost, lastPost:lastPost})
     
         return  r

    }

 
    let ttt = 0;


    const arr = [];
    let lastPost = 0;
    let firstPost = 0;
 
 makepagination()

 let u=0;
    useEffect(()=>{ 
        const arr = [];
        let lastPost = 0;
        let firstPost = 0;
    
        if (props.number1 === 0) {
            lastPost = number * postPerPage;
            firstPost = lastPost - postPerPage;
        } else {
    
            lastPost = number * postPerPage;
            firstPost = lastPost - postPerPage;
            if (firstPost > data.length) {
                firstPost = 0;
                setNumber(Math.floor(data.length / postPerPage))
    
            }
        }
        if (firstPost < 0) {
            firstPost = 0;
    
        }

 


        setData1(data1=>data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
          return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1 
         })
        }))
       // currentPost= data1.slice(firstPost, lastPost)


       let obj = Object.assign({}, makepagination())
          setSliced(slice=> data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
            return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1 
           })
          }).slice(obj.firstPost, obj.lastPost))
 
         setFlagel(flagel)
 
    },[stop, number, props.data, props.postPerPage, props.columns])
 









    const buildHeader = (header, columns) => {
        data.map((t, i) => {
            let ii = 0; for (let f of Object.values(t)) { if (typeof f === "object") arr.push(ii); ii++ }
        })
        header.map((k, i) => { return arr.indexOf(i) === -1 ? (cell = { col: { name: "", disp: true } }, cell.col.zzzzzzzzzzzzz = k, col.push(cell)) : null })
        let h = header.map((k, ii) => {
            return (arr.indexOf(ii) === -1 && props.columns[ii]
                && props.columns[ii].col.disp === true)
                ? (<th key={ii} className="tr" onClick={() => { sortarr(k, i); setChevron(!chevron); }}>
                    <div onMouseOver={() => setI(ii)} >
                        {
                            chevron && ii === i ? <i className="fa fa-chevron-up"></i> : chevron === false && ii === i ?
                                <i className="fa fa-chevron-down"></i> : null
                        }
                            {k}</div></th>) : null
        })

        col.shift();

        return (<tr ><th className="selected">selected</th>{h}</tr>)
    }
    const df = (i, o) => {
        props.df(i, o)
        setElement(1)
    }
    let url = "";

    const loop = () => {
        for (let i = 0; i < 1111100; i++) {
            Math.sqrt(i);
        }
    }
    const mkf = (e) => {
        setFlagel(false)
    }
  
    const dv = (url, str, upstr, i) => {

        props.furl(3, i, props.i, "u", str, upstr);
        navigate(url, {
            state: {
                id: props.id,
                idrec: i,
                str: str,
                settingsid: props.settingsid
            }
        });
    };
    const setN = number => {
        r = "p"
        setNumber(number)

        setBiw(props.number1 === 0 ? Math.floor((number - 1) / 10) : Math.floor((number) / 10))

    }
     useEffect(() => {
        const timeout = countdown && countdown!==tovalue && setTimeout(() => {
 
            countdown<tovalue && setCountdown(countdown +1);
            countdown>tovalue && setCountdown(countdown -1);

            if(countdown%postPerPage===0 && countdown/postPerPage>0 && countdown<tovalue){setNumber(number=>number+1);setCountdown(countdown +1);}
            if(countdown%postPerPage===0 && countdown/postPerPage>0 && countdown>tovalue ) {setNumber(number=>number-1); setCountdown(countdown -1);}
 
            navigate("/a/"+location.pathname.split("/")[2]+"/pagination/"+number+"/"+countdown+"/"+
                
           (location.pathname.split("/")[6]!=undefined ? location.pathname.split("/")[6] : ""))
     }, 50);
        return () => {

            setOldIndex(countdown)
            setOldnumber(number)
            clearTimeout(timeout);
             
        }
    }, [countdown]);

    const buildRow = (row, i) => {
        let m = 0;


        let tr = Object.keys(row).map((k, j) => {
            return typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp === true
                ?
                <td onClick={(e) => {setName(row[k]);setCountdown(oldindex); setTovalue(firstPost+i); setNumber(oldnumber);
                    setOldel((parseInt(firstPost) + parseInt(currentPost.length))/10-1) ;}}
                 className={    countdown===firstPost+i    ? "red"  : "white" + 
                 (   green===firstPost+i && " green") 
                } key={j}
                 onMouseOver={() => {;setGreen(firstPost+i);  url = "/" + row.id + "/edit"; setId(row.id);
                  }} ><div className="div1">{row[k]}</div></td >
                : typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp === true
                    && j === 2 ?


                    <td key={j} onMouseOver={() => { url = "/a/" + props.acturl + "/pagination/" + row[k] + "/" + row.id + "/lll" + "/1/edit"; setId(row.id); }} >
                        <div className="div1">{row[k]}</div>
                    </td >




                    : col[j].col.disp = false

        });


        return (<tr key={i} ><td>{row.checkbox === true ? <input type="checkbox" id={row.id + "/"} 
         />
            : <input style={{ marginLeft:"20px",position: "relative", top: "10px" }} 
            type="checkbox" id={row.id} 
            checked={props.checkedel!==undefined && props.checkedel.filter((t) => {return t===row.id  }).length===1 && true}
            onChange={()=>{props.setchecked(row.id, location.pathname.split("/")[2])
        navigate("/a/"+location.pathname.split("/")[2]+"/pagination/selected")
    }} />}<div style={{marginLeft:"60px",height:"20px",position:"relative",top:"-20px", cursor: "pointer" ,  textDecoration: "underline" }}
                    onMouseOver={() => {url = "/a/" + props.acturl + "/pagination/" + row.name + "/" + row.id + "/" + row.name + "/1/edit"; setId(row.id); }}
                    onClick={(e) => {
                        dv(url, row[Object.keys(row).filter((t, i) => { return i === 2 && t })],
                            Object.keys(row).filter((t, i) => { return i === 2 && t }), row.id)
                    }} > edit</div></td>{tr}</tr>);

    }


    let length1=0;

    const d = () => { ttt = 1;; }
    const sortarr = (k, i) => {
        navigate("/a/"+location.pathname.split("/")[2]+"/pagination"+"/"+number+"/"+countdown);
        setSort(!sort)
        let r = Object.keys(data[0]).filter((t, index) => { return data[0][t] })

        sort ? (data.sort(function (a, b) {
            return typeof a[r[i]] === "string" ? a[r[i]].localeCompare(b[r[i]]) : a[r[i]] - b[r[i]];
        })
        )
            :
            (data.sort(function (a, b) {
                return typeof a[r[i]] === "string" ? b[r[i]].localeCompare(a[r[i]]) : b[r[i]] - a[r[i]];

            })
            )

    }





    const routeElement = (r) => {
        return (<tr><td>ddddd</td></tr>);
    }
 

    const setValue =(str) => { 
 
 
        if(to[indextab].eltabs.length<8 && to[indextab].eltabs[to[indextab].eltabs.length-1].saved===1)
             to[indextab].eltabs.push({name:str, words: str, saved:2})
         else if(to[indextab].eltabs.length<8 && to[indextab].eltabs[to[indextab].eltabs.length-1].saved===2)
            to[indextab].eltabs.splice(to[indextab].eltabs.length-1, 1, {name:str, words: str, saved:2})

        searchtext[indextab].searchtext[to[indextab].eltabs.length-1]=to[indextab].eltabs[to[indextab].eltabs.length-1].words
        
        setSearchtext(searchtext)
         setSearchi({new: to[indextab].eltabs.length-1, old:searchi-1})  
        setTo(to);
        
        setFlagel(!flagel) 
        navigate("/a/"+location.pathname.split("/")[2]+"/pagination/"+number+"/"+countdown+"/"+
                
        (location.pathname.split("/")[6]!=undefined ? location.pathname.split("/")[6]+ "/"+
        searchtext[indextab].searchtext[searchi.new!=0 ? searchi.new : 1]  : ""))
    }
 const savetab =(str) =>{    
    to[indextab].eltabs.splice(to[indextab].eltabs.length-1, 1, {name:to[indextab].eltabs[to[indextab].eltabs.length-1].name, words:searchtext[indextab].searchtext[searchtext[indextab].searchtext.length-1], saved:1})
     setFlagel(!flagel)
 }
let j =-1;


if(data1.length===0)
 pageNumber=[1,2,3,4,5,6]

 const limit1 =( ) =>
{
    const timer = setTimeout(()=>{
        setLimit(limit=>limit+1)
        limit1( ) 
       ++j;
    }, 100); 
  
    if(data.length==0 && j>6)clearTimeout(timer);
    else if(data.length!=0 && j>Math.ceil(data.length/10))clearTimeout(timer);
     //else
   // if(data!=0 && j>Math.ceil(data/10))clearTimeout(timer)
}  
 
useEffect(()=>{
    limit1()
}, [])
   useEffect(() => { 
    setIndextab(location.pathname.split("/")[2]); 

    const arr = [];
    let lastPost = 0;
    let firstPost = 0;

    if (props.number1 === 0) {
        lastPost = number * postPerPage;
        firstPost = lastPost - postPerPage;
    } else {

        lastPost = number * postPerPage;
        firstPost = lastPost - postPerPage;
        if (firstPost > data.length) {
            firstPost = 0;
            setNumber(Math.floor(data1.length / postPerPage))

        }
    }
    if (firstPost < 0) {
        firstPost = 0;

    }

  
    setData1(data1=> props.data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
      return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1 
     })
    }))
   // currentPost= data1.slice(firstPost, lastPost)


   let obj = Object.assign({}, makepagination())
     setSliced(slice=> props.data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
        return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1  })
      }).length ? 
      props.data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
        return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1 
       })
      }).slice(obj.firstPost, obj.lastPost) :
      props.data.filter((r) => {return r}).slice(obj.firstPost, obj.lastPost)
      ) 
 
    setNumber(1)
    firstPost=21;
    lastPost=31 ;
 setStop(0)
    pageNumber=[1,2,3,4,5,6,7]
     setFlagel(flagel)
        //setLimit(limit=>-1)
   
  }, [location.pathname.split("/")[2]])
 

  useEffect(() => { 
    setIndextab(location.pathname.split("/")[2]); 

    const arr = [];
    let lastPost = 0;
    let firstPost = 0;

    if (props.number1 === 0) {
        lastPost = number * postPerPage;
        firstPost = lastPost - postPerPage;
    } else {

        lastPost = number * postPerPage;
        firstPost = lastPost - postPerPage;
        if (firstPost > data.length) {
            firstPost = 0;
            setNumber(Math.floor(data1.length / postPerPage))

        }
    }
    if (firstPost < 0) {
        firstPost = 0;

    }

  
    setData1(data1=> props.data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
      return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1 
     })
    }))
   // currentPost= data1.slice(firstPost, lastPost)


   let obj = Object.assign({}, makepagination())
     setSliced(slice=> props.data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
        return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1  })
      }).length ? 
      props.data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
        return           typeof r[row] === "string" &&  r[row].indexOf(searchtext[indextab].searchtext[searchi.new])!==-1 
       })
      }).slice(obj.firstPost, obj.lastPost) :
      props.data.filter((r) => {return r}).slice(obj.firstPost, obj.lastPost)
      ) 
  
   
  }, [sort])









const setsi = (j,t) => {
    
    setSearchi({old:searchi.old, new:j});  
    setStop(stop=>stop+1);
    // setNumber(0); 
     navigate("/a/"+location.pathname.split("/")[2]+"/pagination/"+number+"/"+countdown+"/"+
                
     (location.pathname.split("/")[6]!=undefined ? location.pathname.split("/")[6]+ "/"+t: ""))

}
const z = <div className="tablecontainer">
    { 
          props.checkall[1]===0 && props.desapear[2] &&
            <div className={(countdown===tovalue  ? "s" : "s1") }>
                {countdown}</div>
    }
     
 
    </div>



    const el = <div className="pag">  
                 

   
        <div className="pagcont">
            <div class="pagcon"> {z}  

            {   
                 window.location.href.indexOf("searchtext")!==-1 
                 ? 
                     <div className={props.desapear[4] ? "searchingvisible": "searching"}  transition-style= {props.desapear[4] ? "in:circle:center" : ""}>
                     <Searching 
                            i={window.location.href.indexOf("searchtext")} 
                            searchtext={ to[indextab].eltabs[searchi.new]!==undefined ? to[indextab].eltabs[searchi.new].words : ""  } 
                            searchi={searchi.new}
                            saved={to[indextab]!==undefined && to[indextab].eltabs[to[indextab].eltabs.length-1].saved} 
                            len={data1.length}
                             setValue={(es)=> {setValue(es); 
                             setStop(stop=>stop+1);setNumber(0);}} 
                             savetab={()=>savetab()}
                        />
                </div>

                :
                <div style={{height:"30px"}}></div> 
            }

                       {((props.flagsettings !== 4 && data1.length) ||
                    (data1.length===0 && window.location.href.indexOf("searchtext")===-1) 
                    || window.location.href.indexOf("searchtext")!==-1 && sliced.length!==0)
                    && data.length > 0 && 
                    <div className={props.desapear[2] ? "pagination"  : "pd" } 
                             transition-style= {props.desapear[2] ? "in:circle:center" : ""}
                    > 
                    
        
                    <Pagination
                         changeintree={props.changeintree} stop={stop} acturl={props.acturl} fp={1} span={span} postPerPage={postPerPage} number={number} 
                         pageNumber={   pageNumber } 
                         limit={limit}
                        oldel={oldel}
                        currentPost={currentPost}
                         ChangePage={ChangePage} 
                         setN={setN} 
                         length={ window.location.href.indexOf("searchtext")!==-1 ? data1.length : (props.data && props.data.length )}
                         firstPost={1} 
                         tovalue={Math.ceil(tovalue/10)-1}
                         checkall={props.checkall}
                         countdown={countdown}
                    />
           </div>
             }
        
        </div>
            {
                element === 1 ? null
                    :

                    <div  className={props.desapear[3] ? "table1" : "desapeartable"} 
               
                         transition-style= {props.desapear[3] ? "in:circle:center" : ""} > 
                    <div className={props.desapear[2] ? "tabs"  : "" } >{
                        window.location.href.indexOf("searchtext")!==-1 &&  to[indextab]!==undefined && 
                        to[indextab].eltabs.map((t, j) => {
                            return   <Tab 
                                        len={data1.length} 
                                        searchi={searchi} 
                                        j={j} 
                                        displ={props.displ}
                                        name={t.name}                           
                                        setsi={()=>setsi(j, t.words)} />          
                        })
                    }
                    </div>
                        <table>
                        <thead className="th">
                            {data && data[0] ? buildHeader(Object.keys(data && data[0]),data && data.columns) : null}
                        </thead>
                        <tbody>{
                            view === 1 ? 
                              currentPost.length >= 0 && data  && data1.length===data.length 
                              ? sliced.map(buildRow) 
                              : stop===0 && currentPost && currentPost.map(buildRow) 
                            ? stop===0 && currentPost && currentPost.map(buildRow) 
                            : sliced.map(buildRow) 
                            : <tr><td>dddddddddddd</td></tr>  
                        }</tbody>
                    </table>
                    </div>

            }
        </div>
    </div>;

    return (
           <>
               {flagel === true ?
                  el : el 
              }
        </>

    )
}

export default Table;