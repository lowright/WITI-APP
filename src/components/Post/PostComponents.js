import React from 'react'
import post from '../../images/example.jpg'

import './style.css'

const PostComponents = ( { title = '', img, time = '', description = '' } = {} ) => {

	return(
		<div className="post">
			<div className="post-wrapper">
				<div className="head-post">
					<img style={{width : 32, height : 32, borderRadius : '50%'}} src={post} alt="" />
					<h3>{title}</h3>
				</div>
				<div className="description-post">
					<span>{time}</span>
				</div>
			</div>	
			<span className="post-descr">{description}</span>
		</div>

	)

}

export default PostComponents