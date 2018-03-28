import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/userActions'

class LoginPage extends Component {
  constructor(props) {
    super(props);

    //reset login status by dispatching action to logout user

    this.initialState = {
      username: '',
      password: '',
      errors: {},
      submitted: false,
    };
    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(this.state);
    }
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    const currentPath = this.props.location.pathname
    const { history } = this.props;
    if (currentPath === '/login' && nextProps.loggedIn) { history.push('/assets/quote') }
  }

  render() {
    // const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className= "col-md6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={(event) => this.handleSubmit(event)}>
          <div className={'form-group' + (submitted && !username ? 'has-error': '')}>
            <label htmlFor="username">Username </label>
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
            <label htmlFor="password">Password </label>
            <input type="password" className="form-control" name="password"
              value={password} onChange={(event) => this.handleChange(event)}/>
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className="form-group">
            <button className="btn btn-primary" disabled={submitted}>
              Login
            </button>
          </div>
        </form>
        <br />
        <p>In this version of the app you may LogIn with any credentials and it will only be reflected in redux state</p>
        <p>Or you can skip the Login and go straight to the App below</p>
        <br />
        <Link to="/assets/quote" className="btn btn-link">Enter Asset Deck</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    history: ownProps.history,
    location: ownProps.location,
    loggedIn: state.users.loggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: bindActionCreators(login, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
