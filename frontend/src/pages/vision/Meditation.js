import { Box, Button, Input } from '@mui/material'
import { useNavigate } from "react-router-dom"

const Meditation = () => {
  const navigate = useNavigate()
  const handleNextMeditation = () => {
    navigate('/vision/exercise')
  }
  return (
    <>
      <Box component="div" sx={{ mt: 10 }}>
        <Box component="div">
          <Box component="div">
            <Box component="p" className="descriptionLg" sx={{ m: '5vw' }}>
              Close your eyes for a moment and imagine a world in which we've massively succeeded at addressing the climate crisis.
            </Box>
          </Box>
          <Box component="div" sx={{ mt: 5 }}>
            <Box component="p" className="descriptionLg" sx={{ m: '5vw' }}>
              A world in which all of human ingenuity, creativity, passion, and love, was focused on regenerating our shared home.
            </Box>
          </Box>

        </Box>
        <Box component="div" className="footer fillAvailable">
          <Button variant="contained" className="fillAvailable button" onClick={handleNextMeditation}>Next</Button>
        </Box>
      </Box>
    </>
  )
}
export default Meditation