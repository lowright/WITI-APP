import React, { Component } from 'react'
import './style.css'
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
// import Api from '../../Api'

//Import Component
import Activity from '../../components/Activity'
import Header from '../../components/Header'
import BottomNavigation from '../../components/BottomNavigation'

// Implementation Class API
// const API = new Api({host : 'https://wity.resty-app.dev'})


class ActivityScreen extends Component {

	constructor(props) {
		super(props)

		this.state = {
			activityList : [],
			isEmpty : true
		}

	}

	getActivitiesListNotification = async () => {

        const settings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEzZmIxZGIxODI4ZTY5MzY2YjRkYjcwYTBmMTMyMzQ0YzUyZTk0NmQ5Mzc4MjFmYmZiNDkzMDkwOTAzZGU3MTEwN2IzM2Y3ZjlkNmE0MGY4In0.eyJhdWQiOiIzIiwianRpIjoiMTNmYjFkYjE4MjhlNjkzNjZiNGRiNzBhMGYxMzIzNDRjNTJlOTQ2ZDkzNzgyMWZiZmI0OTMwOTA5MDNkZTcxMTA3YjMzZjdmOWQ2YTQwZjgiLCJpYXQiOjE1OTc2OTk1MDQsIm5iZiI6MTU5NzY5OTUwNCwiZXhwIjoxNjI5MjM1NTA0LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.NliZe482IByjnLdQdCJRx1uMqoCXrY5vKC_E0aRcCIeeMZcPvcN3BWUrOHbrAzBkhvPNrXle70ipMnLce7u_L_pEZahRlMWPlUAV6bgJNTAuYG4GtrxXSQ6b6oVOgZxcgCK3OipkCIR87BPmobG5r8zq-D0LResq9tefcAC4IVuLgv6C30LTp_vpwt5zfgaK9MkYwSMmSjeldVogdp3oZ81oXYi_K3ySAR9_OJctlyTugkBb85HE7zebAaEl4DsRZ35Vg4hfZOK55HR5vVpI6TjpzZApIh-3SGfqDhvkTciYrJvRPyc4fXHf1swQqvPop6lfZum7S7y8QJND6Ad9o5KT6yqXGF5C59mIPtZvZNhCVs0Pkil3tLfogSeYSyYhXL1xxClOteXcNinmXv52SvekEsBl7K53sDUq2Z-aaT_qumjjTSOc0i9HilUasTmeGrvSPI_R9TuhBPXOOvb38aNhwfCqcqGdVy3qCkHWAkVNvxeVj94Rr4aDysXtaKD8z8UwwRS2yGqOsmiZ7G7MYheLACFcdYqRpb5pfHP4bwSXP_SfrRDR6CVtEHDnXIPSG8dhyM72V1Xn0jaPPGbu8h6RYT-SmZMmbJTKAJu0SEw1ZgxRL1D6DPlXtNmYXq9JbDT14DX05-JRk95YdMhsEMDzjEuREa457cHCkdNbkps'
            },
        };
        try {
            const data = await fetch(`https://wity.resty-app.dev/api/f/n`, settings);
            const json = await data.json()
			console.log('Resp >>>>>>>>>>>' + JSON.stringify(json))

			if(json.message === 'success') {
				this.setState({activityList : json.payload, isEmpty : false})
			}
			

        }
        catch (error) { console.log(error) }

    }

	async componentDidMount() {
		await this.getActivitiesListNotification()
	}

	render() {

		const { activityList } = this.state
		
		return(

			<>
				<StickyHeader
					header={
						<Header
							title="Activity"
							settingsHandle={ () => this.props.history.push("/settings") }
							isSeveralIcon={ false }
						/>
					}
				/>
				{
					!this.state.isEmpty 
					? 
					<div className="empty-content"> 
						<p>Activities is Empty</p>
					</div>	
					:  
					<div className="activity-wrapp">
						{
							activityList.map( (item) => {
								return(
									<Activity
										// logo={}
										title={item.title}
										descr={item.descr}
										isMe={item.isMe}
										count={item.count}
										date={item.date}
										key={item.id}
									/>
								)
							} )
						}
					</div>
				}

				<BottomNavigation

				/>
			</>

		)

	}

}

export default ActivityScreen