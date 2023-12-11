import './App.css';
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
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
          <Navbar user = {user}/>
          <Routes>
            <Route path='/login' 
            element={user? <Navigate to="/"/> : <Login/>}/>
            <Route path='/' element = {<MainPage user = {user}/>}/>
          </Routes>
        </div>
  </BrowserRouter>
  
  
}

export default App;
