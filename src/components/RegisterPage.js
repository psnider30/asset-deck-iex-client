import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    //reset login status by dispatching action to logout user

    this.initialState = {
      username: '',
      password: '',
      submitted: false
    };
    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      // dispatch user action to register
    }
  }

  render() {
    // const { registering } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className= "col-md6 col-md-offset-3">
        <h2>Sign Up</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !username ? 'has-error': '')}>
            <label htmlFor="username">Username </label>
            <input type="text" className="form-control" name={username}
              value={username} onChange={this.handleChange}/>
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !password ? 'has-error': '')}>
            <label htmlFor="password">Password </label>
            <input type="password" className="form-control" name={password}
              value={password} onChange={this.handleChange}/>
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <Link to="/login" className="btn btn-link">Log In</Link>
      </div>
    );
  }
}
