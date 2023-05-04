import { defineStore } from 'pinia';

export const occurenceStore = defineStore('occurence', {
  state: () => ({
    occurences: [
      {
        id: 1,
        userId: 1,
        idEcopoint: '2',
        useData: '25-01-2023',
        photo: 'https://picsum.photos/200/300',
        creationDate: '25-01-2023',
        isValidated: false,
      },
      {
        id: 2,
        userId: 2,
        idEcopoint: '3',
        useData: '25-01-2023',
        photo: 'https://picsum.photos/200/300',
        creationDate: '25-01-2023',
        isValidated: false,
      },
      {
        id: 3,
        userId: 3,
        idEcopoint: '4',
        useData: '25-01-2023',
        photo: 'https://picsum.photos/200/300',
        creationDate: '25-01-2023',
        isValidated: false,
      },
      {
        id: 4,
        userId: 4,
        idEcopoint: '5',
        useData: '25-01-2023',
        photo: 'https://picsum.photos/200/300',
        creationDate: '25-01-2023',
        isValidated: false,
      },
      {
        id: 5,
        userId: 5,
        idEcopoint: '6',
        useData: '25-01-2023',
        photo: 'https://picsum.photos/200/300',
        creationDate: '25-01-2023',
        isValidated: true,
      },
    ],
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
