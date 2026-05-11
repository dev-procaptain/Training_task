import React from "react";
import {initialData,methodStore,taskStore} from "../../store";
import RangeSlider from "../RangeSlider";
import './style.css';

const UIData={
	'SS1-T1211': [
		{name: "width",minValue: 3,maxValue: 6,id: 'SS1-T1211'},
		{name: "height",minValue: 1,maxValue: 3,id: 'SS1-T1211'},
	],
	'SS1-T1242': [
		{name: "width",minValue: 5,maxValue: 16,id: 'SS1-T1242'},
		{name: "height",minValue: 4,maxValue: 14,id: 'SS1-T1242'},
	]
};
const Control=() => {

	const {taskInfo,setTaskInfo}=taskStore();
	const handleChange=(e) => {
		setTaskInfo(e.target.value);

	};

	const {methodInfo,setMethodInfo}=methodStore();
	const changeMethod=(event) => {
		setMethodInfo(event.target.value)
	}
	return (
		<div>
			<h1>Building Option</h1>
			{
				UIData[taskInfo].map((element,index) => {
					return (
						<RangeSlider
							key={index}
							name={element.name}
							id={element.id}
							minValue={element.minValue}
							maxValue={element.maxValue}
						/>
					);
				})
			}

			<div style={{display: 'flex',flexDirection: "column",justifyContent: 'center',alignItems: "center"}}>
				<h1>Task List</h1>
				<select className="taskList" onChange={handleChange}>
					{
						Object.keys(initialData).map((element,index) => {
							return (
								<option>{element}</option>
							)
						})
					}
				</select>
				<h1>{taskInfo}</h1>

				<form onChange={changeMethod}>
					{
						taskInfo==='SS1-T1242'&&['method1','method2'].map((element,index) => {
							return (<>
								<input key={index} type="radio" id={element} value={element} name="doormethod" />
								<label htmlFor={element}>{element}</label>
							</>
							)
						})
					}
				</form>
			</div>
		</div>
	)
}

export default Control;