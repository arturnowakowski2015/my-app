
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link
} from "react-router-dom";
import Settings from "./components/Settings";
import Select from './components/Select';
import AppProvider from "./ctx/AppProvider";
import Home from "./components/Home";
import Update from "./components/Update";
 
import Searching from "./components/Searching";
import Table from "./components/Table";

import "./App.scss"


function App() { 
const[el, setEl]=useState(0)
const[old, setOld]=useState(-1)

  return (
    <div>    
 


        <Router>
 

          <Routes>



            <Route exact path="/a/:elem/pagination" element={<Home />} >
              <Route exact path="settings" element={<Settings />} />
              <Route path="searchtext" element={<Table />} >
                  <Route path=":r" element={<Searching /> } />
                </Route>
              <Route path="url" element={<Select />} />
 
              <Route path=":str/:id/:title/:f/edit" element={<Update />} />
            </Route>
               </Routes>

        </Router>
 
    </div>
  );
}








export default App;