import React from 'react';
import './App.css';
import { AppStyle, Wrapper } from './components/styles/AppStyle';
import { Route, Routes } from 'react-router-dom';
import { Feed } from './components/Feed/Feed';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { SidebarContainer } from './components/Navbar/SidebarContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';

function App() {
  return (
    <AppStyle>
      <HeaderContainer />
      <SidebarContainer />
      <Wrapper>
        <Routes>
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/profile/:userId" element={<ProfileContainer />} />
          <Route path="/feed/*" element={<Feed />} />
          <Route path="/music/*" element={<Music />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/users/*" element={<UsersContainer />} />
        </Routes>
      </Wrapper>
    </AppStyle>
  );
}

export default App;
