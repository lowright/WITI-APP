import React, { Component } from 'react'

import './style.css'
import 'react-sticky-header/styles.css'
import StickyHeader from 'react-sticky-header'
import Loader from 'react-loader-spinner'

//Import Components
import Header from '../../components/Header'
import Events from '../../components/Events'
import BottomNavigation from '../../components/BottomNavigation'

//Implementation API
import API from '../../Api'

const Api = new API({ host: 'https://wity.resty-app.dev' })

class EventsScreen extends Component {

	constructor(props) {
		super(props)

		this.state = {
			eventList : [],
			isEmpty : true,
			isLoading : false
		}


	}

	async componentDidMount(){
		await this.getListEevents()
	}


	getListEevents = async () => {
		const eventList = await Api.getEventsList({
			method : 'GET',
			token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEzZmIxZGIxODI4ZTY5MzY2YjRkYjcwYTBmMTMyMzQ0YzUyZTk0NmQ5Mzc4MjFmYmZiNDkzMDkwOTAzZGU3MTEwN2IzM2Y3ZjlkNmE0MGY4In0.eyJhdWQiOiIzIiwianRpIjoiMTNmYjFkYjE4MjhlNjkzNjZiNGRiNzBhMGYxMzIzNDRjNTJlOTQ2ZDkzNzgyMWZiZmI0OTMwOTA5MDNkZTcxMTA3YjMzZjdmOWQ2YTQwZjgiLCJpYXQiOjE1OTc2OTk1MDQsIm5iZiI6MTU5NzY5OTUwNCwiZXhwIjoxNjI5MjM1NTA0LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.NliZe482IByjnLdQdCJRx1uMqoCXrY5vKC_E0aRcCIeeMZcPvcN3BWUrOHbrAzBkhvPNrXle70ipMnLce7u_L_pEZahRlMWPlUAV6bgJNTAuYG4GtrxXSQ6b6oVOgZxcgCK3OipkCIR87BPmobG5r8zq-D0LResq9tefcAC4IVuLgv6C30LTp_vpwt5zfgaK9MkYwSMmSjeldVogdp3oZ81oXYi_K3ySAR9_OJctlyTugkBb85HE7zebAaEl4DsRZ35Vg4hfZOK55HR5vVpI6TjpzZApIh-3SGfqDhvkTciYrJvRPyc4fXHf1swQqvPop6lfZum7S7y8QJND6Ad9o5KT6yqXGF5C59mIPtZvZNhCVs0Pkil3tLfogSeYSyYhXL1xxClOteXcNinmXv52SvekEsBl7K53sDUq2Z-aaT_qumjjTSOc0i9HilUasTmeGrvSPI_R9TuhBPXOOvb38aNhwfCqcqGdVy3qCkHWAkVNvxeVj94Rr4aDysXtaKD8z8UwwRS2yGqOsmiZ7G7MYheLACFcdYqRpb5pfHP4bwSXP_SfrRDR6CVtEHDnXIPSG8dhyM72V1Xn0jaPPGbu8h6RYT-SmZMmbJTKAJu0SEw1ZgxRL1D6DPlXtNmYXq9JbDT14DX05-JRk95YdMhsEMDzjEuREa457cHCkdNbkps',
		})

		this.setState({eventList, isEmpty : false, isLoading : true})
	}

	goToDetail = url => {
		this.props.history.push("/detail", {url})
	}
	

	render() {

		const { isLoading, eventList } = this.state

		return(
			<>
				<StickyHeader
					header={ 
						<Header
							title="Events"
							isSeveralIcon={true}
							addHandle={() => this.props.history.push('/create-event')}
							settingsHandle={() => this.props.history.push('/settings')}
						/>
					}
				/>

				{
					this.state.isEmpty 
					? 
					<div className="empty-content"> 
						<p>Activities is Empty</p>
					</div>	
					:  
					isLoading ? 
						<div className="events-wrapper">
						{
							eventList.map( (item) => {
								return(
									<Events
										title={item.name}
										subTitle={`${item.startDateTime}AM : ${item.endDateTime}PM`}
										description={item.description}
										location={item.location}
										day={"03"}
										mounth={"OC"}
										key={item.id}
										goToDatails={() => this.goToDetail(item.accessURL)}
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

				<BottomNavigation  />

			</>
		)

	}

}

export default EventsScreen