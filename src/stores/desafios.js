import { defineStore } from 'pinia';
import { DesafiosService } from '../services/desafios.service';

export const desafiosStore = defineStore('desafios', {
    state: () => ({
        desafios: []
    }),

  getters: {
    getDesafios: (state) => state.desafios,
  },

  actions: {

    async getAllDesafios() {
      try {
        const response = await DesafiosService.getAllDesafios();
        this.setDesafios(response);
      } catch (error) {
        console.log(error);
      }
    },
    setDesafios(desafios) {
      this.desafios = desafios;
    },
  },
});
