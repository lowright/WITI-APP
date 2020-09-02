import React, { Component } from 'react'
import './style.css'
import settings from '../../images/settings-btn.png'
import upload from '../../images/uploadImage.svg'

// Import Component
import HeaederBack from '../../components/HeaderBack'
import PopUp from '../../components/PopUp'

//Import API
import Api from '../../Api/Api'

// Implementation Class API
const API = new Api({host : 'https://wity.resty-app.dev'})

class SettingsScreen extends Component {

	constructor(props) {
		super(props)

		this.state = {
		  image: null,
		  userData: {},
		  showPopUp : true
		}
	
		this.onImageChange = this.onImageChange.bind(this)
		this.getUserInfo = this.getUserInfo.bind(this)
		this.logOut = this.logOut.bind(this)
		this.settingsNotification = this.settingsNotification.bind(this)
	}

	async componentDidMount() {
		await this.getUserInfo()
	}

	onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0]
			this.setState({
			image: URL.createObjectURL(img)
			})
		}
	}

	getUserInfo = async () => {
		const userData = await API.getUserInfo({
			method : 'GET',
			token : localStorage.getItem("token")
		})

		this.setState({userData})

	}

	logOut = () => {
		localStorage.clear()
		this.props.history.push("/")
	}

	settingsNotification = () => {

		if( this.state.showPopUp ) {
			this.setState({showPopUp : false})
		} else {
			this.setState({showPopUp : true})
		}

	}

	render() {

		const { userData, showPopUp } = this.state


		return(
			<>
				<HeaederBack
					title={"Settings"}
					goBack={() => this.props.history.push("/activity")}
					isSeveralIcon={false}
					settings={false}
				/>
        		
				{
					showPopUp === false ? 
						<PopUp 
							success={() => this.settingsNotification}
							close={() => this.settingsNotification}
						/>
						: null
				}
				
				<div className="user-logo-wrapper">
					<div className="uploading">
						<div className="upload-image">
							<input type="file" name="myImage" onChange={this.onImageChange} />
							<img src={upload} alt="" style={{width : 30}} />
							<img src={this.state.image} alt=""/>
						</div>
						<p>{ userData.name ? userData.name : 'Set your Name' }</p>
					</div>
					<div className="profile-settings">
						<button onClick={() => this.props.history.push('/change-profile')}> 
							<span>Change Profile</span>
							<img src={settings}  alt=""/>
						</button>
					</div>
					<div className="profile-settings">
						<button onClick={this.settingsNotification}>
							<span>Notification settings</span>
							<img src={settings}  alt=""/>
						</button>
					</div>
					<div className="profile-settings">
						<button onClick={() => this.props.history.push('/confidentiality')}>
							<span>Confidentiality</span>
							<img src={settings}  alt=""/>
						</button>
					</div>
					<div className="log-out">
						<div className="profile-settings">
							<button onClick={this.logOut}>
								<span>Log Out</span>
								<img src={settings}  alt=""/>
							</button>
						</div>
					</div>
				</div>
				
			</>
		)

	}

}

export default SettingsScreen