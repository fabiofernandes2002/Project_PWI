import { defineStore } from 'pinia';

export const occurenceStore = defineStore('occurence', {
    state: () => ({
        occurences: [
            { id:1, idUtilizador: 1, idEcoponto: '2', foto: 'https://picsum.photos/200/300', dataUtilizacao: '25-01-2023' , validacao: false},
            { id:2, idUtilizador: 2, idEcoponto: '3', foto: 'https://picsum.photos/200/300', dataUtilizacao: '25-01-2023' , validacao: false},
            { id:3, idUtilizador: 3, idEcoponto: '4', foto: 'https://picsum.photos/200/300', dataUtilizacao: '25-01-2023' , validacao: false},
            { id:4, idUtilizador: 4, idEcoponto: '5', foto: 'https://picsum.photos/200/300', dataUtilizacao: '25-01-2023', validacao: false },
            { id:5, idUtilizador: 5, idEcoponto: '6', foto: 'https://picsum.photos/200/300', dataUtilizacao: '25-01-2023', validacao: true },
            
        ]
    }),

  getters: {
    getOccurences: (state) => {
      return state.occurences;
    },
  },

  actions: {
    setOccurences(occurences) {
      this.occurences = occurences;
    },

<<<<<<< HEAD
    actions: {
        setOccurences(occurences) {
            this.occurences = occurences;
        },
        
        //função que altera, na localstoraga, a propriedade isValidate para true
        validateOccurrence(id){
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
=======
    //função que altera, na localstoraga, a propriedade isValidate para true
    validateOccurrence(id) {
      const index = this.occurences.findIndex((occurence) => occurence.id === id);
      this.occurences[index].isValidated = true;
      localStorage.setItem('occurences', JSON.stringify(this.occurences));
    },

    addOccurrence(idEcopoint, idUser, imageUrl) {
      const occurrence = {
        id: this.occurences.length + 1,
        creationDate: new Date().toLocaleDateString('pt-PT'),
        idEcopoint: idEcopoint,
        photo: imageUrl,
        useData: new Date().toLocaleDateString('pt-PT'),
        userId: idUser,
        isValidated: false,
      };
      this.occurences.push(occurrence);
      localStorage.setItem('occurences', JSON.stringify(this.occurences));
    },
>>>>>>> fc14c4aa6d550d5889f6c9b5d7d907bf23131775

    removeOccurrence(id) {
      const index = this.occurences.findIndex((occurence) => occurence.id === id);
      this.occurences.splice(index, 1);

      //atualizar os ids dos elementos do array occurrences na localstorage
      this.occurences.forEach((occurence, index) => {
        occurence.id = index + 1;
      });
      localStorage.setItem('occurences', JSON.stringify(this.occurences));
    },
  },
});
