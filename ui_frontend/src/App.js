import './App.css';
import Sidebar from "./components/SideBart"
import Login from "./pages/Login"
import UrlAnalysis from "./pages/urlAnalysis"
import Overview from './pages/Overview';
import GlobalTrends from './pages/GlobalTrends';
import { sendGetUserRequest } from './actions/authActions';
import UserInfo from './pages/UserInfo';
import TopArtists from './pages/TopArtists';
import TopTracks from './pages/TopTracks';
import Recommendations from './pages/Recommendations';

import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import LikedTracks from './pages/LikedTracks';



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
            <Route path='/user_info' element={<UserInfo/>}/>
            <Route path='/topArtists' element={user? <TopArtists/> : <Overview/>}/>
            <Route path='/topTracks' element={user? <TopTracks/>:<Overview/>}/>
            <Route path='/recommendations' element={user? <Recommendations/>:<Overview/>}/>
            <Route path='/likedTracks' element={user? <LikedTracks/>:<Overview/>}/>
            
          </Routes>
          </div>   
        </div>
  </BrowserRouter>
  
  
}

export default App;