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

 
}, [sortarr])


