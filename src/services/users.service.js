import API_URL from './config.js';

export const UserService = {
  async getAllUsers() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data.users;
    } else {
      throw Error(response.message);
    }
  },
};
