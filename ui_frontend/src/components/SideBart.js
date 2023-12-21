import React, { useState } from 'react';
import { Link } from "react-router-dom";



const sidebarItems = [
  [
    { id: '0', title: 'Overview', url: "/" },
    { id: '1', title: 'Global trends', url: "/globalTrends" },
    { id: '2', title: 'Analyse URL', url: "/urlAnalysis" },
    { id: '3', title: 'Analyze your music taste', url: "/userTrends" },
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
      <div>{user.name}</div>
      <div>{user.surname}</div>
    </div>
  );
}

function MenuItem({ item: { id, title, url }, onClick, selected }) {
    return (
      <Link  to={url}>
        <div>
          <div className="sidebar-item">{title}</div>
        </div>
      </Link>
    );
  }

export default Sidebar



