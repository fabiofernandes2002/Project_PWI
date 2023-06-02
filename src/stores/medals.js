import { defineStore } from 'pinia';

export const medalsStore = defineStore('medals', {
   state: () => ({
         medals: [
            {
                id: 1,
                nomeMedalha: 'Medalha de Ouro',
                urlMedalha: '../src/assets/imgs/medal_1.png',
                pontos: 100,
            },
            {
                id: 2,
                nomeMedalha: 'Medalha de Prata',
                urlMedalha: '../src/assets/imgs/medal_2.png',
                pontos: 50,
            },
         ],
    }),

  getters: {
    getMedals: (state) => {
      return state.medals;
    },
  },

  actions: {
    setMedals(medals) {
      this.medals = medals;
    },
  },
});
