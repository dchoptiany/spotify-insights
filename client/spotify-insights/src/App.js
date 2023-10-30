import './App.css';
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";



function App() {

  const user = false;
  return <BrowserRouter>
        <div>
          <Navbar/>
          <Routes>
            <Route path='/login' element={user? <Navigate to="/"/> : <Login/>}/>
          </Routes>
        </div>
  </BrowserRouter>
  
  
}

export default App;
