import React from 'react'
import SingleCurveDoor from './SingleCurveDoor'

const WalkInDoorModel = (props) => {
	return (
		<>
			{props.doorType === 'single_curve_door' && <SingleCurveDoor />}
		</>
	)
}

export default WalkInDoorModel