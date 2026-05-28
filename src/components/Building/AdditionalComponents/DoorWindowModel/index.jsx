import React from 'react'
import { useSelector } from 'react-redux';

const DoorWindowModel = () => {
    const additionalDoorData = useSelector((state) => state.building.additionalDoorData);
    console.log('additionalDoorData: ', additionalDoorData);

    return (
        <>
            {/* insert your code */}
        </>
    )
}

export default DoorWindowModel