import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInUser } from '../actions/userActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: '',
      password: '',
      submitted: false,
    };
    this.state = this.initialState;

    if (this.props.registerFail) {
      this.props.history.push('/signup')
     }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true })
    const { username, password } = this.state;
    if (username && password) {
      const credentials = {username: username, password: password};
      const { logInUser, history } = this.props;
      logInUser(credentials, history);
    }
  }

  render() {
    const { username, password, submitted } = this.state;
    const { logInFail } = this.props;
    return (
      <div>
        {logInFail &&
          <div className="help-block">Username and Password combination are incorrect</div>
        }
        <h2 className='large-green'>Login</h2>
        <form name="form" onSubmit={(event) => this.handleSubmit(event)}>
          <div className={'form-group' + (submitted && !username ? 'has-error': '')}>
            <label className='med-green' htmlFor="username">Username </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(event) => this.handleChange(event)}/>
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !password ? 'has-error': '')}>
            <label className='med-green' htmlFor="password">Password </label>
            <input type="password" className="form-control" name="password"
              value={password} onChange={(event) => this.handleChange(event)}/>
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className="form-group">
            <button className="login-button" disabled={submitted}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: state.users.loggedIn,
    logInFail: state.users.logInFail,
    history: ownProps.history,
    registerFail: state.users.registerFail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: bindActionCreators(logInUser, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
