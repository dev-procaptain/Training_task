const pitchToRise = (pitch) => Math.round(pitch * 12);

export const ResModelData = [
  {
    type: 'gable_building',
    name: 'Gable building',
    description: 'A gable building is a type of building that has a gable roof.',
    component: 'truss',
    width: 300,
    length: 400,
    height: 250,
    pitch: 5 / 12,
    pitchRange: { min: 3, max: 8 },
    widthRange: { min: 300, max: 500 },
    lengthRange: { min: 400, max: 600 },
    heightRange: { min: 250, max: 350 },
    additionalCmpData: [
      {
        id: 1,
        groupType: 'WindowModel',
        doorType: 'pub_concession_window',
        direction: 'front',
        width: 50,
        height: 30,
        trimWidth: 0.3,
      },
      {
        id: 2,
        groupType: 'WindowModel',
        doorType: 'pub_concession_window',
        direction: 'back',
        width: 50,
        height: 30,
        trimWidth: 0.3,
      },
      {
        id: 3,
        groupType: 'DoubleDoorModel',
        doorType: 'double_pattern_door',
        direction: 'left',
        width: 150,
        height: 150,
        trimWidth: 0.3,
      },
      {
        id: 4,
        groupType: 'DoubleDoorModel',
        doorType: 'double_pattern_door',
        direction: 'left',
        width: 150,
        height: 150,
        trimWidth: 0.3,
      },
      {
        id: 5,
        groupType: 'DoubleDoorModel',
        doorType: 'double_pattern_door',
        direction: 'right',
        width: 150,
        height: 150,
        trimWidth: 0.3,
      },
      {
        id: 6,
        groupType: 'DoubleDoorModel',
        doorType: 'double_pattern_door',
        direction: 'right',
        width: 150,
        height: 150,
        trimWidth: 0.3,
      },
    ],
  },
  {
    type: 'lofted_building',
    name: 'Lofted building',
    description: 'A lofted building is a type of building that has a lofted roof.',
    component: 'truss',
    width: 300,
    length: 400,
    height: 150,
    pitch: 5 / 12,
    pitchRange: { min: 3, max: 8 },
    widthRange: { min: 300, max: 500 },
    lengthRange: { min: 400, max: 600 },
    heightRange: { min: 250, max: 350 },
    additionalCmpData: [
      {
        id: 1,
        groupType: 'WindowModel',
        doorType: 'pub_concession_window',
        direction: 'front',
        width: 50,
        height: 30,
        trimWidth: 0.3,
      },
      {
        id: 2,
        groupType: 'WindowModel',
        doorType: 'pub_concession_window',
        direction: 'back',
        width: 50,
        height: 30,
        trimWidth: 0.3,
      },
      {
        id: 3,
        groupType: 'DoubleDoorModel',
        doorType: 'double_pattern_door',
        direction: 'left',
        width: 100,
        height: 100,
        trimWidth: 0.3,
      },
      {
        id: 4,
        groupType: 'DoubleDoorModel',
        doorType: 'double_pattern_door',
        direction: 'right',
        width: 100,
        height: 100,
        trimWidth: 0.3,
      },
    ],
  },
];

export const MODEL_TYPES = ResModelData.reduce((acc, { type }) => {
  acc[type.toUpperCase()] = type;
  return acc;
}, {});

export const MODEL_TYPE_OPTIONS = ResModelData.map(({ type }) => type);

export const DEFAULT_MODEL_TYPE = ResModelData[0].type;

export const getModelByType = (type) =>
  ResModelData.find((model) => model.type === type);

export const getDimensionsForModelType = (modelType) => {
  const model = getModelByType(modelType);
  if (model) {
    return {
      width: model.width,
      length: model.length,
      height: model.height,
      pitch: pitchToRise(model.pitch),
      additionalDoorData: model.additionalCmpData || [],
    };
  }
  const fallback = ResModelData[0];
  return {
    width: fallback.width,
    length: fallback.length,
    height: fallback.height,
    pitch: pitchToRise(fallback.pitch),
    additionalDoorData: fallback.additionalCmpData || [],
  };
};

export const getSliderFieldsForModel = (modelType) => {
  const model = getModelByType(modelType);
  if (!model) return [];
  return [
    {
      name: 'width',
      minValue: model.widthRange.min,
      maxValue: model.widthRange.max,
      step: 10,
      unit: 'ft',
    },
    {
      name: 'length',
      minValue: model.lengthRange.min,
      maxValue: model.lengthRange.max,
      step: 10,
      unit: 'ft',
    },
    {
      name: 'height',
      minValue: model.heightRange.min,
      maxValue: model.heightRange.max,
      step: 10,
      unit: 'ft',
    },
    {
      name: 'pitch',
      minValue: model.pitchRange.min,
      maxValue: model.pitchRange.max,
      step: 1,
      unit: 'pitch',
    },
  ];
};

export const getModelLabel = (modelType) =>
  getModelByType(modelType)?.name ?? modelType;

export const modelSupportsDoorMethod = (modelType) =>
  Boolean(getModelByType(modelType)?.supportsDoorMethod);

export const initialData = Object.fromEntries(
  ResModelData.map(({ type, width, length, height, pitch }) => [
    type,
    [width, length, height, pitchToRise(pitch)],
  ])
);
