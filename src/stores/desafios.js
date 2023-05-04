import { defineStore } from 'pinia';

export const desafiosStore = defineStore('desafios', {
  state: () => ({
    desafios: [
      {
        id: 1,
        idEcopoint: '2',
        name: 'Desafio 1',
        description:
          'Os três utilizadores que tiveram mais pontos até 25 de Dezembro recebem packs caseiro para fazer a separação dos lixos',
      },
      {
        id: 2,
        idEcopoint: '3',
        name: 'Desafio 2',
        description: 'Utilize dez ecopontos diferentes durante uma semana',
      },
      {
        id: 3,
        idEcopoint: '4',
        name: 'Desafio 3',
        description: 'Utilize a aplicação todos os dias durante um mês',
      },
      { id: 4, idEcopoint: '5', name: 'Desafio 4', description: 'Registe três novos ecopontos' },
      {
        id: 5,
        idEcopoint: '6',
        name: 'Desafio 5',
        description: 'Utilize cinco ecopontos perto da sua localização',
      },
    ],
  }),

  getters: {
    getDesafios: (state) => {
      return state.desafios;
    },
  },

  actions: {
    setDesafios(desafios) {
      this.desafios = desafios;
    },
  },
});
