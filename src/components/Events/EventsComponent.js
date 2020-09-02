import React from 'react'

import locations from '../../images/location.png'
import './style.css'

const Events = ( { title = '', subTitle = '', description = '', location = '', day = '11', mounth = 'DEC', goToDatails = Function } = {} ) => {

	return(
		
		<div className="event-container" onClick={() => goToDatails()}>

			<div style={{width: '16%'}}></div>

			<div className="events-description">
				<h2>{ title }</h2>
				<p>{ subTitle }</p>
				<span>{ description }</span>
				{
					location 
					? 
						<div className="location">
							<img src={locations} alt="" />
							<span>{ location }</span>
						</div>
					:
						null
				}
			</div>

			<div className="events-date">
				<span>{day}</span>
				<p>{mounth}</p>
			</div>

			

		</div>

	)

}

export default Events