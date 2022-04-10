import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Profile } from './components/Profile/Profile';
import { AppStyle, Wrapper } from './components/styles/AppStyle';
import { Route, Routes } from 'react-router-dom';
import { Feed } from './components/Feed/Feed';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { SidebarContainer } from './components/Navbar/SidebarContainer';
import { UsersContainer } from './components/Users/UsersContainer';

function App() {
  //const sidebar = useSelector<AppRootStateType, ISidebar>((store) => store.sidebar);

  return (
    <AppStyle>
      <Header />
      <SidebarContainer />
      <Wrapper>
        <Routes>
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/profile/*" element={<Profile />} />
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
