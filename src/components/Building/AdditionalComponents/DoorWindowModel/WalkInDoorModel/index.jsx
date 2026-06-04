import React, {useEffect, useState} from 'react'
import SingleCurveDoor from './SingleCurveDoor'
import {useDispatch, useSelector} from 'react-redux';
import {setStartPosition} from '../../../../../store';
import {useDrag} from '@use-gesture/react';

const WalkInDoorModel = (props) => {
	const buildingLength = useSelector((state) => state.building.buildingLength);
	const walkInDoorOnClick = useSelector((state) => state.controlReducer.walkInDoorOnClick);
	const doorWidht = props.width;
	const directionValule = props.direction === 'left' ? -1 : 1;
	const limitX = {
		min: -buildingLength / 2 + doorWidht / 2,
		max: buildingLength / 2 - doorWidht / 2,
	}
	let distance = directionValule * 1000;

	const dispatch = useDispatch();
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState(props.position);
	
	useEffect(() => {
		if (position < limitX.min) {
			setPosition(limitX.min)
			dispatch(setStartPosition({id: props.id, x: 0, y: 0, z: limitX.min}))
		}
		else if (position > limitX.max) {
			setPosition(limitX.max)
			dispatch(setStartPosition({id: props.id, x: 0, y: 0, z: limitX.max}))
		} 
	}, [buildingLength])
	
	const bind = useDrag(
			
		({ down, delta, first, event }) => {
			setIsDragging(down);
			event.stopPropagation();
			if (first) {
				if (props.direction === 'left') {
					dispatch(setStartPosition({id: props.id, x: 0, y: 0, z: position }));
				} else if (props.direction === 'right') {
					dispatch(setStartPosition({id: props.id, x: 0, y: 0, z: position }));
				}
			}
			let isMagneticEffectFound = false;
			var isSetPosition = false;

			if (down === true) {
				props.orbitRef.current.enableRotate = false;                    
			} 
			else {
				props.orbitRef.current.enableRotate = true;     
			}
			const nextPositionX = position + (delta[0] * 0.49 * distance) / 700;

			if (!isSetPosition && !isMagneticEffectFound) {
				if (nextPositionX >= limitX.min && nextPositionX <= limitX.max) {
					if (!down) {
						dispatch(setStartPosition({id: props.id, x: 0, y: 0, z: position }));
					}
					setPosition((prev) => prev + (delta[0] * 0.49 * distance) / 700);
					setPosition(nextPositionX);
				} 
			}
		},
		{ pointerEvents: true }
	);
					
	
				
	return (
		<group
			position={[0, 0, position]}
			{...bind()}
		>
			{walkInDoorOnClick && <SingleCurveDoor {...props}/>}
		</group>
	)
}

export default WalkInDoorModel