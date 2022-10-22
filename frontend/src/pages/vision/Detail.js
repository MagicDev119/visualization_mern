import React, { useState } from "react"
import SelectDatepicker from '../../components/SelectDatePicker';
import {
  Box,
  Button,
  Input,
  IconButton,
  MenuItem,
  Select,
  CardMedia
} from '@mui/material'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
// import GoogleButton from 'react-google-button'
import UserService from "../../services/UserService"
import { handleLogin } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const Detail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState('')
  const [userGender, setUserGender] = useState(userInfo.gender)
  const [userRace, setUserRace] = useState(userInfo.race);
  const [userBirth, setUserBirth] = useState(userInfo.birthday);
  const handleSaveButton = () => {
    UserService.update({
      birthday: userBirth,
      gender: userGender,
      race: userRace,
      email: email,
      password: password
    }).then(res => {
      if (res.code === 200) {
        const curUser = JSON.parse(localStorage.getItem('user'))
        dispatch(handleLogin({
          ...curUser,
          birthday: res.newUserData.birthday,
          gender: res.newUserData.gender,
          race: res.newUserData.race,
          email: res.newUserData.email
        }))
        navigate('/user/profile')
      }
    })
  }

  return (
    <>
      <Box component="div" sx={{ mt: 4 }}>
        <Box component="div" sx={{ mx: '13px', position: 'relative' }}>
          <h1 className="pageTitle">&nbsp;</h1>
          <IconButton onClick={() => navigate('/user/profile')} className="top-left-button" color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Box component="div" sx={{ mx: -2 }}>
          <CardMedia
            component="video"
            autoPlay
            // controls
            src="./myfile.mp4"
          />
        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" onClick={() => handleSaveButton()}>Save</Button>
        </Box>
      </Box>
    </>
  )
}
export default Detail