import React from 'react'
import { useSelector } from 'react-redux';
import GableRoof from './GableRoof'
import LoftedRoof from './LoftedRoof'

const InsideRoof =() => {
  	const modelType = useSelector((state) => state.building.modelType);

	return (
		<>
			{modelType === 'gable_building' && <GableRoof />}
			{modelType === 'lofted_building' && <LoftedRoof />}
		</>
	)
}

export default InsideRoof