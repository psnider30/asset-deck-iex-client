import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpUser } from '../actions/userActions'

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      submitted: false,
      passwordLengthOk: true,
    };
    this.state = this.initialState;
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value });
    if (this.state.password.length > 5 && this.state.password.length < 21) {
      this.setState({ passwordLengthOk: true });
    }
  }

  handleSubmit(event) {
    const { username, email, password, passwordConfirm } = this.state;
    event.preventDefault();
    this.setState({ submitted: true });

    if (username && email && password && passwordConfirm && password === passwordConfirm) {
      if (password.length > 5 && password.length < 21) {
        this.setState({ passwordLengthOk: true });
        this.props.signUpUser(this.state, this.props.history);
      } else {
        this.setState({
          passwordLengthOk: false,
          submitted: false
        });
      }
    }
  }

  render() {
    const { username, email, password, passwordConfirm, passwordLengthOk, submitted } = this.state;
    return (
      <div>
        {!passwordLengthOk &&
          <div className="help-block">Password Length must be within 6 to 20 characters</div>}
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
              value={password} onChange={(event) => this.handleChange(event)}/>
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !passwordConfirm ? 'has-error': '')}>
            <label className='med-green' htmlFor="passwordConfirm">Password Confirm </label>
            <input type="password" className="form-control" name='passwordConfirm'
              value={passwordConfirm} onChange={(event) => this.handleChange(event)}/>
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
