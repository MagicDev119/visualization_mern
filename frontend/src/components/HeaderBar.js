import { useEffect, useState } from 'react'
import {
  Box,
  AppBar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
  LinearProgress
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { visionInfo, isRemix, changeRemixStatus, visionData } from '../redux/visionSlice';
import { useNavigate } from "react-router-dom"
import Close from '@mui/icons-material/Close';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  )
}

export default function HeaderBar({ handleStartRemix, initItemSelected }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const savedVisionInfo = useSelector(visionInfo);
  const savedIsRemix = useSelector(isRemix);
  const [progress, setProgress] = useState(1)
  const [visioningFinished, setVisionFinished] = useState(false)
  const timeLimit = 60 * 10
  const curUrl = window.location.href.split('/')

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
    dispatch(visionData({
      visionData: {}
    }))
    navigate('/vision/detail', {
      id: savedVisionInfo.id
    })
  }

  const handleCancelRemix = () => {
    dispatch(changeRemixStatus({
      isRemix: false
    }))
    initItemSelected()
  }
  return (
    <AppBar>
      <Toolbar sx={{ flexDirection: "column" }}>
        {(savedVisionInfo.processing === 'working' || savedVisionInfo.processing === 'generated') &&
          <>
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
          </>
        }
        {savedIsRemix &&
          <>
            <Box component="div" sx={{ width: '100%', py: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Box component="div" sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                <Typography variant="body2" className="description" color="text.secondary">Choose up to two other visions to remix. </Typography>
              </Box>
              <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" className="header-button" onClick={handleStartRemix}>Done</Button>
                <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleCancelRemix}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </>
        }
      </Toolbar>
    </AppBar>

  )
}
