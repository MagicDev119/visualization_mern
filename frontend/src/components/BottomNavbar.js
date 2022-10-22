import { useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Icon
} from '@mui/material'
import ProfileIcon from '../assets/images/profile.svg'
import PlusIcon from '../assets/images/plus.svg'
import SearchIcon from '../assets/images/search.svg'
import HomeIcon from '../assets/images/home.svg'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { visionInfo, isRemix } from '../redux/visionSlice';

export default function LabelBottomNavigation({ handleNavbar }) {

  const navigate = useNavigate()
  const [value, setValue] = useState('home')

  const savedVisionInfo = useSelector(visionInfo);
  const savedIsRemix = useSelector(isRemix);

  const handleChange = (event, newValue) => {
    setValue(newValue)
    switch (newValue) {
      case 'home':
        navigate('/vision/list')
        break
      case 'profile':
        navigate('/user/profile')
        break
      case 'plus':
        navigate('/vision/exercise')
        break
      case 'search':
        navigate('/vision/search')
        break
    }
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={4}>
      <BottomNavigation
        showLabels={false}
        value={value}
        onChange={(event, newValue) => {
          handleChange(event, newValue)
        }}
        sx={{
          ".Mui-selected > span.material-icons": {
            background: 'rgba(235, 240, 240, 0.1)',
            padding: '10px',
            width: '44px',
            height: '44px',
            borderRadius: '50%'
          },
          ".Mui-disabled": {
            background: '#444'
          }
        }}
      >
        <BottomNavigationAction disabled={savedVisionInfo.processing == 'working' || savedIsRemix} classes={{
          selected: {
            color: 'red'
          }
        }} value="home" icon={<Icon><img src={HomeIcon} /></Icon>} />
        <BottomNavigationAction disabled={savedVisionInfo.processing == 'working' || savedIsRemix} value="search" icon={<Icon><img src={SearchIcon} /></Icon>} />
        <BottomNavigationAction disabled={savedVisionInfo.processing == 'working' || savedIsRemix} value="plus" icon={<Icon><img src={PlusIcon} /></Icon>} />
        <BottomNavigationAction disabled={savedVisionInfo.processing == 'working' || savedIsRemix} value="profile" icon={<Icon><img src={ProfileIcon} /></Icon>} />
      </BottomNavigation>
    </Paper>
  )
}