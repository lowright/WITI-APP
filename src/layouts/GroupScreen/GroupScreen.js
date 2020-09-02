import React from 'react'
import 'react-sticky-header/styles.css'
import './style.css'
import StickyHeader from 'react-sticky-header'

//Import Component
import Activity from '../../components/Activity'
import Header from '../../components/Header'
import BottomNavigation from '../../components/BottomNavigation'
import Loader from 'react-loader-spinner'


//Import API
import API from '../../Api/Api'

const Api = new API({ host : "https://wity.resty-app.dev" })


class EventScreen extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			groupList : [],
			isLoading : false
		}

		this.getGroupListNotification = this.getGroupListNotification.bind(this)
		this.goToDetail = this.goToDetail.bind(this)

	}
	
	async componentDidMount() {
		await this.getGroupListNotification()
		console.log(this.state.groupList)
	}

	getGroupListNotification = async () => {

		const groupList = await Api.getGroup({ 
			method : "GET", 
			token : localStorage.getItem("token")
		})

		this.setState({ groupList, isLoading : true })
	}
	
	goToDetail = url => {
		this.props.history.push("/chat", {url})
	}

	render() {

		const { groupList, isLoading } = this.state
		
		return(

			<>
				<StickyHeader
					header={
						<Header
							title="Group"
							isSeveralIcon={ true }
							addHandle={() => this.props.history.push("/create-group")}
							settingsHandle={() => this.props.history.push("/settings")}
						/>
					}
				/>
				{
					!this.state.groupList 
					? 
					<div className="empty-content"> 
						<p>Activities is Empty</p>
					</div>	
					:  
					isLoading ? 
						<div className="activity-wrapp">
						{
							groupList.map( (item) => {
								return(
									<Activity
										title={item.name}
										descr={item.description}
										subDescr={item.subDesr}
										key={item.id}
										goToDetail={() => this.goToDetail(item.accessURL)}
									/>
								)
							} )
						}
						</div> 
					: 
						<div className="loader">
							<Loader type="Bars" color="#E63946" height={80} width={80} />
						</div>
				}
				<BottomNavigation />
			</>

		)

	}

}

export default EventScreen