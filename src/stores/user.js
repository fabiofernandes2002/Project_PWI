// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
    state: () => ({
        users: [
            { id: 1, username: 'Admin', email: 'admin@gmail.com', password: 'admin', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 2, username: 'João', email: 'joão@gmail.com', password: 'joão', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 3, username: 'Damião', email: 'damião@gmail.com', password: 'damião', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 4, username: 'Daniel', email: 'daniel@gmail.com', password: 'daniel', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 5, username: 'Tiago', email: 'tiago@gmail.com', password: 'tiago', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
        ]
    }),

    getters: {
        
        getUsers:(state) => {
            return state.users
        },

        // auto increment id quando registar um novo user
        getNewId() {
            const lastUser = this.state.users[this.state.users.length - 1];
            return lastUser ? lastUser.id + 1 : 1;
        },

    },

    actions: {
        // login do user
        login(email, password) {
            const user = this.state.users.find(user => user.email === email && user.password === password);
            if (user) {
                alert('Login efetuado com sucesso');
                this.$router.push('/LandingPage');

                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }else{
                alert('Dados incorretos');
            }

            
        },

        // registar o user
        register(username, email, password, address, location, postalCode, photo) {
            const user = {
                id: this.getNewId,
                username,
                email,
                password,
                address,
                location,
                postalCode,
                photo
            };
            this.state.users.push(user);
            localStorage.setItem('user', JSON.stringify(user));


        },

        // logout do user da aplicação e limpar da session storage
        logout() {
            sessionStorage.removeItem('user');
        },

        // verificar se o user está logado
        isLoggedIn() {
            const user = JSON.parse(localStorage.getItem('user'));
            return user ? true : false;
        },


    }

})
