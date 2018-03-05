import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInUser } from '../actions/userActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    //reset login status by dispatching action to logout user

    this.initialState = {
      username: '',
      password: '',
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
      const credentials = this.state;
      const { logInUser, history } = this.props;
      logInUser(credentials);
    }
  }

  // componentWillUpdate(nextProps) {
  //   debugger;
  //   const { authenticated, currentUser, currentPath } = nextProps;
  //   if (authenticated && currentUser && currentPath === '/login') {
  //     this.props.history.push('/assets/quote')
  //   } else {
  //     this.props.history.push('/login')
  //   }
  // }

  render() {
    // const { loggingIn } = this.props;
    const { username, password, errors, submitted } = this.state;
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
        <Link to="/register" className="btn btn-link">Sign Up</Link>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.sessions.user.email,
    authenticated: state.sessions.user.authenticated,
    history: ownProps.history,
    currentPath: ownProps.location.pathname,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: bindActionCreators(logInUser, dispatch),
    // logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
