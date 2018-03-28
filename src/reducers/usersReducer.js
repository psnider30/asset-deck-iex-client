export function users(state= {
  currentUser: null,
  loggedIn: false,
}, action) {
  switch(action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.data.username, loggedIn: true, registered: true };
    default:
      return state
  }
}
