import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate , useLocation
} from "react-router-dom";
import Pagination from "./Pagination"
import Searching from "./Searching";
import Update from "./Update";
import "./Table.scss"
import UserContext from "../ctx/User";
import Tab from "./Tab";
import { findByLabelText } from "@testing-library/react";
import { tab } from "@testing-library/user-event/dist/tab";










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
    useEffect(() => {
        setPostPerPage(props.postPerPage)

        setSearchtext([""])
    }, [props.postPerPage]);
  

    const [searchtext, setSearchtext]=useState([""])
    const [searchi, setSearchi]=useState({new:1, old:0})
    const [tabs, setTabs] = useState({eltabs:[{name:"all records", words:"", saved:1},], searchtext:searchtext})
    let r = "";
    useEffect(() => {

        let r = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);

        if (r.charAt(0) != 0 && r != "p" && typeof r.charAt(0) != "string") {
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
            window.location.href.indexOf("searchtext")!=-1 &&
            setStop(stop=>stop)
            window.location.href.indexOf("searchtext")==-1 &&
            setStop(stop=>0)
            setNumber(pageNumber);
        };
    const makepagination = () => {
    

    
        if (props.number1 == 0) {
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
 
 
        if (lastPost == 0)
            lastPost = postPerPage
              currentPost =   data.slice(firstPost, lastPost)
    
              console.log("pmmmmmmo   "+ pageNumber.length )
        if (firstPost > border[biw]) {
    
    
            for (let i = 0; i < 10; i++) {
    
                pageNumber.unshift()
                console.log(data1.length+" v   "+ JSON.stringify(pageNumber) )
            }
        }


        Math.floor(data1.length / postPerPage) >= 10 ? span = 10 : span = Math.floor(data.length / postPerPage) + 1
    
        for (let i = (fp); i <= border[biw] / postPerPage + span; i++) {
    
            if (Math.floor(data1.length / postPerPage) < 10 + 1)
                pageNumber.push(i - border[biw] / postPerPage);
            else
                pageNumber.push(i);
        }

        return {firstPost: firstPost, lastPost: lastPost}
    }


    let ttt = 0;


    const arr = [];
    let lastPost = 0;
    let firstPost = 0;
 
 makepagination()

 let u=0;
    useEffect(()=>{
        console.log(stop+" przed  "+JSON.stringify(currentPost.length))
        const arr = [];
        let lastPost = 0;
        let firstPost = 0;
    
        if (props.number1 == 0) {
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
          return           typeof r[row] == "string" &&  r[row].indexOf(searchtext[searchi.new])!=-1 
         })
        }))
       // currentPost= data1.slice(firstPost, lastPost)


       let obj = Object.assign({}, makepagination())

    
        setSliced(slice=> data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
            return           typeof r[row] == "string" &&  r[row].indexOf(searchtext[searchi.new])!=-1 
           })
          }).slice(obj.firstPost, obj.lastPost))
 
        console.log(" przed  "+ data1.length)
         setFlagel(flagel)
 
    },[stop, number])
 









    const buildHeader = (header, columns) => {
        data.map((t, i) => {
            let ii = 0; for (let f of Object.values(t)) { if (typeof f == "object") arr.push(ii); ii++ }
        })
        header.map((k, i) => { return arr.indexOf(i) == -1 ? (cell = { col: { name: "", disp: true } }, cell.col.zzzzzzzzzzzzz = k, col.push(cell)) : null })
        let h = header.map((k, ii) => {
            return (arr.indexOf(ii) == -1 && props.columns[ii]
                && props.columns[ii].col.disp == true)
                ? (<th key={ii} className="tr" onClick={() => { sortarr(k, i); setChevron(!chevron); }}>
                    <div onMouseOver={() => setI(ii)} >
                        {
                            chevron && ii == i ? <i className="fa fa-chevron-up"></i> : chevron == false && ii == i ?
                                <i className="fa fa-chevron-down"></i> : null
                        }
                        c{k}</div></th>) : null
        })

        col.shift();

        return (<tr ><th className="tr">selected</th>{h}</tr>)
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

        setBiw(props.number1 == 0 ? Math.floor((number - 1) / 10) : Math.floor((number) / 10))

    }
     useEffect(() => {
        const timeout = countdown && countdown!=tovalue && setTimeout(() => {
 
            countdown<tovalue && setCountdown(countdown +1);
            countdown>tovalue && setCountdown(countdown -1);
            if(countdown%postPerPage==0 && countdown/postPerPage>0 && countdown<tovalue){setNumber(number=>number+1);setCountdown(countdown +1);}
            if(countdown%postPerPage==0 && countdown/postPerPage>0 && countdown>tovalue ) {setNumber(number=>number-1); setCountdown(countdown -1);}
     }, 50);
        return () => {

            setOldIndex(countdown)
            setOldnumber(number)
            clearTimeout(timeout);
            
            console.log(countdown+"   ct "+ tovalue)
        }
    }, [countdown]);

    const buildRow = (row, i) => {
        let m = 0;


        let tr = Object.keys(row).map((k, j) => {
            return typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp == true
                ?
                <td onClick={(e) => {setName(row[k]);setCountdown(oldindex); setTovalue(firstPost+i); setNumber(oldnumber);
                    setOldel((parseInt(firstPost) + parseInt(currentPost.length))/10-1) ;}}
                 className={    countdown==firstPost+i    ? "red"  : "white" + 
                 (  green==firstPost+i && countdown==tovalue && " green") + ( green==firstPost+i && " green") } key={j}
                 onMouseOver={() => {;setGreen(firstPost+i);console.log(countdown+"::"+  tovalue); url = "/" + row.id + "/edit"; setId(row.id);
                  }} ><div className="div1">{row[k]}</div></td >
                : typeof row[k] !== "object" && props.columns[j] && props.columns[j].col.disp == true
                    && j == 2 ?


                    <td key={j} onMouseOver={() => { url = "/a/" + props.acturl + "/pagination/" + row[k] + "/" + row.id + "/lll" + "/1/edit"; setId(row.id); }} >
                        <div className="div1">{row[k]}</div>
                    </td >




                    : col[j].col.disp = false

        });


        return (<tr key={i} ><td>{row.checkbox == true ? <input type="checkbox" id={row.id + "/"}
         />
            : <input style={{ position: "relative", top: "10px", float: "left" }} type="checkbox" id={row.id}  
              />}<div style={{ cursor: "pointer", textDecoration: "underline" }}
                    onMouseOver={() => {url = "/a/" + props.acturl + "/pagination/" + row.name + "/" + row.id + "/" + row.name + "/1/edit"; setId(row.id); }}
                    onClick={(e) => {
                        dv(url, row[Object.keys(row).filter((t, i) => { return i == 2 && t })],
                            Object.keys(row).filter((t, i) => { return i == 2 && t }), row.id)
                    }} >edit</div></td>{tr}</tr>);

    }


    let length1=0;

    const d = () => { ttt = 1;; }
    const sortarr = (k, i) => {
        setSort(!sort)
        let r = Object.keys(data[0]).filter((t, index) => { return data[0][t] })

        sort ? (data.sort(function (a, b) {
            return typeof a[r[i]] == "string" ? a[r[i]].localeCompare(b[r[i]]) : a[r[i]] - b[r[i]];
        })
        )
            :
            (data.sort(function (a, b) {
                return typeof a[r[i]] == "string" ? b[r[i]].localeCompare(a[r[i]]) : b[r[i]] - a[r[i]];

            })
            )

    }





    const routeElement = (r) => {
        return (<tr><td>ddddd</td></tr>);
    }
 

    const setValue =(str) => { 

 
 
        if(tabs.eltabs.length<8 && tabs.eltabs[tabs.eltabs.length-1].saved==1)
             tabs.eltabs.push({name:str, words: "ddd", saved:2})
         else if(tabs.eltabs.length<8 && tabs.eltabs[tabs.eltabs.length-1].saved==2)
            tabs.eltabs.splice(tabs.eltabs.length-1, 1, {name:str, words: "ddd", saved:2})

        searchtext[tabs.eltabs.length-1]=str;
        
        setSearchtext(searchtext)
         setSearchi({new: tabs.eltabs.length-1, old:searchi-1})  
        setTabs(tabs);
        
        setFlagel(!flagel)
    }
 const savetab =(str) =>{
    tabs.eltabs.splice(tabs.eltabs.length-1, 1, {name:tabs.eltabs[tabs.eltabs.length-1].name, words:"ttt", saved:1})
    setFlagel(!flagel)
 }

if(data1.length==0)
 pageNumber=[1,2,3,4,5,6]

   useEffect(() => { 
    console.log(stop+" przed  "+JSON.stringify(currentPost.length))
    const arr = [];
    let lastPost = 0;
    let firstPost = 0;

    if (props.number1 == 0) {
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



    console.log("  222222222222222222222222"+data1.length)
    setData1(data1=> data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
      return           typeof r[row] == "string" &&  r[row].indexOf(searchtext[searchi.new])!=-1 
     })
    }))
   // currentPost= data1.slice(firstPost, lastPost)


   let obj = Object.assign({}, makepagination())


    setSliced(slice=> props.data.filter((r) => {return Object.keys(data[0]).some((row)  => {  
        return           typeof r[row] == "string" &&  r[row].indexOf(searchtext[searchi.new])!=-1 
       })
      }).slice(firstPost, lastPost))
    console.log("  111111111111"+data1.length)
    setNumber(1)
    firstPost=21;
    lastPost=31 ;
 
    pageNumber=[1,2,3,4,5,6,7]
     setFlagel(flagel)
  }, [location])
 
 
const z = <div className="tablecontainer">{<div className={countdown==tovalue ? "s" : "s1"}>
     {countdown}</div>}<span style={{width: "20px"}}></span>  {(parseInt(firstPost) + parseInt(currentPost.length))-10+ " - "+ (parseInt(firstPost) + parseInt(currentPost.length)) + " from " + data.length}</div>
    const el = <div> {z}    
        {   window.location.href.indexOf("searchtext")!=-1 ? 
        <Searching i={window.location.href.indexOf("searchtext")} searchtext={searchtext[searchi.new]} 
        saved={tabs.eltabs[tabs.eltabs.length-1].saved} setValue={(es)=> {setValue(es); setStop(stop=>stop+1);setNumber(0);}} savetab={()=>savetab()}/>
     :<div style={{height:"30px"}}></div> }
        {props.flagsettings != 4 &&  <Pagination stop={stop} acturl={props.acturl} fp={1} span={span} postPerPage={postPerPage} number={number} 
        pageNumber={  
                                                         pageNumber 
                                                       }
           oldel={oldel} ChangePage={ChangePage} setN={setN} length={
            window.location.href.indexOf("searchtext")!=-1 ? data1.length : props.data.length
           } firstPost={1} tovalue={Math.ceil(tovalue/10)-1}/>
             }
        <div ><div>found: {  fp}</div>
            {
                element == 1 ? null
                    :

                    <div className="table1">
                        <div className="tabs">{
                            window.location.href.indexOf("searchtext")!=-1 &&  tabs.eltabs!=undefined && tabs.eltabs.map((t, j) => {
                                return <Tab searchi={searchi} j={j} name={t.name} 
                                
                                setsi={(e) => {
                                    
                                    console.log(JSON.stringify(searchi));setSearchi({old: searchi.new, new:j}); 
           
                                setStop(stop=>stop+1)
              
                                
                                




                                                 navigate("searchtext/"+t.words);}} />          
                            })
                        }
                        </div>
                        <table>
                        <thead className="th">
                            {data[0] ? buildHeader(Object.keys(data[0]), data.columns) : null}
                        </thead>
                        <tbody>{
                            view == 1 ?
                                currentPost.length >= 0 && data1.length==data.length ? sliced.map(buildRow) : stop==0 && currentPost.map(buildRow) 
                                ? stop==0 && currentPost.map(buildRow) : sliced.map(buildRow) :
                                <tr><td>dddddddddddd</td></tr>  
                        }</tbody>
                    </table>
                    </div>

            }
        </div>
    </div>;

    return (



        <>
            {flagel == true ?
                el : el
            }

 
        </>

    )
}

export default Table;