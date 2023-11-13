import { Link } from "react-router-dom";
import {logout} from "../actions/authActions"


const Navbar = ({user}) =>{

    return (
        
        <div className = "navbar">
            <span className="logo">
                <Link className="link" to="/">
                    Spotify-insights
                </Link>
      </span>{
            user ? (
                <ul className="list">
                    <li className = "listItem">
                        <img scr={user.photos[0]} alt="" className="avatar"></img>
                    </li>
                    <li className="listItem">{user.displayName}</li>
                    <li className="listItem" onClick={logout}>Logout</li>
                </ul>
            )
            : (<Link className = "link" to="/login">Login</Link>)}
        </div>
    )
}

export default Navbar