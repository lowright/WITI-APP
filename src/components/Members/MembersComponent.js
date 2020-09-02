import React from 'react'
import member from '../../images/members.jpg'
import './style.css'

const Members = ( props = { } ) => {

	return(

		<div className="members-wrapper">

			<img src={member} alt="" />

			<p>Jeus Haskel ++</p>

		</div>

	)

}

export default Members