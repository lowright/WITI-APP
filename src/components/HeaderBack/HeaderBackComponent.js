import React from 'react'
import './style.css' 
import back from '../../images/back.png'
import details from '../../images/details.svg'
import mute from '../../images/mute.svg'

const HeaderBack = ( { title, goBack = Function, handleMute = Function, handleDetails = Function, isSeveralIcon = true, settings = true, hide = false } = {} ) => {

	return(
		<div className="headerBack-wrapper">
			<div style={{ display : 'flex' }}>
				<button onClick={goBack}>
					<img src={back} alt="" />
				</button>
				<h2>{ title }</h2>
			</div>
			<div style={{ justifyContent : 'flex-end', display: 'flex' }}>
				{
					isSeveralIcon ? 
						<button onClick={handleMute}>
							{ hide === false ? <img style={{ width : 18, height : 20 }} src={mute} alt="" /> : null }
						</button> : null
				}
				{
					settings ? 
						<button style={{ margin : 0 }} onClick={handleDetails}>
						<img style={{ height : 20 }} src={details} alt="" />
					</button> : null
				}
				
			</div>
		</div>
	)

}

export default HeaderBack