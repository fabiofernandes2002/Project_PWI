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
            throw Error(response.message);
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
                throw Error(data.message);
            }
        } else {
            const data = await response.json();
            throw Error(data.message);
        }
    },

    async createEcoponto(ecoponto) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const { latitude, longitude } = await this.getLatitudeLongitude(ecoponto.morada, ecoponto.codigoPostal);
        const response = await fetch(`${API_URL}/ecopontos/adicaoEcoponto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                // criador do ecoponto é o utilizador que está logado
                criador: user.id,
                nome: ecoponto.nome,
                foto: ecoponto.foto,
                morada: ecoponto.morada,
                localizacao: ecoponto.localizacao,
                codigoPostal: ecoponto.codigoPostal,
                dataCriacao: new Date(),
                tipo: ecoponto.tipo,
                latitude: latitude,
                longitude: longitude,
                validacao: false,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data;
            } else {
                throw Error(data.message);
            }
        } else {
            const data = await response.json();
            throw Error(data.message);
        }
    },

    async useEcoponto(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const response = await fetch(`${API_URL}/ecopontos/${id}/use`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                idUtilizador: user.id,
                idEcoponto: ecoponto.id,
                dataUtilizacao: Date.now(),
                foto: ecoponto.foto
            }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data;
            } else {
                throw Error(data.message);
            }
        }

    },

    // validaar o ecoponto (admin) passando o parametro de validação a true
    async validateEcoponto(id) {
        const user = JSON.parse(localStorage.getItem('users'));
        const token = user.token;
        const response = await fetch(`${API_URL}/ecopontos/validacao/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                validacao: true,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data;
            } else {
                throw Error(data.message);
            }
        }   
    },

    async deleteEcopontoById(id) {
        const user = JSON.parse(localStorage.getItem('users'));
        const token = user.token;
        const response = await fetch(`${API_URL}/ecopontos/${id}`, {
            method: 'DELETE',
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
                throw Error(data.message);
            }
        } else {
            const data = await response.json();
            throw Error(data.message);
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