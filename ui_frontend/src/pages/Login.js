import Spotify from "../images/spotify.png"


const spotify = ()=>{
    window.open("http://aws_hostname:8000/auth/spotify", "_self")
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
