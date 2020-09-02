import React, {Component} from 'react'
import Logo from '../../images/logo.svg'
import Right from '../../images/right-arrow.png'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Api from '../../Api/Api'
import './style.css'



// Implementation Class API
const API = new Api({host : 'https://wity.resty-app.dev'})

class AuthScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      mobilevalidate : true,
      value : null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.isAuth()
  }

  handleChange(event) {
    this.setState({phoneNumber: event.target.value})
  }

  handleSubmit(event) {
    localStorage.setItem('phone', this.state.value)
    this.validatePhoneNumber()
    event.preventDefault()
  }

  isAuth = () => {
    if( localStorage.getItem("userToken") === null ){
      console.log('Not Auth')
    }
    else {
      this.props.history.push('/activity')
    }
  }


  validatePhoneNumber = async () => {

    const { value } = this.state
    const reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,13}(\s*)?$/

    if (reg.test(value) === false) {
      this.setState({
        mobilevalidate: false,
        value : null,
      })
      console.log('Phone Length ' + value)
    }
    else {
      this.setState({
        mobilevalidate: true,
      })
      console.log('Phone Number: ' + value)

      await API.getOTPLink({ method : 'POST', phoneNumber : value }).then((response)=> {
        //TODO: Add validation from API!!!! DON"T redirect to check-code if 500 from server
      }) 
      this.props.history.push("check-сode")
    }

  }

  render(){

    const { mobilevalidate, value } = this.state

    return (
      <div className="wrapper">
        <div className="logo">
          <img src={Logo} className="logotype" alt="WITY"/>
        </div>

        <div className="authInput">
          <h3>Enter your number</h3>
          <p>We will send you a verification code via SMS</p>
          <PhoneInput
            international
            defaultCountry="US"
            value={value}
            onChange={val => this.setState({value : val})}
          />
          <span className="errorPhoneInput">{ mobilevalidate ? ' ' : 'Please Update Input Value Correctly' }</span>
        </div>

        <div className="submitBtn">

          <button onClick={this.handleSubmit} className="submit">
            <img src={Right} className="arrow-right" alt="arrow-right"/>
          </button>

        </div>

      </div>
    );
  }

}

export default AuthScreen;
