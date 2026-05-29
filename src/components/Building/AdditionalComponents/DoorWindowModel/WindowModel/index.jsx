import React from 'react'
import PubConcessionWindow from './PubConcessionWindow'

const WindowModel = (props) => {
	return (
		<>
			{props.doorType === 'pub_concession_window' && <PubConcessionWindow {...props}/>}
		</>
	)
}

export default WindowModel