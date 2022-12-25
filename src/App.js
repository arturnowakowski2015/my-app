
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Settings from "./components/Settings";
import Select from './components/Select';
import AppProvider from "./ctx/AppProvider";
import AA from "./components/AA";
import Update from "./components/Update";
import ButtonModal from "./components/ButtonModal";

import "./App.css"

function App() {


  return (
    <div><div className="slide-fwd-center">mm</div>
      <AppProvider>


        <Router>
          <Link className="a1" to="/a/new/pagination/">start</Link>

          <Routes>




            <Route exact path="/a/:elem/pagination" element={<AA />} >
              <Route exact path="settings" element={<Settings />} />
              <Route path="url" element={<Select />} />
              <Route path="putin" element={<ButtonModal />} />
              <Route path=":str/:id/:title/:f/edit" element={<Update />} />
            </Route>






          </Routes>

        </Router>
      </AppProvider>
    </div>
  );
}








export default App;