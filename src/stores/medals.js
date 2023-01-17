import { defineStore } from 'pinia'

export const medalsStore = defineStore('medals', {
   state: () => ({
         medals: [
            {
                idMedal: 1,
                medalName: 'Medalha de Ouro',
                urlMedal: '../src/assets/imgs/medal_1.png',
                pontos: 100,
            },
            {
                idMedal: 2,
                medalName: 'Medalha de Prata',
                urlMedal: '../src/assets/imgs/medal_2.png',
                pontos: 50,
            },
         ],
    }),

    getters: {
        getMedals: (state) => {
            return state.medals
        },
    },

    actions: {
        setMedals(medals) {
            this.medals = medals;
        }

    }
})
