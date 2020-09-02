import React, { Component } from 'react'
import './style.css'
import example from '../../images/example.jpg'
import location from '../../images/location.png'

//Import Component
import HeaderBack from '../../components/HeaderBack'
import Participants from '../../components/Participants'

//Import API Class
import API from '../../Api/Api'

const Api = new API({ host: 'https://wity.resty-app.dev' })

class EventDetailsScreen extends Component {

	constructor(props) {
		super(props)

		this.state = {
			follow : false,
			notificationEvents : false,
			privacyEvents : false
		}

		this.followEvents = this.followEvents.bind(this)
		this.notificationEvents = this.notificationEvents.bind(this)
		this.privacyEvents = this.privacyEvents.bind(this)

	}

	followEvents = async () => {
		await Api.followEvents({
			method : 'GET',
			token : localStorage.getItem("token"),
			url : this.props.location.state.url
		})
		if( this.state.follow ) {
			this.setState({follow : false})
		} else {
			this.setState({follow : true})
		}
	}

	notificationEvents = async  () => {
		await Api.updateEventNotofocation({
			method : 'GET',
			token : localStorage.getItem("token"),
			url : this.props.location.state.url
		})
		if( this.state.notificationEvents ) {
			this.setState({notificationEvents : false})
		} else {
			this.setState({notificationEvents : true})
		}
	}

	privacyEvents = async () => {
		await Api.updateEventPrivacy({
			method : 'GET',
			token : localStorage.getItem("token"),
			url : this.props.location.state.url
		})
		if( this.state.privacyEvents ) {
			this.setState({privacyEvents : false})
		} else {
			this.setState({privacyEvents : true})
		}
	}

	render() {

		const { isActive } = this.state

		return(
			<div className="event-details">
				<HeaderBack
					title={"Events Details"}
					goBack={() => this.props.history.push("/events")}
					hide={this.state.notificationEvents}
				/>
				<div className="preview-wrapper">
					<img src={example} alt="" />

					<div className="events-date custome">
						<span>20</span>
						<p>OCT</p>
					</div>
				</div>
				<div className="details-wrapper">

					<h2>Cat lovers ;)</h2>
					
					<p>30 October, 10:00 AM - 6:00 PM</p>

					<h3>
						The most important thing to keep in mind is that a turkey takes a long while to cook through to the bone…and keeps on cooking once you remove it from the oven. Make sure to bake, braise or roast the bird at a high enough temperature to keep it safe to eat and don’t overcook it.
					</h3>

					<div className="location">
						<img src={location} alt=""/>
						<span>Location Str 3 Aue</span>
					</div>

					<div className="admin">
						<div>
							<img src={example} alt=""/>
							<p>Derek Kim</p>
						</div>
						<span>Administrator</span>
					</div>
					<Participants />
				</div>

				<div className="bottom-settings-event">
					<div style={{padding : 30}}>
						<div className="status-event">
							<button style={{background : '#ECEDEE', color : '#969CA7'}}>NOT GOING</button>
							<button>GOING</button>
						</div>
						<div className="check-swiper">
							<div>
								<span className={ isActive ? 'noActive' : 'isActive' }>Follow</span>
							</div>
							<div>
								<input onChange={this.followEvents} id="follow" type="checkbox" />
								<label htmlFor="follow"></label>
							</div>
						</div>
						<div className="check-swiper">
							<div>
								<span className={ isActive ? 'noActive' : 'isActive' }>Notification</span>
							</div>
							<div>
								<input onChange={this.notificationEvents} id="notif" type="checkbox" />
								<label htmlFor="notif"></label>
							</div>
						</div>
						<div className="check-swiper">
							<div>
								<span className={ isActive ? 'noActive' : 'isActive' }>Privacy</span>
							</div>
							<div>
								<input onChange={this.privacyEvents} id="priv" type="checkbox" />
								<label htmlFor="priv"></label>
							</div>
						</div>
					</div>
				</div>
			</div>
		)

	}

}



export default EventDetailsScreen
