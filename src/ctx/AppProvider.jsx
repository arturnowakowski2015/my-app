import React, { useState } from "react";
import UserContext from "./User"; let y = 0;
function AppProvider(props) {

 
 
 
 

  return (
    <UserContext.Provider  >{props.children}</UserContext.Provider>
  );
}

export default AppProvider;
