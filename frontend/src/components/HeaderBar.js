import { useEffect, useState } from 'react'
import {
  Box,
  AppBar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Toolbar,
  Typography,
  LinearProgress
} from '@mui/material'
import { useSelector } from 'react-redux';
import { visionInfo } from '../redux/visionSlice';
import { useNavigate } from "react-router-dom"

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  )
}

export default function HeaderBar() {
  const navigate = useNavigate()
  const savedVisionInfo = useSelector(visionInfo);
  const [progress, setProgress] = useState(1)
  const [visioningFinished, setVisionFinished] = useState(false)
  const timeLimit = 60 * 10

  const getProgressTime = () => {
    const curTime = timeLimit - progress
    const min = (curTime - curTime % 60) / 60
    const sec = curTime % 60
    return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
  }

  useEffect(() => {
    if (savedVisionInfo.processing === 'generated') {
      setProgress(timeLimit)
      setVisionFinished(true)
    }
  }, [savedVisionInfo.processing])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= timeLimit ? timeLimit : prevProgress + 1))
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleViewNewVision = () => {
    navigate('/vision/detail')
  }
  return (
    <AppBar>
      <Toolbar sx={{ flexDirection: "column" }}>
        {!visioningFinished && <Box component="div" sx={{ width: '100%', pt: 3 }}>
          <LinearProgressWithLabel value={progress * 100 / timeLimit} />
        </Box>}
        <Box component="div" sx={{ width: '100%', py: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            {!visioningFinished && <Typography variant="body2" className="description" color="text.secondary">Visualizing...</Typography>}
            {visioningFinished && <Typography variant="body2" className="description" color="text.secondary">Done</Typography>}
          </Box>
          <Box component="div">
            {!visioningFinished && <Typography variant="body2" color="text.secondary">{getProgressTime()}</Typography>}
            {visioningFinished && <Button variant="contained" className="header-button" onClick={handleViewNewVision}>View</Button>}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>

  )
}
