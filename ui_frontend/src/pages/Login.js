import Spotify from "../images/spotify.png"
import { Flex } from "@tremor/react";


const spotify = ()=>{
    window.open("http://aws_hostname:8000/auth/spotify", "_self")
  }

  

const Login = () =>{
    return (
        <Flex justifyContent="center" alignItems="center">
        <div className="wrapper">

                <div className="center" onClick={spotify}>
                <div className="loginButton" onClick={spotify}>
                    <img src={Spotify} alt="" className="icon"></img>
                </div>
                <div className="loginDesc" onClick={spotify}>
                <div>Log in with your Spotify account</div>

                </div>
                </div>
        </div>
        </Flex>
    )
}

export default Login
