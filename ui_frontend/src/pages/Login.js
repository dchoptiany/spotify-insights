import Spotify from "../images/spotify.png"
import { Flex } from "@tremor/react";


//Initiating the Spotify authentication process
const authenticate = ()=>{
    window.open("http://aws_hostname:8000/auth/spotify", "_self")
  }

  
//Login page
const Login = () =>{
    return (
        <Flex justifyContent="center" alignItems="center">
        <div className="wrapper">
                <div className="center" onClick={authenticate}>
                <div className="loginButton" onClick={authenticate}>
                    <img src={Spotify} alt="" className="icon"></img>
                </div>
                <div className="loginDesc" >
                <div>Log in with your Spotify account</div>

                </div>
                </div>
        </div>
        </Flex>
    )
}

export default Login
