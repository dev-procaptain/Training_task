import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import {
  MODEL_TYPE_OPTIONS,
  getModelLabel,
  getSliderFieldsForModel,
  setModelType,
} from '../../store';
import RangeSlider from '../RangeSlider';
import Button from '@mui/material/Button';

const Control = () => {
  const dispatch = useDispatch();
  const modelType = useSelector((state) => state.building.modelType);
  const sliderFields = getSliderFieldsForModel(modelType);

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" alignitems="center" spacing={1}>
          <ViewInArIcon color="primary" fontSize="small" />
          <Typography variant="h6">Building Options</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Adjust dimensions and switch building options
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
          py: 2,
        }}
      >
        <Stack spacing={3}>
          <section>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Active model
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel id="task-select-label">Model</InputLabel>
              <Select
                labelId="task-select-label"
                id="task-select"
                value={modelType}
                label="Model"
                onChange={(e) => dispatch(setModelType(e.target.value))}
              >
                {MODEL_TYPE_OPTIONS.map((type) => (
                  <MenuItem key={type} value={type}>
                    {getModelLabel(type)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </section>

          <Divider />

          <section>
            <Stack direction="row" alignitems="center" spacing={0.75} sx={{ mb: 1.5 }}>
              <TuneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="subtitle2">Building Dimensions</Typography>
            </Stack>
            {sliderFields.map((element) => (
              <RangeSlider
                key={`${modelType}-${element.name}`}
                name={element.name}
                minValue={element.minValue}
                maxValue={element.maxValue}
                step={element.step}
                unit={element.unit}
              />
            ))}
          </section>
        </Stack>
      </Box>

      <Box sx={{ borderTop: 1, borderColor: 'divider', px: 3, py: 2 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Button variant="outlined" fullWidth sx={{ flex: 1 }}>
            Double Door
          </Button>
          <Button variant="outlined" fullWidth sx={{ flex: 1 }}>
            Walk In Door
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" fullWidth>
            Window
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Control;
