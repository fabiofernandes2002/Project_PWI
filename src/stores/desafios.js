import { defineStore } from 'pinia';

export const desafiosStore = defineStore('desafios', {
    state: () => ({
        desafios: [
            { id: 1, nome: 'Desafio 1', descricao: 'Os três utilizadores que tiveram mais pontos até 25 de Dezembro recebem packs caseiro para fazer a separação dos lixos', recompensa: 'Pack caseiro'},
            { id: 2, nome: 'Desafio 2', descricao: 'Utilize dez ecopontos diferentes durante uma semana', recompensa: 'Mestre da reciclagem'},
            { id: 3, nome: 'Desafio 3', descricao: 'Utilize a aplicação todos os dias durante um mês', recompensa: 'Medalha Mestre da Reciclagem'},
            { id: 4, nome: 'Desafio 4', descricao: 'Registe três novos ecopontos', recompensa: 'Medalha Rei da Reciclagem'},
            { id: 5, nome: 'Desafio 5', descricao: 'Utilize cinco ecopontos perto da sua localização', recompensa: '100 pontos'},
        ]
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
