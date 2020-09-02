import React, {Component} from 'react'
import './style.css'
import upload from '../../images/upload-dark.svg'
import DatePicker from 'react-date-picker';
import 'antd/dist/antd.css';
// import { TimePicker } from 'antd';
// import moment from 'moment';
import LocationPicker from 'react-location-picker';

//Import API Class
import API from '../../Api/Api'

//Import Component 
import HeaderBack from '../../components/HeaderBack'


const Api = new API({ host: 'https://wity.resty-app.dev' })


class CreateEventScreen extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			name : '',
			description : '',
			image: null,
			isPrivat : false,
			value: 'orange',
			groupList : [],
			activeGroup : null,
			start : '',
			end : '',
			location : '',
			count : null,
			date : '',
			address: "Kala Pattar Ascent Trail, Khumjung 56000, Nepal",
			position: {
				lat: 0,
				lng: 0
			}
		}
	
		this.onImageChange = this.onImageChange.bind(this)
		this.checkPrivat = this.checkPrivat.bind(this)
		this.getListGroup = this.getListGroup.bind(this)
		this.handleLocationChange = this.handleLocationChange.bind(this)
	}

	async componentDidMount() {
		await this.getListGroup()
	}

	onImageChange = event => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0]
			this.setState({
				image: URL.createObjectURL(img)
			})
		}
	}

	checkPrivat = () => {
		if( this.state.isPrivat ) {
			this.setState({isPrivat : false})
		} else {
			this.setState({isPrivat : true})
		}
		setTimeout(() => console.log(this.state.isPrivat), 2000)
	}

	getListGroup = async () => {

		const groupList = await Api.getGroup({ method : "GET", token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3OWQ1ZmYxNTYzZTliN2ZkZGUyZjcxN2VkY2U0Y2NiZWEwMTU0NDhkNjA4Mzc2ZWIzMGVkOGE4Y2Y4NWM5MWQ3NTkyYzNlMGZkMmUzODkxIn0.eyJhdWQiOiIzIiwianRpIjoiYTc5ZDVmZjE1NjNlOWI3ZmRkZTJmNzE3ZWRjZTRjY2JlYTAxNTQ0OGQ2MDgzNzZlYjMwZWQ4YThjZjg1YzkxZDc1OTJjM2UwZmQyZTM4OTEiLCJpYXQiOjE1OTc4NzEwOTIsIm5iZiI6MTU5Nzg3MTA5MiwiZXhwIjoxNjI5NDA3MDkyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.hgy0NlabZgOLGwdnucp_GR8RJhF-WNway5n1SyX5L8-0md3f6GE_187-5PmllFRdVo3pemykGV_8j5uBY_asb5_rlpuJeROL4zRugiYjVLf_9Okxis9EN5wve5MWVcPex9R90e6ZVb8kpzmt1nfx-DLLLi3NUjhVvRXc0GIBkPOc2D_I9gmW1nTCIYEGmizm096DYbjO-gfcHOa6NEGJAL8nJ9y-8oyTUCPjvm3tzdnDicqguvC-9sz3buqJ7AcRF3pk66QQZQHAfIUEn5FsQpr7wLf7cyAOoGsU1W8y8DROkfnAnYWwQfvIh0T6A9CZfSCgECSEEe4t5krx5BqNfqw7RHI6g43Myt54fk8HC6nc6a6fmdzqWCDQHAH596_NOCYpoquIqpzFB9baXd2Emof7jpNKaFIcdJe44cL_sXdq5jIVuQ9bRwQqd8DyjRv4yfxifpJ_wMJLLi2plJJhKNqjv3ausnpavrYC01OGSo4hmnyYTd80vNTrNsAqqk95PTf-RUBDlUithSJCsbUVbS-8jJMJzUlwfyusxPAMMfrVH92OgvRUDiaX6LBLuDSE2QUukA6xCusOh6il_pCVQKVf7Gx-WHH3ZEDw9w2AMcl8LKr0_rY-4nDy2uxwCi58uIiRqcy6C0S3q_rIhcQDw2nkeF5orFzsAcuCzlvUA7g" })

		this.setState({ groupList })
	}

	setChooseGroop = (event) => {
		this.setState({activeGroup : event.target.value})
	}

	handleLocationChange ({ position, address, places }) {
		this.setState({ position, address, location : places });
	}

	createEvent = async () => {

		const { name, description, position, start, end, count, activeGroup, date } = this.state
		console.log(
			'name' + name, 
			'descr' + description, 
			'pos' + position.lat + position.lng, 
			'start' + start._i, 
			'end' + end._i, count, 
			'acrCode' + activeGroup, 
			'date' + date)
		await Api.createNewEvent({
			method : 'POST',
			token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3OWQ1ZmYxNTYzZTliN2ZkZGUyZjcxN2VkY2U0Y2NiZWEwMTU0NDhkNjA4Mzc2ZWIzMGVkOGE4Y2Y4NWM5MWQ3NTkyYzNlMGZkMmUzODkxIn0.eyJhdWQiOiIzIiwianRpIjoiYTc5ZDVmZjE1NjNlOWI3ZmRkZTJmNzE3ZWRjZTRjY2JlYTAxNTQ0OGQ2MDgzNzZlYjMwZWQ4YThjZjg1YzkxZDc1OTJjM2UwZmQyZTM4OTEiLCJpYXQiOjE1OTc4NzEwOTIsIm5iZiI6MTU5Nzg3MTA5MiwiZXhwIjoxNjI5NDA3MDkyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.hgy0NlabZgOLGwdnucp_GR8RJhF-WNway5n1SyX5L8-0md3f6GE_187-5PmllFRdVo3pemykGV_8j5uBY_asb5_rlpuJeROL4zRugiYjVLf_9Okxis9EN5wve5MWVcPex9R90e6ZVb8kpzmt1nfx-DLLLi3NUjhVvRXc0GIBkPOc2D_I9gmW1nTCIYEGmizm096DYbjO-gfcHOa6NEGJAL8nJ9y-8oyTUCPjvm3tzdnDicqguvC-9sz3buqJ7AcRF3pk66QQZQHAfIUEn5FsQpr7wLf7cyAOoGsU1W8y8DROkfnAnYWwQfvIh0T6A9CZfSCgECSEEe4t5krx5BqNfqw7RHI6g43Myt54fk8HC6nc6a6fmdzqWCDQHAH596_NOCYpoquIqpzFB9baXd2Emof7jpNKaFIcdJe44cL_sXdq5jIVuQ9bRwQqd8DyjRv4yfxifpJ_wMJLLi2plJJhKNqjv3ausnpavrYC01OGSo4hmnyYTd80vNTrNsAqqk95PTf-RUBDlUithSJCsbUVbS-8jJMJzUlwfyusxPAMMfrVH92OgvRUDiaX6LBLuDSE2QUukA6xCusOh6il_pCVQKVf7Gx-WHH3ZEDw9w2AMcl8LKr0_rY-4nDy2uxwCi58uIiRqcy6C0S3q_rIhcQDw2nkeF5orFzsAcuCzlvUA7g',
			name,
			description,
			start : start._i,
			end : end._i,
			location : position.lat + position.lng,
			group_accessURL : activeGroup,
			limit : count
		})
		.then(() => this.props.history.push('/events'))
		.catch(e => alert(e))
	}

	render() {

		const { isPrivat, groupList } = this.state
		// const format = 'HH:mm';

		const defaultPosition = {
			lat: 50.47934070563506,
			lng: 30.500145117938516
		}

		return(

			<>
				<HeaderBack 
					title={"Create Event"}
					goBack={() => this.props.history.push('/events')}
					settings={false}
					isSeveralIcon={false}
				/>	

				<div className="create-group-wrapper">
					
					<div className="upload-images">
						<input type="file" name="myImage" onChange={this.onImageChange} />
						<img src={upload} alt="" style={{width : 32}}/>
						<span>Add Cover</span>
						<img src={this.state.image} alt=""/>
					</div>

					<div className="create-fill">

						<div className="group-fill-input">
							<label>Choose Group</label>
							<select className="group-list" onChange={item => this.setChooseGroop(item)}>
								{
									groupList.map((item) => (
										<option value={item.accessURL} key={item.id}>{item.name}</option>
									))
								}
							</select>
						</div>
						<div className="group-fill-input">
							<label>Event Name</label>
							<input className="input-fill" value={this.state.name} onChange={(event) => this.setState({name : event.target.value})} type="text" placeholder="Cat Lovers ;)" />
						</div>
						<div className="group-fill-input">
							<label>Date</label>
							<DatePicker
								onChange={date => this.setState({date})}
								value={this.state.date}
								calendarIcon={null}
								clearIcon={null}
								name={'awdaw'}
							/>
							{/* <input value={this.state.date} onChange={(event) => this.setState({date : event.target.value})} type="text" placeholder="" /> */}
						</div>

						<div className="event-time">
							<div className="group-fill-input">
								<label>Start</label>
								{/* <TimePicker
									defaultValue={moment(this.state.start, format)}
									format={format}
									onChange={start => this.setState({start})}
								/> */}
								<input
									className="input-fill" 
									value={this.state.start} 
									onChange={(event) => this.setState({start : event.target.value})} 
									type="text" 
									placeholder="10:00" 
								/>
							</div>
							<div className="group-fill-input">
								<label>End</label>
								{/* <TimePicker
									defaultValue={moment(this.state.end, format)}
									format={format}
									onChange={end => this.setState({end})}
								/> */}
								<input 
									className="input-fill" 
									value={this.state.end} 
									onChange={(event) => this.setState({end : event.target.value})} 
									type="text" 
									placeholder="11:00" 
								/>
							</div>
						</div>

						<div className="group-fill-input">
							<label>Description</label>
							<input className="input-fill" value={this.state.description} onChange={(event) => this.setState({description : event.target.value})} type="text" placeholder="" />
						</div>

						<div className="group-fill-input">
							<label>Location</label>
							<LocationPicker
								containerElement={ <div style={ {height: '100%'} } /> }
								mapElement={ <div style={ {height: '300px'} } /> }
								defaultPosition={defaultPosition}
								onChange={this.handleLocationChange}
							/>
							{/* <input value={this.state.location} onChange={(event) => this.setState({location : event.target.value})} type="text" placeholder="" /> */}
						</div>

						<div className="group-fill-input">
							<label>Available number of seats</label>
							<input className="input-fill" value={this.state.count || ''} onChange={(event) => this.setState({count : event.target.value})} type="text" placeholder="" />
						</div>

						<div className="block">
							<span className={ isPrivat ? 'noCheck' : 'isCheck' }>Public</span>
							<input onChange={this.checkPrivat} id="cheap" type="checkbox" />
							<label htmlFor="cheap"></label>
							<span className={ isPrivat ? 'isCheck' : 'noCheck' }>Privat</span>
						</div>

						<button onClick={this.createEvent} className="create-btn">Create</button>
					</div>

				</div>
			</>

		)

	}

}

export default CreateEventScreen

