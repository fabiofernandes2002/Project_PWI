import { defineStore } from 'pinia'

export const occurenceStore = defineStore('occurence', {
    state: () => ({
        occurences: [
            { userId: 1, idEcopoint, useData, photo, creationDate },
            { userId: 2, idEcopoint, useData, photo, creationDate },
            { userId: 3, idEcopoint, useData, photo, creationDate },
            { userId: 4, idEcopoint, useData, photo, creationDate },
            { userId: 5, idEcopoint, useData, photo, creationDate },
        ]
    }),
})
