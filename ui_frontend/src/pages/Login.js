import Spotify from "../images/spotify.png"
import hostname from "../config/config.js"


const spotify = ()=>{
    window.open(hostname + ":8000/auth/spotify", "_self") // "http://localhost:8000/auth/spotify"
  }

  

const Login = () =>{
    return (
        <div>
            <div className="wrapper">
                <div className="center">
                <div className="loginButton" onClick={spotify}>
                    <img src={Spotify} alt="" className="icon"></img>
                </div>
                <div className="loginDesc">
                <h1 >Log in with your Spotify account</h1>

                </div>
                </div>
            </div>
        </div>
    )
}

export default Login
