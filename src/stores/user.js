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

})
