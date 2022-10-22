import React, { useState } from "react"
import SelectDatepicker from '../../components/SelectDatePicker';
import {
  Box,
  Button,
  Input,
  IconButton,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
// import GoogleButton from 'react-google-button'
import UserService from "../../services/UserService"
import { handleLogin } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import constants from '../../libs/constants'
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
const races = constants.races
const Settings = () => {
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
          <h1 className="pageTitle">Settings </h1>
          <IconButton onClick={() => navigate('/user/profile')} className="top-left-button" color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" />
            <ArrowBackIos />
          </IconButton>
        </Box>
        <Box component="div" sx={{ mt: 6 }}>
          {/* {email} */}
          <Box component="div">
            <Input autoComplete='no' disableUnderline={true} className="input-text fillAvailable" value={email || ''} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </Box>
          <Box component="div">
            <Input autoComplete='no' disableUnderline={true} type="password" className="input-text fillAvailable" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Box>
        </Box>
        <Box component="div" sx={{ mt: 9 }}>
          <Box component="div">
            <InputLabel>Date of Birth</InputLabel>
            <SelectDatepicker handleDate={setUserBirth} birthday={userBirth} />
          </Box>
          <Box component="div">
            <Select
              displayEmpty
              value={userGender}
              onChange={(event) => setUserGender(event.target.value)}
              input={<Input disableUnderline={true} className="input-text fillAvailable" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Box component="span" sx={{ color: '#9e9e9e' }}>Gender</Box>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                Gender
              </MenuItem>
              <MenuItem
                key='Male'
                value='Male'
              >
                Male
              </MenuItem>
              <MenuItem
                key='Female'
                value='Female'
              >
                Female
              </MenuItem>
            </Select>
          </Box>
          <Box component="div">
            <Select
              displayEmpty
              value={userRace}
              onChange={(event) => setUserRace(event.target.value)}
              input={<Input disableUnderline={true} className="input-text fillAvailable" />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Box component="span" sx={{ color: '#9e9e9e' }}>Race</Box>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                Race
              </MenuItem>
              {races.map((race) => (
                <MenuItem
                  key={race}
                  value={race}
                >
                  {race}
                </MenuItem>
              ))}
            </Select>
          </Box>

        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" onClick={() => handleSaveButton()}>Save</Button>
        </Box>
      </Box>
    </>
  )
}
export default Settings