import React from 'react'
import './style.css'

//Import Components
import HeaederBack from '../../components/HeaderBack'

const ConfidentialityScreen = ( props = {} ) => {

	return(

		<>
		<HeaederBack
			title={"Confidentiality"}
			goBack={() => props.history.push('settings')}
			isSeveralIcon={false}
			settings={false}
		/>
		<div className="confid-wrapper">
			<h3>Confidetiality Settings</h3>
			<p>
				The contents of this email message and any attachments are intended solely for the addressee(s)
				and may contain confidential and/or privileged information and may be legally protected from
				disclosure. If you are not the intended recipient of this message or their agent, or if this message
				has been addressed to you in error, please immediately alert the sender by reply email and then
				delete this message and any attachments. If you are not the intended recipient, you are hereby
				notified that any use, dissemination, copying, or storage of this message or its attachments is
				strictly prohibited
			</p>
		</div>
		</>

	)

}

export default ConfidentialityScreen