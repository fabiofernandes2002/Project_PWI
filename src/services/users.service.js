import API_URL from './config.js';

export const UsersService = {
  async getAllUsers() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
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
      throw Error(response.msg);
    }
  },

  async deleteUser(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      throw Error(response.msg);
    }
  },

  async updateUser(id, data) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
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
        confirmPassword: data.confirmPassword,
      }),
    });
    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      const data = await response.json();
      throw Error(data.msg);
    }
  },

  async getUserById(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data.user;
    } else {
      throw Error(response.msg);
    }
  },

  async getTop10() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
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
      throw Error(data.msg);
    }
  },

  async getUser(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    const response = await fetch(`${API_URL}/users/perfil/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let data = await response.json();
      return data.user;
    } else {
      throw Error(response.msg);
    }
  }
};
