import API_URL from "./config";

export const AuthService = {

    async login(user) {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("user", JSON.stringify(data));
                return data;
            } else {
                throw Error(data.msg);
            }
        } else {
            const data = await response.json();
            throw Error(data.msg);
        }
    },

    async registo(user) {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
                confirmPassword: user.confirmPassword,
                email: user.email,
                dataNascimento: user.dataNascimento,
                morada: user.morada,
                localidade: user.localidade,
                codigoPostal: user.codigoPostal,
                tipo: user.tipo,
            }),
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

    async logout() {
        localStorage.removeItem("user");
    },

    async getUserLogged() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    }
};
