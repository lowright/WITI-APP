import React from 'react'
// import Api from '../../Api'

// const API = new Api({host : 'https://wity.resty-app.dev'})

class Login extends React.Component {

	veriifyOTL = async () => {

        const settings = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        try {
            const data = await fetch(`https://wity.resty-app.dev/api/auth/verify/${this.props.match.params.otl}`, settings);
            const json = await data.json()
			console.log('Resp >>>>>>>>>>>' + JSON.stringify(json))
			
			if(JSON.stringify(json.token)){
                localStorage.setItem('userToken', JSON.stringify(json.token));
                await this.props.history.push('/activity');
            } else{
                this.props.history.push('/')
            }

        }
        catch (error) { console.log(error) }

    };

	async componentDidMount() {
		console.log(`OTL value = ${this.props.match.params.otl}`)
		await this.veriifyOTL()
	}

	render() {

		return(
			<p>authorization ...</p>
		)

	}

}

export default Login