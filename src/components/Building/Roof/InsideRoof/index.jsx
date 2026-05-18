import React from 'react'
import GableRoof from './GableRoof'
import LoftedRoof from './LoftedRoof'

const InsideRoof=({modelType}) => {
	return (
		<>
			{modelType==='gable_building'&&<GableRoof />}
			{modelType==='lofted_building'&&< LoftedRoof />}
		</>
	)
}

export default InsideRoof