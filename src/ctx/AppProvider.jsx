 
import UserContext from "./User"; 
function AppProvider(props) {

 
 
 
 

  return (
    <UserContext.Provider  >{props.children}</UserContext.Provider>
  );
}

export default AppProvider;
