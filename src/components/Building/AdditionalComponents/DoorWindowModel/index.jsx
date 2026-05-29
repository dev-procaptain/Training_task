import React, {useMemo} from 'react'
import { useSelector } from 'react-redux';
import DoublePatternDoor from './DoubleDoorModel/DoublePatternDoor';
import WalkInDoorModel from './WalkInDoorModel';
import WindowModel from './WindowModel';

const COMPONENT_MAP = {
    DoubleDoorModel: DoublePatternDoor,
    WalkInDoorModel: WalkInDoorModel,
    WindowModel: WindowModel,
};

const DoorWindowModel = () => {
    const additionalDoorData = useSelector((state) => state.building.additionalDoorData);

    const renderedItems = useMemo(() => {
        return additionalDoorData.map((item, index) => {
            const Component = COMPONENT_MAP[item.groupType];
            const props = {
                key: index,
                id: item.id,
                doorType: item.doorType,
                direction: item.direction,
                width: item.width,
                height: item.height,
                trimWidth: item.trimWidth,
                method : item.method,
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