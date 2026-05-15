import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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
import { initialData, methodStore, taskStore } from '../../store';
import RangeSlider from '../RangeSlider';

const UIData = {
  'SS1-T1211': [
    { name: 'width', minValue: 3, maxValue: 6, id: 'SS1-T1211' },
    { name: 'height', minValue: 1, maxValue: 3, id: 'SS1-T1211' },
  ],
  'SS1-T1242': [
    { name: 'width', minValue: 5, maxValue: 16, id: 'SS1-T1242' },
    { name: 'height', minValue: 4, maxValue: 14, id: 'SS1-T1242' },
  ],
  Curve_door: [
    { name: 'width', minValue: 3, maxValue: 6, id: 'Curve_door' },
    { name: 'height', minValue: 5, maxValue: 10, id: 'Curve_door' },
  ],
  Truss: [
    { name: 'width', minValue: 20, maxValue: 30, id: 'Truss' },
    { name: 'height', minValue: 10, maxValue: 20, id: 'Truss' },
  ],
};

const TASK_LABELS = {
  'SS1-T1211': 'Window',
  'SS1-T1242': 'Door',
  Curve_door: 'Curved door',
  Truss: 'Truss',
};

const Control = () => {
  const { taskInfo, setTaskInfo } = taskStore();
  const { methodInfo, setMethodInfo } = methodStore();

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
                value={taskInfo}
                label="Model"
                onChange={(e) => setTaskInfo(e.target.value)}
              >
                {Object.keys(initialData).map((key) => (
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
            {UIData[taskInfo].map((element) => (
              <RangeSlider
                key={`${element.id}-${element.name}`}
                name={element.name}
                id={element.id}
                minValue={element.minValue}
                maxValue={element.maxValue}
              />
            ))}
          </section>

          <Divider />

          {taskInfo === 'SS1-T1242' && (
            <>
              <Divider />
              <section>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Door build method
                </Typography>
                <RadioGroup
                  value={methodInfo}
                  onChange={(e) => setMethodInfo(e.target.value)}
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
