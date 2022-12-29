
import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, Link
} from "react-router-dom";
import Settings from "./components/Settings";
import Select from './components/Select';
import AppProvider from "./ctx/AppProvider";
import AA from "./components/AA";
import Update from "./components/Update";
 
import Searching from "./components/Searching";
import Table from "./components/Table";

import "./App.scss"


function App() { 
const[el, setEl]=useState(0)
const[old, setOld]=useState(-1)

  return (
    <div>    
      <AppProvider>


        <Router>
    <div>
        <div className="s-2">
            <Link className={el==1 ? "s-1-1" : old==1 ? "s-2-1" : "s-1" } to="/a/new/pagination/" onClick={() => { setOld(el); setEl(1)}}>app</Link>
            <Link className={el==2 ? "s-1-2" : old==2 ? "s-2-2" :"s-1" } to="/a/new/pagination/searchtext" onClick={() => {setOld(el);  setEl(2);}}>searching</Link>
            <Link className={el==3 ? "s-1-3"  : old==3? "s-2-3":"s-1" } to="/a/new/pagination/calendar" onClick={() => {setOld(el);  setEl(3);}}>calendar</Link>
            <Link className={el==4 ? "s-1-4" : old==4 ? "s-2-4" :"s-1" } to="/a/new/pagination/settings" onClick={() => {setOld(el);  setEl(4);}}>settings</Link>
          </div>
 
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




            <Route exact path="/a/:elem/pagination" element={<AA />} >
              <Route exact path="settings" element={<Settings />} />
              <Route path="searchtext" element={<Table />} >
                  <Route path=":r" element={<Searching /> } />
                </Route>
              <Route path="url" element={<Select />} />
 
              <Route path=":str/:id/:title/:f/edit" element={<Update />} />
            </Route>
               </Routes>

        </Router>
      </AppProvider>
    </div>
  );
}








export default App;