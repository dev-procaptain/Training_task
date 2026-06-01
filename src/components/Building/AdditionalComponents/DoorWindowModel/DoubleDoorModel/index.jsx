import {useDrag} from "@use-gesture/react"
import DoublePatternDoor from "./DoublePatternDoor"
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setStartPosition} from "../../../../../store";
import {updateStatePosition} from "../../../../../store/Action";

const DoubleDoorModel = (props) => {
	const buildingLength = useSelector((state) => state.building.buildingLength);
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
		if (position < limitX.min) setPosition(limitX.min);
		else if (position > limitX.max) setPosition(limitX.max)
	}, [buildingLength])
	
	const bind = useDrag(
		
		({ down, delta, first, event }) => {
			setIsDragging(down);
			event.stopPropagation();
			if (first) {
				if (props.direction === 'left') {
					dispatch(setStartPosition({id: props.id.id, x: 0, y: 0, z: position }));
				} else if (props.direction === 'right') {
					dispatch(setStartPosition({id: props.id.id, x: 0, y: 0, z: position }));
				}
			}
			let isMagneticEffectFound = false;
			var isSetPosition = false;

			if (down === true) {
				props.orbitRef.current.enableRotate = false;                    
			} 
			else {
				props.orbitRef.current.enableRotate = true;           
					
				//magnetic effect
				const filteredComps = props.doorData.filter((s, index) => index !== props.id).filter((s) => (s.direction === props.direction && (s.groupType === "WalkInDoor" || s.groupType === "GarageDoor" || "Window")));
				filteredComps.map((item) => {
					//horizontal
					if((0) <= (item.positionY + item.height) &&
						(props.height) >= (item.positionY - item.height) && 
						Math.abs(position - item.position) < (props.width + item.width)) {
							const posX = position < item.position ? item.position - (item.width + props.width): item.position + (item.width + props.width);
							const posY = item.groupType == 'WalkInDoor' || item.groupType == 'GarageDoor' ? (item.positionY + item.height / 2) : item.positionY;

							const isNOverlap = filteredComps.some((item) => {
								if(((posX + props.width) > (item.position - item.width) &&
										(posX - props.width) < (item.position + item.width)) &&
										((posY + props.height) > (item.positionY - item.height) &&
										(posY - props.height) < (item.positionY + item.height))
								) {
										return true;
								};
							});

								if (!isNOverlap && posX > limitX.min && posX < limitX.max) {
										setPosition(posX);
										isMagneticEffectFound = true;
								}
						}
				})
				}
						
			const nextPositionX = position + (delta[0] * 0.49 * distance) / 700;

			if (!isSetPosition && !isMagneticEffectFound) {
				if (nextPositionX >= limitX.min && nextPositionX <= limitX.max) {
					if (!down) {
						dispatch(setStartPosition({id: props.id.id, x: 0, y: 0, z: position }));
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
			{props.doorType === 'double_pattern_door' && <DoublePatternDoor {...props}/>}
		</group>
	)
}
export default DoubleDoorModel