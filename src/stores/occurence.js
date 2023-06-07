import { defineStore } from 'pinia';
import { UtilizacoesService } from '../services/utilizacoes.service';

export const occurenceStore = defineStore('occurence', {
  state: () => ({
    occurences: localStorage.occurences 
    ? JSON.parse(localStorage.occurences) 
    : [

    ],
  }),

  getters: {
    getOccurences: (state) => state.occurences,
    },

  actions: {
    /*     setOccurences(occurences) {
          this.occurences = occurences;
        },
    
        //função que altera, na localstoraga, a propriedade isValidate para true
        validateOccurrence(id) {
          const index = this.occurences.findIndex((occurence) => occurence.id === id);
          this.occurences[index].validacao = true;
          localStorage.setItem('occurences', JSON.stringify(this.occurences));
        },
    
        addOccurrence(idEcoponto, idUtilizador, foto) {
          const occurrence = {
            id: this.occurences.length + 1,
            idEcoponto: idEcoponto,
            foto: foto,
            dataUtilizacao: new Date().toLocaleDateString('pt-PT'),
            idUtilizador: idUtilizador,
            validacao: false
          }
          this.occurences.push(occurrence)
          localStorage.setItem('occurences', JSON.stringify(this.occurences))
        },
    
        removeOccurrence(id) {
          const index = this.occurences.findIndex((occurence) => occurence.id === id);
          this.occurences.splice(index, 1);
    
          //atualizar os ids dos elementos do array occurrences na localstorage
          this.occurences.forEach((occurence, index) => {
            occurence.id = index + 1;
          });
          localStorage.setItem('occurences', JSON.stringify(this.occurences));
        },
     */
    async getAllutilizacoes() {
      try {
        const response = await UtilizacoesService.getAllUtilizacoes();
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async validateUtilizacoes(idRegistoUtilizacao) {
      try {
        const response = await UtilizacoesService.validateUtilizacoes(idRegistoUtilizacao);
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
  },
});
