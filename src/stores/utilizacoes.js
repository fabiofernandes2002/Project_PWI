import { defineStore } from 'pinia';
import { UtilizacoesService } from '../services/utilizacoes.service';

export const utilizacaoStore = defineStore('utilizacao', {
  state: () => ({
    utilizacoes: []
  }),

  getters: {
    getUtilizacoes: (state) => state.utilizacoes,
    getUtilizacaoById: (state) => (id) => state.utilizacoes.find((utilizacao) => utilizacao._id === id),
  },

  actions: {
    async getAllUtilizacoes() {
      try {
        const response = await UtilizacoesService.getAllUtilizacoes();
        this.setUtilizacoes(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    setUtilizacoes(utilizacoes) {
      this.utilizacoes = utilizacoes;
    },

    async validateUtilizacoes(idRegistoUtilizacao, data) {
      try {
        const response = await UtilizacoesService.validateUtilizacoes(idRegistoUtilizacao, data);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUtilizacoesById(idRegistoUtilizacao) {
      try{
        const response = await UtilizacoesService.deleteUtilizacoesById(idRegistoUtilizacao);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async createUtilizacao(utilizacao) {
      try {
        const response = await UtilizacoesService.createUtilizacao(utilizacao);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  },
});
