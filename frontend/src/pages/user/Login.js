import React, { useState } from "react"
import { Box, Button, Input } from '@mui/material'
import UserService from "../../services/UserService"
import { handleLogin } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLoginButton = () => {
    UserService.login({
      email,
      password
    }).then(res => {
      if (res.code === 200) {

        dispatch(handleLogin({ ...res.user.user, token: res.token }))
        navigate('/vision/meditation')
      }
    })
  }
  return (
    <>
      <Box component="div" sx={{ mt: 10 }}>
        <Box component="div">
          <Box component="div">
            <Input disableUnderline={true} className="input-text fillAvailable" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box component="div">
            <Input disableUnderline={true} type="password" className="input-text fillAvailable" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Box>

        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" disabled={!email} onClick={() => handleLoginButton()}>Login</Button>
        </Box>
      </Box>
    </>
  )
}
export default Login