import React, { Component } from 'react';
import Logo from '../../images/return.png';
import Right from '../../images/right-arrow.png';
import Api from '../../Api/Api';
import './style.css';

// Implementation Class API
const API = new Api({ host: 'https://wity.resty-app.dev' });

class CheckCodeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: {},
      seconds: 60,
      end: false,
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.goBack = this.goBack.bind(this);
    this.resentCode = this.resentCode.bind(this);

  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  secondsToTime(secs) {

    let divisor_for_minutes = secs % (60 * 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      's': seconds,
    };

    return obj;
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;

    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      // this.props.history.push("/")
      this.setState({ end: true });
      clearInterval(this.timer);
    }
  }

  goBack = () => {
    this.props.history.push('/');
    localStorage.removeItem('phone');
  };

  resentCode = async () => {
    await API.getOTPLink({
      method: 'POST',
      phoneNumber: localStorage.getItem('phone'),
    });
    this.startTimer();
    this.setState({ end: false });
  };


  render() {

    return (
      <div className="wrapperError">

        <div className="topNavigation">
          <button className="backBtn" onClick={this.goBack}>
            <img src={Logo} className="iconBack" alt="WITY"/>
          </button>
        </div>
        <div className="content">
          <div className="description">
            <h3>We have sent you an SMS</h3>
            <p>In whitch you will recive a link for authorization</p>
          </div>

          <div className="timer">
            <p>Not received an SMS? You can request it in {this.state.time.s} sec</p>
          </div>

          <div className="submitBtn">

            <button onClick={this.resentCode} className={this.state.end ? 'submit' : 'reSentCode'}>
              <img src={Right} className="arrow-right" alt="arrow-right"/>
            </button>

          </div>
        </div>
      </div>
    );

  }

}

export default CheckCodeScreen;
