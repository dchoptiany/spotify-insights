import React, { useState } from 'react';
import { Link } from "react-router-dom";



function logInAlert() {
      alert("You need to log in");
  
}

const sidebarItems = [
  [
    { id: '0', title: 'Overview', url: "/" ,user_needed : false},
    { id: '1', title: 'Global trends', url: "/globalTrends",user_needed : false },
    { id: '2', title: 'Analyse URL', url: "/urlAnalysis" ,user_needed : true},
    { id: '3', title: 'Top Artists', url: "/topArtists",user_needed : true },
    { id: '4', title: 'Top Tracks', url: "/topTracks",user_needed : true },
    { id: '5', title: 'Recommendations', url: "/recommendations",user_needed : true },
    { id: '6', title: 'Liked tracks', url: "/likedTracks", user_needed : true },
  ],

];


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
    </div>
  );
}

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
      <Link  to={url}>
      <div>
        <div className="sidebar-item">{title}</div>
      </div>
    </Link>
    }
    else{
      <div className="sidebar-item" onClick={logInAlert}>{title}</div>
    }
  }
    
  }

export default Sidebar



