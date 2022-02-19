import React from 'react';
import '../../App.css';
import { NavbarStlye } from './NavbarStlye';

export function Navbar() {
  return (
    <NavbarStlye>
      <div>
        <a href="/src/components/Profile">Profile</a>
      </div>
      <div>
        <a href="/src/components/Dialogs">Messages</a>
      </div>
      <div>
        <a href="/src/components/Feed">Feed</a>
      </div>
      <div>
        <a href="/src/components/Music">Music</a>
      </div>
      <div>
        <a href="/src/components/Settings">Settings</a>
      </div>
    </NavbarStlye>
  );
}
