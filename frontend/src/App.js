import { Route, Routes, Navigate } from 'react-router';
import "./libs/axiosInit";
import io from 'socket.io-client';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from '@mui/material';

import './App.css';
import { useEffect, useState } from 'react'
import Home from "./pages/Home";

import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import UserInfo from "./pages/user/UserInfo";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";

import Meditation from "./pages/vision/Meditation";
import Exercise from "./pages/vision/Exercise";
import Visioning from "./pages/vision/Visioning";
import Detail from "./pages/vision/Detail";
import VisionList from "./pages/vision/VisionList";

const socket = io();

function App() {

  const createAppTheme = (options) => responsiveFontSizes(createTheme(options));
  const theme = createAppTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FFF',
      },
      secondary: {
        main: '#e65100',
      },
      third: {
        main: '#C2F947'
      },
      spacing: 8
    },
    overrides: {
      MuiFormControlLabel: {
        label: {
          fontSize: '0.875rem',
        }
      }
    }
  })

  useEffect(() => {
    socket.on('message', (data) => {
      console.log(data)
    });

    return () => {
      socket.off('pong');
    };
  }, []);

  const isLoggedIn = () => {
    return localStorage.getItem("token") && localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== 'null'
  }

  const AuthGate = ({ children }) => {
    console.log(localStorage.getItem("token"))
    return (
      <>
        {isLoggedIn() ? children : <Navigate to="/" component={Home} />}

      </>
    )
  }
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/user/login" element={isLoggedIn() ? <Navigate to='/vision/meditation' /> : <Login />} />
          <Route path="/user/signup" element={isLoggedIn() ? <Navigate to='/user/userinfo' /> : <SignUp />} />
          <Route path="*" element={<AuthGate>
            <Routes>
              <Route path="/user/userinfo" element={<UserInfo />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/settings" element={<Settings />} />

              <Route path="/vision/meditation" element={<Meditation />} />
              <Route path="/vision/exercise" element={<Exercise />} />
              <Route path="/vision/visioning" element={<Visioning />} />
              <Route path="/vision/detail" element={<Detail />} />
              <Route path="/vision/list" element={<VisionList type="list" />} />
              <Route path="/vision/progress" element={<VisionList type="progress" />} />
              <Route path="/vision/search" element={<VisionList type="search" />} />
              <Route path="/vision/remix" element={<VisionList type="remix" />} />
            </Routes>
          </AuthGate>} />
        </Routes >
      </Container>
    </ThemeProvider>
  );
}

export default App;
