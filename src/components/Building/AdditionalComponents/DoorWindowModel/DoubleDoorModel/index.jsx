import DoublePatternDoor from "./DoublePatternDoor"

const DoubleDoorModel = (props) => {
	return (
		<>
			{props.doorType === 'double_pattern_door' && <DoublePatternDoor />}
		</>
	)
}
export default DoubleDoorModel