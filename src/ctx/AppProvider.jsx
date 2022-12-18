import React, { useState } from "react";
import UserContext from "./User"; let y = 0;
function AppProvider(props) {

  const [changeAll, setChangeAll] = React.useState(0)
  const [count, setCount] = React.useState([]);
  const df = () => { };

  function updateCount(e, id, all, data, data2) {
    setChangeAll(all);
    let r = [];
    if (all == 0 && data2 == "false") {
      r = count.filter((t) => {


        return t.id != id;
      })
    }
    alert(r.length + "   :rr:")
    let rdata = []
    if (all == 1) {

      rdata = data.map((t, i) => {

        let obj = { id: i + 1, checked: true }
        r.push(obj)
        return t
      })

    } else if (all == 2) {

      rdata = data.map((t, i) => {

        let obj = { id: i + 1, checked: false }
        r.push(obj)
        return t
      })
    }

    let y = [];
    if (all == 0)
      y = count.filter((t) => { return t && t.id })

    if (all == 3) {
      y = count.filter((t) => { return !t })

    }
    let w = 0;
    all == 0 && typeof e == "object" ? setCount((count) => [...y, e]) : setCount((count) => [...r])
    console.log("y               " + JSON.stringify(count))


  }
  const value = [count, updateCount];

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export default AppProvider;
