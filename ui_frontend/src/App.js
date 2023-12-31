import './App.css';
import Sidebar from "./components/SideBart"
import Login from "./pages/Login"
import UrlAnalysis from "./pages/urlAnalysis"
import Overview from './pages/Overview';
import GlobalTrends from './pages/GlobalTrends';
import { sendGetUserRequest } from './actions/authActions';

import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      sendGetUserRequest()
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);



  return <BrowserRouter>
        <div>
          <div>
          <Sidebar user={user}/>    
          </div>
          <div>   
            <Routes>
            <Route path='/login' 
            element={user? <Navigate to="/"/> : <Login/>}/>
            <Route path='/' element={<Overview/>}/>
            <Route path='/urlAnalysis' element={<UrlAnalysis/>}/>
            <Route path='/globalTrends' element={<GlobalTrends/>}/>
          </Routes>
          </div>   
        </div>
  </BrowserRouter>
  
  
}

export default App;