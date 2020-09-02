import React from 'react'
import activ from '../../images/activ1.png'
import forMe from '../../images/@.png'
import './style.css'


const Activity = ( { logo, title = '', descr = '', isMe = false, count = null, date = '', subDescr = '', goToDetail = Function } = {} ) => {

	return(
		<div onClick={() => goToDetail()} className="wrapper-activity">
			<div className="inner-wrap">
				<div className="activity-logo">
					<img
						src={ logo ? logo : activ } className="actv-logo" alt="logo"
					/>
				</div>

				<div className="activity-describe">
					<h2>{ title }</h2>
					<p>{ descr }</p>
				</div>

				<div className="activity-date">
					<h2>{ date }</h2>
					<div>
						{
							isMe ? <img src={forMe} alt="@" /> : null
						}
						{
							count ? <span>{ count }</span> : null
						}
					</div>
				</div>
			</div>
			<div className="bottomDescr">
				<div style={{width : '20%'}}><b></b></div>
				<div className="subDescr">
					<span>{ subDescr ? subDescr : '' }</span>
				</div>
			</div>

		</div>
	)

}

export default Activity