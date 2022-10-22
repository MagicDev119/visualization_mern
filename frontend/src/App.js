import { Route, Routes, Navigate } from 'react-router'
import "./libs/axiosInit"
import io from 'socket.io-client'
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from '@mui/material'

import './App.css'
import { useEffect, useState } from 'react'
import Home from "./pages/Home"

import Login from "./pages/user/Login"
import SignUp from "./pages/user/SignUp"
import UserInfo from "./pages/user/UserInfo"
import Profile from "./pages/user/Profile"
import Settings from "./pages/user/Settings"

import Meditation from "./pages/vision/Meditation"
import Exercise from "./pages/vision/Exercise"
import Visioning from "./pages/vision/Visioning"
import Detail from "./pages/vision/Detail"
import Prepare from "./pages/vision/Prepare"
import VisionList from "./pages/vision/VisionList"

import { useSelector, useDispatch } from 'react-redux';
import { changeStatus, visionInfo } from './redux/visionSlice';

const socket = io('http://localhost:5000')
function App() {

  const dispatch = useDispatch()
  const createAppTheme = (options) => responsiveFontSizes(createTheme(options))
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

  const savedVisionInfo = useSelector(visionInfo);

  useEffect(() => {
    socket.on('generated', (data) => {
      console.log(data)
      dispatch(changeStatus({
        visionStatus: 'generated'
      }))
    })

    socket.on('error', (err) => {
      console.log(err)
    })

    return () => {
      socket.off('generated')
    }
  }, [])

  useEffect(() => {
    if (socket && savedVisionInfo.processing === 'start') {
      dispatch(changeStatus({
        visionStatus: 'working'
      }))

      socket.emit('message', {
        ...savedVisionInfo,
        token: localStorage.getItem("token")
      })
    }
  }, [savedVisionInfo])

  const isLoggedIn = () => {
    return localStorage.getItem("token") && localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== 'null'
  }

  const AuthGate = ({ children }) => {
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
              <Route path="/vision/prepare" element={<Prepare />} />
              <Route path="/vision/detail" element={<Detail />} />
              <Route path="/vision/list" element={<VisionList type="list" />} />
              <Route path="/vision/search" element={<VisionList type="search" />} />
              <Route path="/vision/remix" element={<VisionList type="remix" />} />
            </Routes>
          </AuthGate>} />
        </Routes >
      </Container>
    </ThemeProvider>
  )
}

export default App
