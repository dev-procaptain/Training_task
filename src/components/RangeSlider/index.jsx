import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {
  setBuildingWidth,
  setBuildingLength,
  setBuildingHeight,
  setBuildingPitch,
} from '../../store';

const SLIDER_CONFIG = {
  width: {
    select: (state) => state.building.buildingWidth,
    set: setBuildingWidth,
  },
  length: {
    select: (state) => state.building.buildingLength,
    set: setBuildingLength,
  },
  height: {
    select: (state) => state.building.buildingHeight,
    set: setBuildingHeight,
  },
  pitch: {
    select: (state) => state.building.buildingPitch,
    set: setBuildingPitch,
  },
};

const formatValue = (name, value, unit) => {
  if (unit === 'pitch') {
    return `${value}/12`;
  }
  return `${value.toFixed(1)} ${unit}`;
};

const RangeSlider = ({ name, minValue, maxValue, step = 10, unit = 'ft' }) => {
  const dispatch = useDispatch();
  const config = SLIDER_CONFIG[name];
  const value = useSelector(config.select);

  const handleChange = (_, newValue) => {
    dispatch(config.set(newValue));
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
          {formatValue(name, value, unit)}
        </Typography>
      </Box>
      <Slider
        value={value}
        min={minValue}
        max={maxValue}
        step={step}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => formatValue(name, v, unit)}
        size="small"
        aria-label={label}
      />
    </Box>
  );
};

export default RangeSlider;
