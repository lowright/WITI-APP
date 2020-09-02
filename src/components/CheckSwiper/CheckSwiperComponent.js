import React from 'react'
import './style.css'

class CheckSwiper extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			isActive : false
		}

		this.checkPrivat = this.checkPrivat.bind(this)

	}

	checkPrivat = () => {
		if( this.state.isActive ) {
			this.setState({isActive : false})
		} else {
			this.setState({isActive : true})
		}
	}

	render() {

		const { isActive } = this.state
		const { title } = this.props

		return(
			<div className="check-swiper">
				<div>
				<span className={ isActive ? 'noActive' : 'isActive' }>{ title }</span>
				</div>
				<div>
					<input onChange={this.checkPrivat} id="cheap" type="checkbox" />
					<label htmlFor="cheap"></label>
				</div>
			</div>
		)
	}

}

export default CheckSwiper