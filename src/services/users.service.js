import API_URL from './config.js';

export const UsersService = {
  async getAllUsers() {
    const user = JSON.parse(localStorage.getItem('users'));
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

  async deleteUser(id) {
    const user = JSON.parse(localStorage.getItem('users'));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
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

  async updateUser(data, id) {
    const user = JSON.parse(localStorage.getItem('users'));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });
    if (response.ok) {
      let data = await response.json();
      return data.users;
    } else {
      throw Error(response.message);
    }
  },

  async getUserById(id) {
    const user = JSON.parse(localStorage.getItem('users'));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/users/${id}`, {
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

  async getTop10Users() {
    const user = JSON.parse(localStorage.getItem('users'));
    const token = user.accessToken;
    const response = await fetch(`${API_URL}/users/top10`, {
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
  }
};
