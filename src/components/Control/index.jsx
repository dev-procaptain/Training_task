import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import {
  MODEL_TYPE_OPTIONS,
  MODEL_TYPES,
  useAppDispatch,
  useAppSelector,
  selectModelType,
  selectDoorMethod,
  setModelType,
  setDoorMethod,
} from '../../store';
import RangeSlider from '../RangeSlider';

const UIData = {
  [MODEL_TYPES.WINDOW]: [
    { name: 'width', minValue: 3, maxValue: 6 },
    { name: 'height', minValue: 1, maxValue: 3 },
  ],
  [MODEL_TYPES.DOOR]: [
    { name: 'width', minValue: 5, maxValue: 16 },
    { name: 'height', minValue: 4, maxValue: 14 },
  ],
  [MODEL_TYPES.CURVE_DOOR]: [
    { name: 'width', minValue: 3, maxValue: 6 },
    { name: 'height', minValue: 5, maxValue: 10 },
  ],
  [MODEL_TYPES.TRUSS]: [
    { name: 'width', minValue: 20, maxValue: 30 },
    { name: 'height', minValue: 10, maxValue: 20 },
  ],
};

const TASK_LABELS = {
  [MODEL_TYPES.WINDOW]: 'Window',
  [MODEL_TYPES.DOOR]: 'Door',
  [MODEL_TYPES.CURVE_DOOR]: 'Curved door',
  [MODEL_TYPES.TRUSS]: 'Truss',
};

const Control = () => {
  const dispatch = useAppDispatch();
  const modelType = useAppSelector(selectModelType);
  const doorMethod = useAppSelector(selectDoorMethod);

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
        <Stack direction="row" alignItems="center" spacing={1}>
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
          px: 2.5,
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
                {MODEL_TYPE_OPTIONS.map((key) => (
                  <MenuItem key={key} value={key}>
                    {`${TASK_LABELS[key] ?? key} (${key})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </section>

          <Divider />

          <section>
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 1.5 }}>
              <TuneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="subtitle2">Building Dimensions</Typography>
            </Stack>
            {UIData[modelType].map((element) => (
              <RangeSlider
                key={`${modelType}-${element.name}`}
                name={element.name}
                minValue={element.minValue}
                maxValue={element.maxValue}
              />
            ))}
          </section>

          {modelType === MODEL_TYPES.DOOR && (
            <>
              <Divider />
              <section>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Door build method
                </Typography>
                <RadioGroup
                  value={doorMethod}
                  onChange={(e) => dispatch(setDoorMethod(e.target.value))}
                >
                  <FormControlLabel
                    value="method1"
                    control={<Radio size="small" />}
                    label={
                      <Typography variant="body2">Method 1 — grid layout</Typography>
                    }
                  />
                  <FormControlLabel
                    value="method2"
                    control={<Radio size="small" />}
                    label={
                      <Typography variant="body2">Method 2 — fixed pattern</Typography>
                    }
                  />
                </RadioGroup>
              </section>
            </>
          )}
        </Stack>
      </Box>
    </Paper>
  );
};

export default Control;
