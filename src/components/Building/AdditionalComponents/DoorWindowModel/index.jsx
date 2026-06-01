import React, {useMemo} from 'react'
import { useSelector } from 'react-redux';
// import DoublePatternDoor from './DoubleDoorModel/DoublePatternDoor';
import WindowModel from './WindowModel';
import DoubleDoorModel from './DoubleDoorModel';

const COMPONENT_MAP = {
    DoubleDoorModel: DoubleDoorModel,
    WindowModel: WindowModel,
};

const DoorWindowModel = ({orbitRef}) => {
    const additionalDoorData = useSelector((state) => state.building.additionalDoorData);

    const renderedItems = useMemo(() => {
        return additionalDoorData.map((item, index) => {
            const Component = COMPONENT_MAP[item.groupType];
            const props = {
                key: index,
                id: item,
                doorType: item.doorType,
                direction: item.direction,
                width: item.width,
                height: item.height,
                trimWidth: item.trimWidth,
                orbitRef: orbitRef,
                position: item.positionX,
                doorData: additionalDoorData,
            }
            return <Component {...props} />
        })
    },[additionalDoorData])
    return (
        <group>
           {renderedItems}
        </group>
    )
}

export default DoorWindowModel