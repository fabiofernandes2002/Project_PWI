import API_URL from "./config";

export const UtilizacoesService = {
    async getAllUtilizacoes() {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        const response = await fetch(`${API_URL}/utilizacoes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Log da resposta da API
          if (data) {
            console.log("Registo de Utilização:", data.registoUtilizacao); // Log dos dados de utilização
            return data.registoUtilizacao;
          } else {
            throw Error(data.msg);
          }
        } else {
          console.log("API Error:", response.status); // Log do status de erro da API
          throw Error("Erro na chamada à API");
        }
      },
      

    async validateUtilizacoes(idRegistoUtilizacao, data) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        const response = await fetch(`${API_URL}/utilizacoes/validacao/${idRegistoUtilizacao}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                validacao: data.validacao,
            }),
        });
        if (response.ok) {
            const responseData = await response.json();
            // Verificar se a resposta contém dados válidos
            if (responseData && responseData.success) {
              // Realizar ação adicional, se necessário
              return responseData;
            } else {
              throw new Error(responseData.msg || "Ocorreu um erro ao validar a utilização.");
            }
        } else {
            // Lidar com erros de requisição não bem-sucedida
            throw new Error("Ocorreu um erro ao fazer a solicitação.");
        }
    },

    async deleteUtilizacoesById(idRegistoUtilizacao) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        const response = await fetch(`${API_URL}/utilizacoes/${idRegistoUtilizacao}`, {
            method: "DELETE",
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
                throw Error(data.msg);
            }
        } else {
            const data = await response.json();
            throw Error(data.msg);
        }
    },

    async createUtilizacao(utilizacao) {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user.token;
        /* const currentDate = new Date();
        const options = { timeZone: 'Europe/Lisbon' };
        const formattedDate = currentDate.toLocaleString('pt-PT', options); */
        //const response = await fetch(`http://127.0.0.1:3000/utilizacoes`, {
        const response = await fetch(`${API_URL}/utilizacoes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                idUtilizador: utilizacao.idUtilizador,
                idEcoponto: utilizacao.idEcoponto,
                dataUtilizacao: utilizacao.dataUtilizacao,
                foto: utilizacao.foto,
                validacao: false,

            }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return data.utilizacao;
            } else {
                throw Error(data.msg);
            }
        } else {
            const data = await response.json();
            throw Error(data.msg);
        }
    }
};