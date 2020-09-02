import React from 'react'
import './style.css' 
import add from '../../images/add.png'
import settings from '../../images/settings.png'


const Header = ( { title, isSeveralIcon = false, settingsHandle = Function, addHandle = Function } = {} ) => {

	return(
		<div className="header-wrapper">
			<div className="title-header">
				<h2>{ title }</h2>
			</div>
			<div className="settings">
				{
					isSeveralIcon 
					? 
						<button onClick={addHandle} style={{marginRight : 14}} className="settings-btn">
							<img src={add} className="" alt="setting header"/>
						</button>
					: null
				}

				<button onClick={settingsHandle} className="settings-btn">
					<img src={settings} className="" alt="add headers"/>
				</button>
			</div>
		</div>
	)

}

export default Header