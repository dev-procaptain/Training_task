import React from "react";
import { useStore } from "../../store";

const RangeSlider = ({name, minValue, maxValue}) => {
	const {sizeInfo, changeSize} = useStore();
	
  const handleChange = (e) => {
		
		if (name === 'width')
    changeSize({
			...sizeInfo,
			width: e.target.value
		});
		if (name === 'height')
    changeSize({
			...sizeInfo,
			height: e.target.value
		});
}

  return (
    <div>
      <div style={{ display: "flex", gap: "5px" }}>
        <div>{name}</div>
        <div style={{ width: "50px" }}>{sizeInfo[name]}m</div>
      </div>
      <input
        id="range-slider"
        type="range"
				style={{width: '80%'}}
				min={minValue}
        max={maxValue}
        step="0.1"
        value={sizeInfo[name]}
        onChange={handleChange}
      />
    </div>
  );
};

export default RangeSlider;