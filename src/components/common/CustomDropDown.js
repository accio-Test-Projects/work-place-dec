import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CustomDropDown({
  dropDownList,
  val,
  onChange,
  required,
  disabled
}) {
  const theme = useTheme();


  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{  width: "100%" }}>
        <Select
        size='small'
        disabled={disabled}
        required={required}
          id="demo-simple-select"
          value={val}
          
          fullWidth
          onChange={handleChange}
        >
          {dropDownList.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
            
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CustomDropDown