const el = <div> {z}    
{   window.location.href.indexOf("searchtext")!==-1 ? 
<Searching i={window.location.href.indexOf("searchtext")} searchtext={searchtext[indextab].searchtext[searchi]} searchi={searchi.new}
saved={to[indextab]!==undefined && to[indextab].eltabs[to[indextab].eltabs.length-1].saved} len={data1.length} setValue={(es)=> {setValue(es); setStop(stop=>stop+1);setNumber(0);}} savetab={()=>savetab()}/>
:
<div style={{height:"30px"}}></div> }