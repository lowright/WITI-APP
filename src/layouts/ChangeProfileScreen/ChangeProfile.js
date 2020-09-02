import React from 'react'
import './style.css'

//import Components
import HeaederBack from '../../components/HeaderBack'

const ChangeProfileScreen = ( props = {} ) => {

	return(

		<>
			<HeaederBack
				title={"ChangeProfile"}
				goBack={() => props.history.push('settings')}
				isSeveralIcon={false}
				settings={false}
			/>

			<div className="confid-wrapper">
			<form className="wrapper-change">
				<label>
					Email:
					<input type="text" name="name" />
				</label>
				<label>
					Name:
					<input type="text" name="name" />
				</label>
				<label>
					Phone:
					<input type="text" name="name" />
				</label>
				<input type="submit" value="Change" />
			</form>
			</div>
		</>

	)

}

export default ChangeProfileScreen