import React, { lazy, useEffect } from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Feed } from './components/Feed/Feed';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
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
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));

//Styles
const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
export const AppStyle = styled.div`
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    'h h'
    'n c';
  grid-template-rows: 60px 1fr;
  grid-auto-columns: 2fr 10fr;
  font-family: 'Helvetica Neue';
  button {
    height: fit-content;
    width: content-box;
    color: wheat;
    background: #014d55;
  }
`;

export const Wrapper = styled.div`
  grid-area: c;
  background-color: #191f26;
  padding: 10px;
  border: 1px dashed #014d55;
  display: flex;
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
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/feed/*" element={<Feed />} />
            <Route path="/music/*" element={<Music />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/users/*" element={<UsersContainer />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </React.Suspense>
      </Wrapper>
    </AppStyle>
  );
}

export default App;
