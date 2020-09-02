import React, { Component, useState, useEffect } from 'react'
import './style.css'
import { useLocation } from "react-router";
import example from '../../images/example.jpg'
import CoolTabs from 'react-cool-tabs'
import Loader from 'react-loader-spinner'

//Import Component
import HeaderBack from '../../components/HeaderBack'
import Post from '../../components/Post'
import Participants from '../../components/Participants'
import PopUp from '../../components/PopUp'


//Import API Class
import API from '../../Api/Api'

const Api = new API({ host: 'https://wity.resty-app.dev' })


class EventDetailsScreen extends Component {


	constructor(props){
		super(props)

		this.state = {
			payload : null,
			loading : false,
			popUpHiden : false,
			privacyCheck : false,
			notificationCheck : false,
			token : '',
			notification : false
		}

		this.getGroupInfo = this.getGroupInfo.bind(this)
		this.notificationCheck = this.notificationCheck.bind(this)
		this.groupPrivacy = this.groupPrivacy.bind(this)
		
	}

	componentDidMount(){
		this.getGroupInfo()
	}

	getGroupInfo = () => {
		Api.getGroupInfo({
			method : 'GET',
			token : localStorage.getItem("token"),
			url : this.props.location.state.url
		})
		.then(data => this.setState({payload : data.payload, loading : true}))
	}

	notificationCheck = () => {
		if( this.state.notificationCheck ) {
			this.setState({ privacyCheck : false, popUpHiden : false})
		} else {
			this.setState({ privacyCheck : false, popUpHiden : true})
		}
	}


	closePopUp = () => {
		this.setState({popUpHiden : false, notificationCheck : false})
	}

	reciveNotification = async () => {
		await Api.updateGroupNotification({
			method : 'GET',
			token : localStorage.getItem("token"),
			url : this.props.location.state.url
		})
		.then(data => {
			this.setState({notification : data.payload.groupNotifications, popUpHiden : false})
		})
	}

	groupPrivacy = async () => {
		await Api.updateGroupPrivacy({
			method : 'GET',
			token : localStorage.getItem("token"),
			url : this.props.location.state.url
		})
		.then(data => {
			console.log(data.message + data.payload.groupPrivacy)
		})
	}


	render() {

		const { payload, loading, notificationCheck, privacyCheck, popUpHiden } = this.state

		return(
			<div className="event-details">
				{
					loading === true ? 
					<>
						{ popUpHiden 
						?
							<PopUp 
								success={() => this.reciveNotification}
								close={() => this.closePopUp}
							/> 
						: null 
						}
						<HeaderBack
							title={payload.name}
							goBack={() => this.props.history.push("/groups")}
							hide={this.state.notification}
						/>
						<div className="content">
							<div className="preview-wrapper">
								<img src={example} alt="" />

								<div className="events-date custome">
									<span>20</span>
									<p>OCT</p>
								</div>
							</div>
							<div className="details-wrapper">
								<h2>{payload.name}</h2>
								
								<CoolTabs
									tabKey={'1'}
									style={{ height:  225, background:  'white' }}
									activeTabStyle={{ color: '#E63946', fontSize: 14, fontWeight: 600, borderRadius: 0, borderBottom: '1px solid rgb(230, 57, 70)'}}
									unActiveTabStyle={{ color: '#B6B9BF', fontSize: 14,fontWeight: 600 }}
									leftContentStyle={{  overflow: 'scroll' }}
									rightContentStyle={{  overflow: 'scroll' }}
									leftTabTitle={'Post'}
									rightTabTitle={'Details'}
									leftContent={<T  />}
									rightContent={<D description={payload.description} />}
									contentTransitionStyle={'transform 0.3s ease-in'}
									borderTransitionStyle={'all 0.6s ease-in'}
								/>
							
							</div>
						</div>

						<div className="bottom-settings-event">
							<div style={{padding : 30}}>
								<button>PARTICIPANTE</button>
								<div className="check-swiper">
									<div>
									<span className={ notificationCheck ? 'noActive' : 'isActive' }>Notification</span>
									</div>
									<div>
										<input onChange={this.notificationCheck} id="notification" type="checkbox" />
										<label htmlFor="notification"></label>
									</div>
								</div>
								<div className="check-swiper">
								<div>
									<span className={ privacyCheck ? 'noActive' : 'isActive' }>Privacy</span>
									</div>
									<div>
										<input onChange={this.groupPrivacy} id="privacy" type="checkbox" />
										<label htmlFor="privacy"></label>
									</div>
								</div>
							</div>
						</div></> 
					: 
					<div className="loader">
						<Loader type="Bars" color="#E63946" height={80} width={80} />
					</div>
				}
			</div>
		)

	}

	

}


const T = () => {

	const [events, setEvents] = useState([])
	// const [loading, setLoading] = useState([false])

	let location = useLocation()

	useEffect(() => {
		const getPost = async () => {
			const res = await Api.getGroupEvents({
				method : 'POST',
				token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3OWQ1ZmYxNTYzZTliN2ZkZGUyZjcxN2VkY2U0Y2NiZWEwMTU0NDhkNjA4Mzc2ZWIzMGVkOGE4Y2Y4NWM5MWQ3NTkyYzNlMGZkMmUzODkxIn0.eyJhdWQiOiIzIiwianRpIjoiYTc5ZDVmZjE1NjNlOWI3ZmRkZTJmNzE3ZWRjZTRjY2JlYTAxNTQ0OGQ2MDgzNzZlYjMwZWQ4YThjZjg1YzkxZDc1OTJjM2UwZmQyZTM4OTEiLCJpYXQiOjE1OTc4NzEwOTIsIm5iZiI6MTU5Nzg3MTA5MiwiZXhwIjoxNjI5NDA3MDkyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.hgy0NlabZgOLGwdnucp_GR8RJhF-WNway5n1SyX5L8-0md3f6GE_187-5PmllFRdVo3pemykGV_8j5uBY_asb5_rlpuJeROL4zRugiYjVLf_9Okxis9EN5wve5MWVcPex9R90e6ZVb8kpzmt1nfx-DLLLi3NUjhVvRXc0GIBkPOc2D_I9gmW1nTCIYEGmizm096DYbjO-gfcHOa6NEGJAL8nJ9y-8oyTUCPjvm3tzdnDicqguvC-9sz3buqJ7AcRF3pk66QQZQHAfIUEn5FsQpr7wLf7cyAOoGsU1W8y8DROkfnAnYWwQfvIh0T6A9CZfSCgECSEEe4t5krx5BqNfqw7RHI6g43Myt54fk8HC6nc6a6fmdzqWCDQHAH596_NOCYpoquIqpzFB9baXd2Emof7jpNKaFIcdJe44cL_sXdq5jIVuQ9bRwQqd8DyjRv4yfxifpJ_wMJLLi2plJJhKNqjv3ausnpavrYC01OGSo4hmnyYTd80vNTrNsAqqk95PTf-RUBDlUithSJCsbUVbS-8jJMJzUlwfyusxPAMMfrVH92OgvRUDiaX6LBLuDSE2QUukA6xCusOh6il_pCVQKVf7Gx-WHH3ZEDw9w2AMcl8LKr0_rY-4nDy2uxwCi58uIiRqcy6C0S3q_rIhcQDw2nkeF5orFzsAcuCzlvUA7g',
				url : location.state.url
			})
			setEvents(res.payload)
		} 

		getPost()
	}, [])

	return(
		<>
			{
				events 
				? 
					events.map((item) => 
						<Post 
							title={item.name}
							description={item.description}
							time={item.endDateTime}
							key={item.accessURL}
						/> 
					)
				:
				<p>Post not exist</p>

			}
			
		</>
	)
}


const D = ({description = ''} = {}) => {
	return(
		<div className="desc-tab">
			<span className="chat-descr">{description}</span>
			<div className="public"><span>Public</span></div>
			<Participants />
			<div style={{position : 'relative'}}>
				<div className="partic-head">
					<p>Upcoming events 6</p>
					<span>See All</span>
				</div>
			</div>
		</div>
	)
}

export default EventDetailsScreen
