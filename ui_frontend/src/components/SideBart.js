import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {logout} from "../actions/authActions"



//Sending alert to user
function logInAlert() {
      alert("You need to log in");
  
}


//All items on sidebar
const sidebarItems = [
  [
    { id: '0', title: 'Overview', url: "/" ,user_needed : false},
    { id: '1', title: 'Global trends', url: "/globalTrends",user_needed : false },
    { id: '2', title: 'Calculate trends', url: "/globalTrendsCombo",user_needed : false },
    { id: '3', title: 'Analyse URL', url: "/urlAnalysis" ,user_needed : true},
    { id: '4', title: 'Top Artists', url: "/topArtists",user_needed : true },
    { id: '5', title: 'Top Tracks', url: "/topTracks",user_needed : true },
    { id: '6', title: 'Recommendations', url: "/recommendations",user_needed : true },
    { id: '7', title: 'Analyse liked tracks', url: "/likedTracks", user_needed : true },
  ],

];

//Generating Side Bar
function Sidebar({user}) {
  const [selected, setSelected] = useState('0');
  
  return (
    <div className="sidebar">
      
          <div className="sidebar-Title">
            Spotify insights
          </div>

      
        {sidebarItems[0].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={setSelected}
            selected={selected}
            user = {user}
          />
        ))}
        <UserData user={user}/>

    </div>
  );
}

//Displaying user's data
function UserData({ user }) {  
  if (!user) {
    return (
      <div className="userDataLogin">
        <Link className = "link" to="/login">Login</Link>    
        </div>
    );
  }
  return (
    <div className="userData">
        <Link className = "link" to="/user_info">{user.displayName}</Link>  
        <div style={{paddingTop:"1%"}}></div> 
        <div className="sidebar-item" onClick={logout}>Logout</div>
    </div>
  );
}

//Setting up the sidebar items according to preferences
function MenuItem({ item: { id, title, url, user_needed }, onClick, selected, user }) {
  if(!user_needed){
    return (
      <Link  to={url}>
        <div>
          <div className="sidebar-item">{title}</div>
        </div>
      </Link>
    );
  }
  else{
    if(user){
      return (
      <Link  to={url}>
      <div>
        <div className="sidebar-item">{title}</div>
      </div>
    </Link>
      );
    }
    return (
      <div className="sidebar-item" onClick={logInAlert}>{title}</div>
    );
  }
    
  }

export default Sidebar



