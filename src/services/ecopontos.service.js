import API_URL from './config.js';

export const EcopontosService = {
    async getAllEcopontos() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const response = await fetch(`${API_URL}/ecopontos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data.ecopontos;
          } else {
            throw Error(data.msg);
        }
    },

    async getEcopontoById(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const response = await fetch(`${API_URL}/ecopontos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data;
            } else {
                throw Error(data.msg);
            }
        } else {
            const data = await response.json();
            throw Error(data.msg);
        }
    },

    async createEcoponto(formData) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        /* const { latitude, longitude } = await this.getLatitudeLongitude(ecoponto.morada, ecoponto.codigoPostal);
        const currentDate = new Date();
        const options = { timeZone: 'Europe/Lisbon' };
        const formattedDate = currentDate.toLocaleString('pt-PT', options); */
        //const validacao = user.tipo === 'admin' ? true : false;
        const response = await fetch(`http://127.0.0.1:3000/ecopontos/adicaoEcoponto`, {
        //const response = await fetch(`${API_URL}/ecopontos/adicaoEcoponto`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
        if (response.ok) {
            let data = await response.json();
            return data;
          } else {
            throw Error(data.msg);
        }
    },

    async useEcoponto(id, formData) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        /* const currentDate = new Date();
        const options = { timeZone: 'Europe/Lisbon' };
        const formattedDate = currentDate.toLocaleString('pt-PT', options); */

        //const response = await fetch(`${API_URL}/ecopontos/use/${id}`, {
        const response = await fetch(`http://127.0.0.1:3000/ecopontos/use/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data;
            } else {
                throw Error(data.msg);
            }
        }

    },

    // validaar o ecoponto (admin) passando o parametro de validação a true
    async validateEcoponto(id, data) {
        const user = JSON.parse(localStorage.getItem('users'));
        const token = user.token;
        const response = await fetch(`http://127.0.0.1:3000/ecopontos/validacao/${id}`, {
        //const response = await fetch(`${API_URL}/ecopontos/validacao/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                validacao: data.validacao,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data;
            } else {
                throw Error(data.msg);
            }
        }   
    },

    async deleteEcopontoById(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const response = await fetch(`${API_URL}/ecopontos/${id}`, {
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
            throw Error(data.msg);
            
          }
    },

    async getLatitudeLongitude(morada, codigoPostal) {
        const url = `https://nominatim.openstreetmap.org/search?street=${morada}&postalcode=${codigoPostal}&format=json&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        this.latitude = data[0].lat;
        this.longitude = data[0].lon;
        return {
          latitude: this.latitude,
          longitude: this.longitude
        };
    },
};