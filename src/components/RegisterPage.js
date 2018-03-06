import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser } from '../actions/userActions'

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    //reset login status by dispatching action to logout user

    this.initialState = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
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
    const { username, email, password, passwordConfirm } = this.state;
    if (username && email && password && passwordConfirm && password === passwordConfirm) {
      this.props.signUpUser(this.state, this.props.history);
    }
  }

  render() {
    // const { registering } = this.props;
    const { username, email, password, passwordConfirm, submitted } = this.state;
    return (
      <div>
        {this.props.registerFail &&
          <div className="help-block">Sorry, that username or password is already in use</div>
        }
        <h2 className='large-green'>Sign Up</h2>
        <form name="form" onSubmit={(event) => this.handleSubmit(event)}>
          <div className={'form-group' + (submitted && !username ? 'has-error': '')}>
            <label className='med-green' htmlFor="username">Username </label>
            <input type="text" className="form-control" name='username'
              value={username} onChange={(event) => this.handleChange(event)}/>
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !username ? 'has-error': '')}>
            <label className='med-green' htmlFor="username">Email </label>
            <input type="text" className="form-control" name='email'
              value={email} onChange={(event) => this.handleChange(event)}/>
            {submitted && !username &&
              <div className="help-block">Email is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !password ? 'has-error': '')}>
            <label className='med-green' htmlFor="password">Password </label>
            <input type="password" className="form-control" name='password'
              value={password} onChange={this.handleChange}/>
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !passwordConfirm ? 'has-error': '')}>
            <label className='med-green' htmlFor="passwordConfirm">Password Confirm </label>
            <input type="password" className="form-control" name='passwordConfirm'
              value={passwordConfirm} onChange={this.handleChange}/>
            {submitted && !passwordConfirm &&
              <div className="help-block">Password Confirmation is required</div>
            }
            {submitted && passwordConfirm && passwordConfirm !== password &&
              <div className="help-block">Password and Password Confirmation must match</div>
            }
          </div>

          <div className="form-group">
            <button className="register-button" disabled={submitted}>
              Signup
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
    history: ownProps.history,
    registerFail: state.users.registerFail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: bindActionCreators(signUpUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
