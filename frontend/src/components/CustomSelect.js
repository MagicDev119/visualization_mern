import React, { useState } from "react"
import {
  Box,
  Input,
  MenuItem,
  Select
} from '@mui/material'
import { Theme, useTheme } from '@mui/material/styles';

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

const CustomSelect = ({ min, max, changeValue, category }) => {
  const [value, setValue] = useState([])
  const theme = useTheme();

  const handleSelect = (value) => {
    setValue(value)
    changeValue(value, category)
  }

  return (
    <>
      <Box sx={{ flex: '1 0' }}>
        <Select
          displayEmpty
          value={value}
          onChange={(event) => handleSelect(event.target.value)}
          input={<Input disableUnderline={true} className="input-text fillAvailable" />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <Box component="span" sx={{ color: '#9e9e9e' }}>{category}</Box>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            {category}
          </MenuItem>
          {Array.from({ length: max - min + 1 }, (v, k) => k + min).map((each) => (
            <MenuItem
              key={each}
              value={each}
            >
              {each}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </>
  );
};
export default CustomSelect;