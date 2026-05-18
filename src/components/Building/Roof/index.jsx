import React from 'react'
import InsideRoof from './InsideRoof';
import OutsideRoof from './OutsideRoof';

const Roof=({modelType}) => {
	return (
		<>
			<InsideRoof modelType={modelType} />
			<OutsideRoof modelType={modelType} />
		</>
	)
}

export default Roof