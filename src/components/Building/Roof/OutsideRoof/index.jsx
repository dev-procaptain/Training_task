import React from 'react'
import GableRoof from './GableRoof'
import LoftedRoof from './LoftedRoof'

const OutsideRoof=({modelType}) => {
	return (
		<>
			{modelType==='gable_building'&&<GableRoof />}
			{modelType==='lofted_building'&&< LoftedRoof />}
		</>
	)
}

export default OutsideRoof