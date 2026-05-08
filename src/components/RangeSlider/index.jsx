import React from "react";
import {useStore} from "../../store";

const RangeSlider=({name,minValue,maxValue,id}) => {
  const {sizeInfo,changeSize}=useStore();

  const handleChange=(e) => {

    if(name==='width') {
      let temp=sizeInfo
      temp[id].splice(0,1,e.target.value);
      changeSize(temp);
    }

    if(name==='height') {
      let temp=sizeInfo
      temp[id].splice(1,1,e.target.value);
      changeSize(temp);
    }
  }

  return (
    <div>
      <div style={{display: "flex",gap: "5px"}}>
        <div>{name}</div>
        <div style={{width: "50px"}}>{name=='width'? sizeInfo[id][0]:sizeInfo[id][1]}m</div>
      </div>
      <input
        id="range-slider"
        type="range"
        style={{width: '100%'}}
        min={minValue}
        max={maxValue}
        step="0.1"
        value={name==='width'? sizeInfo[id][0]:sizeInfo[id][1]}
        onChange={handleChange}
      />
    </div>
  );
};

export default RangeSlider;