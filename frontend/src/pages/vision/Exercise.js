import React, { useState } from "react"
import {
  Box,
  Button,
  TextareaAutosize,
} from '@mui/material'
import { visionData } from '../../redux/visionSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"

const Exercise = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [visionDescription, setVisionDescription] = useState('');
  const handleStartVisionButton = () => {
    dispatch(visionData({
      visionData: {
        description: visionDescription,
        processing: 'start'
      }
    }))
    navigate('/vision/prepare')
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