import API_URL from './config.js';

export const EcopontosService = {
    async getAllEcopontos() {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/ecopontos`, {
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

    async getEcopontoById(id) {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.accessToken;
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
        const token = user.accessToken;
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
                tipo: ecoponto.tipo,
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
        const token = user.accessToken;
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
        const token = user.accessToken;
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
        const token = user.accessToken;
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
    }
};