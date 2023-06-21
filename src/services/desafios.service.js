import API_URL from './config.js';

export const DesafiosService = {
    async getAllDesafios() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const response = await fetch(`${API_URL}/desafios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data.data;
          } else {
            throw Error(data.message);
        }
    },
}