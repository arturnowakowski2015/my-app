  
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import S from "./components/S";
import UserContext from './User';
import AppProvider from "./AppProvider";
import AA from "./components/AA";
import Update from "./components/Update";
import ButtonModal from "./components/ButtonModal"
 

function App() {
 

  return (
    <div>
        <AppProvider>
     

    <Router> 
         <Link class="a1" to="/a/pagination/">start</Link> 
 
         <Routes>
             



                         <Route exact path="/a/pagination" element={<AA />} >
                               <Route exact path="settings"   element={                 <AA/>}  />
                               <Route path="url"    element={  <AA/>}  />
                               <Route path="putin"    />
                               <Route path=":id"   >
                                 <Route path="update"  /> 
                                 <Route path=":text/:f/edit"   />
                               </Route>
                           </Route>
                           <Route  path="/a/pagination/:str/:id/:title/:f/edit"   element={<AA />}  />


                 
             
             
             </Routes>

     </Router>
     </AppProvider>
</div>
  );
}



 




export default App;