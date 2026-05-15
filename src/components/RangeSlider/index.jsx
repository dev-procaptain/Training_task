import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {
  useAppDispatch,
  useAppSelector,
  selectBuildingWidth,
  selectBuildingHeight,
  setBuildingWidth,
  setBuildingHeight,
} from '../../store';

const RangeSlider = ({ name, minValue, maxValue }) => {
  const dispatch = useAppDispatch();
  const buildingWidth = useAppSelector(selectBuildingWidth);
  const buildingHeight = useAppSelector(selectBuildingHeight);
  const isWidth = name === 'width';
  const value = isWidth ? buildingWidth : buildingHeight;

  const handleChange = (_, newValue) => {
    if (isWidth) {
      dispatch(setBuildingWidth(newValue));
    } else {
      dispatch(setBuildingHeight(newValue));
    }
  };

  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Box sx={{ mb: 2.5 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          mb: 0.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600} color="primary.main">
          {value.toFixed(1)} m
        </Typography>
      </Box>
      <Slider
        value={value}
        min={minValue}
        max={maxValue}
        step={0.1}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${v.toFixed(1)} m`}
        size="small"
        aria-label={label}
      />
    </Box>
  );
};

export default RangeSlider;
