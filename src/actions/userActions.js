export function login(data) {
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
