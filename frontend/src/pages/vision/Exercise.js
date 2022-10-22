import React, { useState } from "react"
import SelectDatepicker from '../../components/SelectDatePicker';
import {
  Box,
  Button,
  Input,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  MenuItem,
  Select,
  TextareaAutosize,
  InputLabel
} from '@mui/material'
// import GoogleButton from 'react-google-button'
import UserService from "../../services/UserService"
import { visionData } from '../../redux/visionSlice'
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

const races = ['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Hispanic or Latino', 'Native Hawaiian or Other Pacific Islander', 'White'];

const Exercise = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userGender, setUserGender] = useState([])
  const [userRace, setUserRace] = useState([]);
  const [visionDescription, setVisionDescription] = useState('');
  const handleStartVisionButton = () => {
    dispatch(visionData({
      visionData: {
        description: visionDescription,
        processing: 'start'
      }
    }))
    navigate('/vision/prepare')
    // UserService.update({
    //   birthday: userBirth,
    //   gender: userGender,
    //   race: userRace
    // }).then(res => {
    //   if (res.code === 200) {
    //     const curUser = JSON.parse(localStorage.getItem('user'))
    //     dispatch(handleLogin({
    //       ...curUser,
    //       birthday: res.newUserData.birthday,
    //       gender: res.newUserData.gender,
    //       race: res.newUserData.race
    //     }))
    //     navigate('/vision/meditation')
    //   }
    // })
  }

  return (
    <>
      <Box component="div" sx={{ mt: 4 }}>
        <Box component="div" sx={{ mx: '3vw' }}>
          <h1 className="pageTitle">What do you believe to be true in a world where the climate crisis is over?</h1>
        </Box>
        <Box component="div" sx={{ mx: '5vw', my: 4 }}>
          <Box component="p" className="description" sx={{ mb: 0 }}>
            FUTURE VISION
          </Box>
          <Box component="div" sx={{ mx: -2 }}>
            <TextareaAutosize
              maxRows={9}
              minRows={9}
              aria-label="maximum height"
              placeholder="Describe what you envision."
              className="input-text fillAvailable"
              value={visionDescription}
              onChange={e => setVisionDescription(e.target.value)}
            />
          </Box>
        </Box>
        <Box component="div" className="description" sx={{ mx: '5vw', mb: '5vw' }}>
          <Box component="p" sx={{ mb: 0 }}>
            TIPS
          </Box>
          <Box component="ol" className="description tip-style" sx={{ mt: 0 }}>
            <li><span>Set aside doubts of how it might happen or obstacles that might get in the way.</span></li>
            <li>Think of a specific scene. Where you living, eating, socializing, working?</li>
            <li>This will show up in our public gallery.</li>
          </Box>
        </Box>
      </Box>
      <Box component="div" className="footer fillAvailable">
        <Button variant="contained" className="fillAvailable button" onClick={() => handleStartVisionButton()}>Start Visioning</Button>
      </Box>
    </>
  )
}
export default Exercise