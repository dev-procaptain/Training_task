import React from 'react'
import GableWall from './GableWall'
import LoftedWall from './LoftedWall'

const OutsideWall=({modelType}) => {
	return (
		<>
			{modelType==='gable_building'&&<GableWall />}
			{modelType==='lofted_building'&&< LoftedWall />}
		</>
	)
}

export default OutsideWall