import { sessionService } from 'redux-react-session';
import { loginApi, logoutApi } from '../session_api/sessionApi';

export const login = (user, history) => {
  return () => {
    loginApi(user).then(response => {
      const { token } = response;
      sessionService.saveSession({ token })
      .then(() => {
        sessionService.saveUser(response.data)
        .then(() => {
          history.push('/assets/quote');
        }).catch(error => console.error(error));
      }).catch(error => console.error(error));
    })
  }
};

export const logout = (history) => {
  return () => {
    return logoutApi().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      history.push('/login');
    }).catch(error => {
      throw(error);
    });
  };
};




// function login(data) {
//   return {
//     type: "LOGIN",
//     data,
//   }
// }
//
export function register(data) {
  return {
    type: "REGISTER",
    data,
  }
}
