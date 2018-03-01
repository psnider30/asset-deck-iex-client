export function users(state= {
  currentUser: null,
  loggedIn: false,
  registered: false,
}, action) {
  switch(action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.data.username, loggedIn: true, registered: true };
    case 'REGISTER':
      return {...state, registered: true};
    default:
      return state
  }
}
