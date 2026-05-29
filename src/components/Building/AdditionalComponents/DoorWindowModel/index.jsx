import React, {useMemo} from 'react'
import { useSelector } from 'react-redux';
import DoublePatternDoor from './DoubleDoorModel/DoublePatternDoor';
import PubConcessionWindow from './WindowModel/PubConcessionWindow';

const COMPONENT_MAP = {
   double_pattern_door: DoublePatternDoor,
    pub_concession_window: PubConcessionWindow,
};

const DoorWindowModel = () => {
    const additionalDoorData = useSelector((state) => state.building.additionalDoorData);

    const renderedItems = useMemo(() => {
        return additionalDoorData.map((item, index) => {
            const Component = COMPONENT_MAP[item.doorType];
            const props = {
                key: index,
                id: item.id,
                doorType: item.doorType,
                direction: item.direction,
                width: item.width,
                height: item.height,
                trimWidth: item.trimWidth,
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