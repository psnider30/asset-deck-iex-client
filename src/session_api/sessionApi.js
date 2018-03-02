// Simulates servver calls

export const loginApi = (user) => {
  const response = {
    token: '1b2a3d4c',
    data: {
      email: user.email,
      firstName: 'test',
      lastName: 'test',
    }
  };
  return new Promise(resolve => setTimeout(resolve(response), 1000));
};

export const logoutApi = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};
