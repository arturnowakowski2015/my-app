
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
    <div>

 
        </div>
           <div>j <a href="#" class="accordion-toggle">Hover for height animate</a>
  <div class="accordion-content">
    <div class="accordion-inner"> 
      <p>For animate the "height" of element with CSS Transitions you need use "max-height".</p>
      <p>If use the "height: auto", the effect not works. Is necessary some value for the CSS create a CSS animate, and you can use "max-height" with a great value for emulate this effect.</p> 
    </div>
  </div>
</div>

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