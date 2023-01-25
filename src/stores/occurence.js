import { defineStore } from 'pinia'

export const occurenceStore = defineStore('occurence', {
    state: () => ({
        occurences: [
            { id:1, userId: 1, idEcopoint: '2', useData: '25-01-2023', photo: 'https://picsum.photos/200/300', creationDate: '25-01-2023' },
            { id:2, userId: 2, idEcopoint: '3', useData: '25-01-2023', photo: 'https://picsum.photos/200/300', creationDate: '25-01-2023' },
            { id:3, userId: 3, idEcopoint: '4', useData: '25-01-2023', photo: 'https://picsum.photos/200/300', creationDate: '25-01-2023' },
            { id:4, userId: 4, idEcopoint: '5', useData: '25-01-2023', photo: 'https://picsum.photos/200/300', creationDate: '25-01-2023' },
            { id:5, userId: 5, idEcopoint: '6', useData: '25-01-2023', photo: 'https://picsum.photos/200/300', creationDate: '25-01-2023' },
            
        ]
    }),

    getters: {
        getOccurences: (state) => {
            return state.occurences
        },
    },

    actions: {
        setOccurences(occurences) {
            this.occurences = occurences;
        }

    }
})
