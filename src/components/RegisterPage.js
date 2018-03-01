import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../actions/userActions'

class LoginPage extends Component {
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
      this.props.register(this.state);
    }
  }

  render() {
    // const { registering } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className= "col-md6 col-md-offset-3">
        <h2>Sign Up</h2>
        <form name="form" onSubmit={(event) => this.handleSubmit(event)}>
          <div className={'form-group' + (submitted && !username ? 'has-error': '')}>
            <label htmlFor="username">Username </label>
            <input type="text" className="form-control" name={username}
              value={username} onChange={(event) => this.handleChange(event)}/>
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
            <button className="btn btn-primary" disabled={submitted}>
              Login
            </button>
          </div>
        </form>
        <br />
        <Link to="/login" className="btn btn-link">Log In</Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  register: bindActionCreators(register, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginPage);
