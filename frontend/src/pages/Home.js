import React from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, CardMedia } from '@mui/material'

import logo from '../assets/images/logo.png'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box component="div" sx={{ display: 'block', mt: '25vw' }}>
        <Box component="div" sx={{ position: 'relative' }}>
          <CardMedia
            className="home-logo"
            component="img"
            image={logo}
            alt="Visual"
          />
          <Box component="div" sx={{
            position: "absolute",
            color: "black",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            fontWeight: '900',
            fontSize: '5vw',
            letterSpacing: 3
          }}>[visual]</Box>
        </Box>
        <Box component="div" sx={{ fontSize: '1rem', textAlign: 'center' }}>
          <h1>
            UNFK
          </h1>
        </Box>
        <Box component="div">
          <Box component="p" className="description" sx={{ m: '11vw', textAlign: 'center' }}>
            How do you envision a future in which we are to succeed in overcoming the climate crisis?
          </Box>
        </Box>
        <Box component="div" className="fillAvailable" sx={{ position: 'fixed', bottom: 0, mr: 2, mb: 3 }}>
          <Box component="div">
            <Button onClick={() => navigate('/user/login')} variant="contained" className="fillAvailable button">Login</Button>
          </Box>
          <Box component="div">
            <Button onClick={() => navigate('/user/signup')} variant="contained" className="fillAvailable button">Sign Up</Button>
          </Box>
          <Box component="div" sx={{ mt: 2, textAlign: 'center' }}>Forgot Password?</Box>
        </Box>
      </Box>
    </>
  )
}
export default Home