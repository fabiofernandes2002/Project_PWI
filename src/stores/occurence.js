import { defineStore } from 'pinia'

export const occurenceStore = defineStore('occurence', {
    state: () => ({
        occurences: [
            { userId: 1, userEcopointCreationDateTime: '2021-01-01 13:40', photo: 'https://picsum.photos/200/300' },
            { userId: 2, userEcopointCreationDateTime: '2021-01-01 13:40', photo: 'https://picsum.photos/200/300' },
            { userId: 3, userEcopointCreationDateTime: '2021-01-01 13:40', photo: 'https://picsum.photos/200/300' },
        ]
    }),
})
