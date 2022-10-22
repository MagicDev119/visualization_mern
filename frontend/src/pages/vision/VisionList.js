import { useState, useEffect } from 'react'
import {
  Box,
  AppBar,
  CssBaseline,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Toolbar,
  Select,
  Input,
  MenuItem,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Container
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { visionData, changeRemixStatus, visionInfo, isRemix } from '../../redux/visionSlice'
import VisionService from "../../services/VisionService"
import constants from '../../libs/constants'

import BottomNavbar from '../../components/BottomNavbar'
import HeaderBar from '../../components/HeaderBar'
import CustomSelect from '../../components/CustomSelect';

import defaultThumbnail from '../../assets/images/default-thumbnail.png'

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

export default function VisionList(props) {

  const dispatch = useDispatch()
  const savedVisionInfo = useSelector(visionInfo)
  const savedIsRemix = useSelector(isRemix)
  const [filterGender, setFilterGender] = useState('')
  const [filterRace, setFilterRace] = useState('');
  const [filterAge, setFilterAge] = useState('');
  const [itemData, setItemData] = useState([])

  const getVisionData = (filter) => {
    VisionService.getAll(filter)
      .then(res => {
        console.log(res)
        setItemData(res.data.map(each => {
          return {
            img: each.thumbnail_url || defaultThumbnail,
            description: each.description.join(',')
          }
        }))
      })
  }
  useEffect(() => {
    getVisionData({})
  }, [])

  const handleFilter = (value, action) => {
    switch (action) {
      case 'Age':
        setFilterAge(value)
        getVisionData({
          age: value,
          gender: filterGender,
          race: filterRace
        })
        break
      case 'Gender':
        setFilterGender(value)
        getVisionData({
          age: filterAge,
          gender: value,
          race: filterRace
        })
        break
      case 'Race':
        setFilterRace(value)
        console.log(value)
        getVisionData({
          age: filterAge,
          gender: filterGender,
          race: value
        })
        break
      default:
        break
    }
  }
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <HeaderBar />
      <Container sx={{ pt: 10, px: 0 }}>
        <Box component="div" sx={{ pt: 4, pb: 2, px: 5, textAlign: 'center' }}>
          Check out what others have envisioned in this future world...
        </Box>
        <Box component="div" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <CustomSelect min={1} max={100} changeValue={(value) => handleFilter(value, 'Age')} category="Age" inputClass="list-select-box" />
          <Select
            displayEmpty
            value={filterGender}
            onChange={(event) => handleFilter(event.target.value, 'Gender')}
            input={<Input disableUnderline={true} className="list-select-box" />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <Box component="span" sx={{ color: '#111111' }}>Gender</Box>;
              }

              return selected;
            }}
            MenuProps={MenuProps}
            sx={{ flex: '1 0' }}
            inputProps={{ 'aria-label': 'Without label', 'className': 'text-black padding-right-15' }}
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
          <Select
            displayEmpty
            value={filterRace}
            onChange={(event) => handleFilter(event.target.value, 'Race')}
            sx={{ flex: '1 0' }}
            input={<Input disableUnderline={true} className="list-select-box" />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <Box component="span" sx={{ color: '#111111' }}>Race</Box>;
              }

              return selected;
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label', 'className': 'text-black padding-right-15' }}
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
        <ImageList sx={{ width: '100%', height: 'auto', gap: '10px !important' }} cols={2}>
          {itemData.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                className='img-list'
              />
              <ImageListItemBar
                subtitle={<span className="infoText" style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{item.description}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
      <BottomNavbar />
    </Box >
  )
}
