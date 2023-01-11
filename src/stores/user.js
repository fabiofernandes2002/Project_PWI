// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {router} from '../router';

export const userStore = defineStore('user', {
    state: () => ({
        users: [
            { id: 1, username: 'Admin', email: 'admin@gmail.com', datanascimento: '12-01-2002', password: 'admin', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300', pontos: 10, medals: [], nºUtilizaçao: 2, desafios: [], ranking: 1, diaSemana: 'Segunda-Feira'},
            { id: 2, username: 'João', email: 'joão@gmail.com', datanascimento: '12-01-2002', password: 'joão', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300', pontos: 15, medals: [], nºUtilizaçao: 2, desafios: [], ranking: 2, diaSemana: 'Segunda-Feira'},
            { id: 3, username: 'Damião', email: 'damião@gmail.com', datanascimento: '12-01-2002', password: 'damião', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300', pontos: 20, medals: [], nºUtilizaçao: 2, desafios: [], ranking: 3, diaSemana: 'Segunda-Feira'},
            { id: 4, username: 'Daniel', email: 'daniel@gmail.com', datanascimento: '12-01-2002', password: 'daniel', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300' , pontos: 50, medals: [], nºUtilizaçao: 2, desafios: [], ranking: 4, diaSemana: 'Segunda-Feira'},
            { id: 5, username: 'Tiago', email: 'tiago@gmail.com', datanascimento: '12-01-2002', password: 'tiago', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300' , pontos: 35, medals: [1,2], nºUtilizaçao: 2, desafios: [], ranking: 5, diaSemana: 'Segunda-Feira'},
            { id: 6, username: 'Rui', email: 'rui@gmail.com', datanascimento: '12-01-2002', password: 'tiago', morada: 'Avenida da Republica', localidade: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300' , pontos: 35, medals: [1,2], nºUtilizaçao: 2, desafios: [], ranking: 5, diaSemana: 'Segunda-Feira'},
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
            const user = this.users.find(user => user.email === email && user.password === password);
            if (user) {
                alert('Login efetuado com sucesso');
                router.push('/landingPage');

                sessionStorage.setItem('user', JSON.stringify(user));
                return user;
            }else{
                alert('Dados incorretos');
            }

            
        },

        // registar o user
        register(username, email, password, confirmarpassword, datanascimento, morada, localidade, postalCode) {
            this.users.push({
                id: this.getNewId,
                username: username,
                email: email,
                password: password,
                confirmarpassword: confirmarpassword,
                datanascimento: datanascimento,
                morada: morada,
                localidade: localidade,
                postalCode: postalCode,
                photo: '',
                pontos: 0,
                medals: [],
                nºUtilizaçao: 0,
                desafios: [],
                diaSemana: '',
                ranking: 0,

            });
            localStorage.setItem('users', JSON.stringify(this.users));
            alert('Registo efetuado com sucesso');
            router.push('/login');
            
            


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
