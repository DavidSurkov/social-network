import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { AppStyle, Wrapper } from './components/styles/AppStyle';
import { Dialogs } from './components/Dialogs/Dialogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Feed } from './components/Feed/Feed';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <AppStyle>
        <Header />
        <Navbar />
        <Wrapper>
          <Routes>
            <Route path="/src/components/Dialogs" element={<Dialogs />} />
            <Route path="/src/components/Profile" element={<Profile />} />
            <Route path="/src/components/Feed" element={<Feed />} />
            <Route path="/src/components/Music" element={<Music />} />
            <Route path="/src/components/Settings" element={<Settings />} />
          </Routes>
        </Wrapper>
      </AppStyle>
    </BrowserRouter>
  );
}

export default App;
