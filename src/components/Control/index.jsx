import RangeSlider from "../RangeSlider";


const UIData = [
  { name: "width", minValue: 3, maxValue: 6 },
  { name: "height", minValue: 1, maxValue: 3 },
];
const Control = () => {
	
	return(
		<div>
			<h1>Building Option</h1>
			{
				UIData.map((element, index) => {
					return (
						<RangeSlider 
							key={index}
							name={element.name}
							minValue={element.minValue}
							maxValue={element.maxValue}
						/>
					);
				})
			}
		</div>
		)
}

export default Control;