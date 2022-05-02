import React from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Friends } from './Friends';

//Styles
export const SidebarStyle = styled.div`
  padding: 10px;
  grid-area: n;
  background-color: #191f26;
  border: 1px dashed #014d55;

  a {
    text-align: center;
    color: #014d55;
    text-decoration: none;
    display: block;
    margin: 10px 0;
    font-size: 18px;
    &.active {
      color: #ffffff;
      border: 1px solid #014d55;
      border-radius: 10px;
    }
  }
`;

interface INavbar {
  sidebar: { friends: { id: number; name: string; image: string }[] };
}

export function Sidebar(props: INavbar) {
  const friendsData = props.sidebar.friends.map((f) => <Friends key={f.id} id={f.id} name={f.name} image={f.image} />);

  return (
    <SidebarStyle>
      <div>
        <NavLink to={'/profile/23373'}>Profile</NavLink>
      </div>
      <div>
        <NavLink to={'/dialogs'}>Dialogs</NavLink>
      </div>
      <div>
        <NavLink to={'/feed'}>Feed</NavLink>
      </div>
      <div>
        <NavLink to={'/music'}>Music</NavLink>
      </div>
      <div>
        <NavLink to={'/users'}>Users</NavLink>
      </div>
      <div>
        <NavLink to={'/settings'}>Settings</NavLink>
      </div>
      <div>
        <h2>Friends</h2>
        {friendsData}
      </div>
    </SidebarStyle>
  );
}
