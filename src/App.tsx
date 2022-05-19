import React, { useEffect } from 'react';
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
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { initialiseAuthDataTC } from './redux/authorise_reducer';
import { Preloader } from './components/Common/Preloader';
import { AppRootStateType } from './redux/redux-store';
import styled from 'styled-components';
const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

function App() {
  const dispatch = useDispatch();
  const isInitialised = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialised);
  useEffect(() => {
    dispatch(initialiseAuthDataTC());
  }, []);

  if (!isInitialised) {
    return (
      <StyledContainer>
        <Preloader />
      </StyledContainer>
    );
  }
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
          <Route path="/login/*" element={<Login />} />
        </Routes>
      </Wrapper>
    </AppStyle>
  );
}

export default App;
