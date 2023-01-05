
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link
} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import Selected from './components/Selected/Selected';
import Select from './components/Different/Select';
import AppProvider from "./ctx/AppProvider";
import Home from "./components/Home/Home";
import Update from "./components/Different/Update";
 
import Searching from "./components/Different/Searching";
import Table from "./components/Table/Table"; 

import "./App.scss"


function App() { 
const[el, setEl]=useState(0)
const[old, setOld]=useState(-1)

  return (
           <Router>
 

          <Routes>



            <Route exact path="/a/:elem/pagination" element={<Home />} >
              <Route path=":id" element={<Table /> } />
              <Route exact path="settings" element={<Settings />} />
              <Route path="selected" element={<Selected />} />
              <Route path="searchtext" element={<Table />} >
                  <Route path=":r" element={<Searching /> } />
                </Route>
              <Route path="url" element={<Select />} />
 
              <Route path=":str/:id/:title/:f/edit" element={<Update />} />
            </Route>
               </Routes>

        </Router> 
  );
}








export default App;