import React, {Component} from 'react'
import upload from '../../images/upload-dark.svg'
import './style.css'

//Import API Class
import API from '../../Api/Api'

//Import Component 
import HeaderBack from '../../components/HeaderBack'




const Api = new API({ host: 'https://wity.resty-app.dev' })


class CreateGroupScreen extends Component {

	constructor(props) {
		super(props)

		this.state = {
			name : '',
			description : '',
			image: null,
			isPrivat : false
		}
	
		this.onImageChange = this.onImageChange.bind(this)
		this.checkPrivat = this.checkPrivat.bind(this)
		this.createGroup = this.createGroup.bind(this)
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

	createGroup = async () => {
		await Api.createNewGroup({
			method : 'POST',
			token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE3OWQ1ZmYxNTYzZTliN2ZkZGUyZjcxN2VkY2U0Y2NiZWEwMTU0NDhkNjA4Mzc2ZWIzMGVkOGE4Y2Y4NWM5MWQ3NTkyYzNlMGZkMmUzODkxIn0.eyJhdWQiOiIzIiwianRpIjoiYTc5ZDVmZjE1NjNlOWI3ZmRkZTJmNzE3ZWRjZTRjY2JlYTAxNTQ0OGQ2MDgzNzZlYjMwZWQ4YThjZjg1YzkxZDc1OTJjM2UwZmQyZTM4OTEiLCJpYXQiOjE1OTc4NzEwOTIsIm5iZiI6MTU5Nzg3MTA5MiwiZXhwIjoxNjI5NDA3MDkyLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.hgy0NlabZgOLGwdnucp_GR8RJhF-WNway5n1SyX5L8-0md3f6GE_187-5PmllFRdVo3pemykGV_8j5uBY_asb5_rlpuJeROL4zRugiYjVLf_9Okxis9EN5wve5MWVcPex9R90e6ZVb8kpzmt1nfx-DLLLi3NUjhVvRXc0GIBkPOc2D_I9gmW1nTCIYEGmizm096DYbjO-gfcHOa6NEGJAL8nJ9y-8oyTUCPjvm3tzdnDicqguvC-9sz3buqJ7AcRF3pk66QQZQHAfIUEn5FsQpr7wLf7cyAOoGsU1W8y8DROkfnAnYWwQfvIh0T6A9CZfSCgECSEEe4t5krx5BqNfqw7RHI6g43Myt54fk8HC6nc6a6fmdzqWCDQHAH596_NOCYpoquIqpzFB9baXd2Emof7jpNKaFIcdJe44cL_sXdq5jIVuQ9bRwQqd8DyjRv4yfxifpJ_wMJLLi2plJJhKNqjv3ausnpavrYC01OGSo4hmnyYTd80vNTrNsAqqk95PTf-RUBDlUithSJCsbUVbS-8jJMJzUlwfyusxPAMMfrVH92OgvRUDiaX6LBLuDSE2QUukA6xCusOh6il_pCVQKVf7Gx-WHH3ZEDw9w2AMcl8LKr0_rY-4nDy2uxwCi58uIiRqcy6C0S3q_rIhcQDw2nkeF5orFzsAcuCzlvUA7g',
			name : this.state.name,
			description : this.state.description
		})
		.then(() => this.props.history.push('/groups'))
		.catch(e => alert(e))
	}


	render() {

		const { isPrivat } = this.state

		return(

			<>
				<HeaderBack 
					title={"Create Group"}
					goBack={() => this.props.history.push('/groups')}
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
							<label>Group Name</label>
							<input className="input-fill" value={this.state.name} onChange={(event) => this.setState({name : event.target.value})} type="text" placeholder="Cat Lovers ;)" />
						</div>
						<div className="group-fill-input">
							<label>Description</label>
							<textarea className="input-fill" value={this.state.description} onChange={(event) => this.setState({description : event.target.value})} type="textarea" placeholder="" />
						</div>

						<div className="block">
							<span className={ isPrivat ? 'noCheck' : 'isCheck' }>Public</span>
							<input onChange={this.checkPrivat} id="cheap" type="checkbox" />
							<label htmlFor="cheap"></label>
							<span className={ isPrivat ? 'isCheck' : 'noCheck' }>Private</span>
						</div>

						<button onClick={this.createGroup} className="create-btn">Create</button>
					</div>

				</div>
			</>

		)

	}

}

export default CreateGroupScreen