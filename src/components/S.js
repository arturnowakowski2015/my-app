import { render } from '@testing-library/react';
import  { useState, useContext } from 'react';
import {recits} from "../data/dummy";
import UserContext from "../User";
 
  function S() {
    const [items, updateItems] = useContext(UserContext);
    return <button onClick={updateItems}>Count is: {items}</button>;
  }
   
export default S;
