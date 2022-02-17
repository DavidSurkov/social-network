import React from 'react';
import '../../App.css';
import { NavbarStlye } from './NavbarStlye';

export function Navbar() {
  return (
    <NavbarStlye>
      <div>
        <a href="">Profile</a>
      </div>
      <div>
        <a href="">Messages</a>
      </div>
      <div>
        <a href="">Feed</a>
      </div>
      <div>
        <a href="">Music</a>
      </div>
      <div>
        <a href="">Settings</a>
      </div>
    </NavbarStlye>
  );
}
