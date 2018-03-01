export function login(data) {
  debugger;
  return {
    type: "LOGIN",
    data,
  }
}

export function register(data) {
  return {
    type: "REGISTER",
    data,
  }
}
