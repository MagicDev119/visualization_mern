import { Box, Button, Input, CardMedia } from '@mui/material'
import { useEffect } from 'react'
// import GoogleButton from 'react-google-button'
import { useNavigate } from "react-router-dom"

const Prepare = () => {
  const navigate = useNavigate()
  setTimeout(() => {
    navigate('/vision/list')
  }, 6000);
  return (
    <>
      <Box component="div" sx={{ mt: 10 }}>
        <Box component="div">
          <Box component="div" className="center-circle" sx={{ position: 'relative' }}>
            <svg width="100%" height="100%">
              <circle cx="50%" cy="50%" r="38%" fill="#C2F947">
                <animate attributeType="XML" attributeName="r" values="38%;45%;38%"
                  dur="1.5s" begin="0.25s" repeatCount="indefinite" />
              </circle>
            </svg>
            <Box component="span" className='textOverElement'>Visualizing</Box>
          </Box>
        </Box>
        <Box component="div" className="footer fillAvailable">
          <Box component="p" className="descriptionLg" sx={{ m: '5vw', textAlign: 'center' }}>
            Visualizing your future vision...
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default Prepare