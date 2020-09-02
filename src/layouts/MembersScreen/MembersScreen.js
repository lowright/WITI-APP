import React, {Component} from 'react'
import './style.css'

//Import Component 
import HeaderBack from '../../components/HeaderBack'
import Member from '../../components/Members'

class MembersScreen extends Component {

	render() {

		return(

			<>
				<HeaderBack
					title={"Members "}
					goBack={() => this.props.history.push("/groups")}
				/>
				<div className="members-container">

					<Member

					/>
					<Member

					/>
					<Member

					/>


				</div>
			</>

		)

	}

}

export default MembersScreen