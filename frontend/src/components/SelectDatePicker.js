import React, { useState, useMemo } from "react"
import CustomSelect from './CustomSelect';
import {
  Box,
  Input,
  MenuItem,
  Select
} from '@mui/material'
const SelectDatePicker = ({ handleDate }) => {
  const [curMonth, setMonth] = useState(null);
  const [curDate, setDate] = useState(null);
  const [curYear, setYear] = useState(null);
  const [dateLimit, setDateLimit] = useState(31);
  const changeValue = (val, cate) => {
    switch (cate) {
      case 'Month':
        setMonth(val)
        handleDate(curYear + '-' + val + '-' + curDate)
        break
      case 'Date':
        setDate(val)
        handleDate(curYear + '-' + curMonth + '-' + val)
        break
      case 'Year':
        setYear(val)
        handleDate(val + '-' + curMonth + '-' + curDate)
        break
      default:
        break
    }
  }

  useMemo(() => {
    if (curMonth || curYear) {
      var month = 0;
      var d = new Date(curYear, curMonth, 0);
      setDateLimit(d.getDate())
    }
  }, [curMonth, curYear])

  const nowYear = (new Date()).getFullYear()
  return (
    <>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <CustomSelect min={1} max={12} changeValue={changeValue} category="Month" />
        <CustomSelect min={1} max={dateLimit} changeValue={changeValue} category="Date" />
        <CustomSelect min={1990} max={nowYear} changeValue={changeValue} category="Year" />
      </Box>
    </>
  );
};
export default SelectDatePicker;