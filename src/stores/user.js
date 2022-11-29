// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
    state: () => ({
        users: [
            { id: 1, userName: 'Admin', email: 'admin@gmail.com', password: 'admin', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 2, userName: 'João', email: 'joão@gmail.com', password: 'joão', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 3, userName: 'Damião', email: 'damião@gmail.com', password: 'damião', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 4, userName: 'Daniel', email: 'daniel@gmail.com', password: 'daniel', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
            { id: 5, userName: 'Tiago', email: 'tiago@gmail.com', password: 'tiago', address: 'Avenida da Republica', location: 'Vila Nova de Gaia', postalCode: '4400-182', photo: 'https://picsum.photos/200/300'},
        ]
    }),

})
