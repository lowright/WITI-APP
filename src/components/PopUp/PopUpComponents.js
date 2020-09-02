import React from 'react'
import './style.css'
import notification from '../../images/notification.svg'

const PopUp = ( { close = Function, success = Function } = {} ) => {

	return(
		<div className="popUp">
			<div className="wrapper-popUp">
				<div className="notification-popUp">
					<img 
						src={notification}
						alt=""
					/>
					<p>Do you want to receive notifications from this group?</p>
				</div>
				<div className="btn-popUp">
					<button onClick={success()} style={{borderRight : `1px solid #d3d1d1`}}>Yes</button>
					<button onClick={close()}>No</button>
				</div>
			</div>
		</div>
	)

}

export default PopUp