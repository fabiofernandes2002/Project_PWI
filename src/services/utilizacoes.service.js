import API_URL from "./config";

export const UtilizacoesService = {
    async getAllUtilizacoes() {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/registoUtilizacao`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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
        }
    },

    async validateUtilizacoes(idRegistoUtilizacao) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.accessToken;
        const response = await fetch(`${API_URL}/registoUtilizacao/validacao/${idRegistoUtilizacao}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
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
    }
};