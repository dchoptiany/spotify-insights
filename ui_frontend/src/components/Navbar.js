import { Link } from "react-router-dom";
import {logout, makeRequest} from "../actions/authActions"



const Navbar = ({user}) =>{

    const handleClick = async () => {
        try {
          const response = await makeRequest('https://api.spotify.com/v1/me', 'GET','');
          const data = await response.json();
          console.log('Odpowiedź serwera:', data);
        } catch (error) {
          console.error('Błąd podczas zapytania:', error);
        }
      };

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
                    <li className="listItem" onClick={handleClick} >{user.displayName}</li>
                    <li className="listItem" onClick={logout}>Logout</li>
                </ul>
            )
            : (<Link className = "link" to="/login">Login</Link>)}
        </div>
    )
}

export default Navbar