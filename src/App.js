import "./App.css";
import Navs from "./Navs";
import { UserContextProvider } from "./context/userContext";
import { DarkmodeContextProvider } from "./context/DarkmodeContext";
import 'react-notifications-component/dist/theme.css'
import { ReactNotifications } from 'react-notifications-component'
function App() {
  return (
    <div className="App">
      <DarkmodeContextProvider>
      <UserContextProvider>
      <ReactNotifications />
        <Navs />
      </UserContextProvider>
      </DarkmodeContextProvider>
    </div>
  );
}

export default App;
