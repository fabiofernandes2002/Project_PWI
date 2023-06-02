// import { ref, computed } from 'vue'
import {defineStore} from 'pinia'

export const ecopointStore = defineStore('ecopoint', {
  state: () => ({

    ecopoints: [{
        id: 1,
        foto: 'https://picsum.photos/200/300',
        criador: '1',
        nome: 'Ecoponto Azul',
        localizacao: 'Vila Nova de Gaia',
        morada: 'Avenida da Republica',
        codigoPostal: '4400-182',
        dataCriacao: '2021-01-01',
        tipo: 'Papel',
        latitude: 41.133333,
        longitude: -8.616667,
        validacao: true
      },
      {
        id: 2,
        foto: 'https://picsum.photos/200/300',
        criador: '1',
        nome: 'Ecoponto Verde',
        localizacao: 'Vila Nova de Gaia',
        morada: 'Avenida da Republica',
        codigoPostal: '4400-182',
        dataCriacao: '2021-01-01',
        tipo: 'Vidro',
        latitude: 41.362774699560454,
        longitude: -8.740214109420776,
        validacao: true
      },
      {
        id: 3,
        foto: 'https://picsum.photos/200/300',
        criador: '1',
        nome: 'Ecoponto Amarelo',
        localizacao: 'Vila Nova de Gaia',
        morada: 'Avenida da Republica',
        codigoPostal: '4400-182',
        dataCriacao: '2021-01-01',
        tipo: 'Plastico',
        latitude: 41.31776,
        longitude: -8.67931,
        validacao: true
      },
      {
        id: 4,
        foto: 'https://picsum.photos/200/300',
        criador: '1',
        nome: 'Ecoponto Castanho',
        localizacao: 'Vila Nova de Gaia',
        morada: 'Avenida da Republica',
        codigoPostal: '4400-182',
        dataCriacao: '2021-01-01',
        tipo: 'Organico',
        latitude: 41.36581039362086,
        longitude: -8.74010682106018,
        validacao: true
      },
      {
        id: 5,
        foto: 'https://picsum.photos/200/300',
        criador: '1',
        nome: 'Ecoponto Vermelho',
        localizacao: 'Vila Nova de Gaia',
        morada: 'Avenida da Republica',
        codigoPostal: '4400-182',
        dataCriacao: '2021-01-01',
        tipo: 'Pilhas',
        latitude: 41.351730,
        longitude: -8.747862,
        validacao: true
      }
    ]

  }),

  getters: {
    getEcopoints: (state) => {
      return state.ecopoints;
    },

    getEcopointById: (state) => (id) => state.ecopoints.find((ecopoint) => ecopoint.id === id),
  },

  actions: {
    setEcopoints(ecopoints) {
      this.ecopoints = ecopoints;
    },

    async addEcopoint(foto, nome, criador, localizacao, morada, codigoPostal, tipo) {
      const { latitude, longitude } = await this.getLatitudeLongitude(morada, codigoPostal);
      const ecopoint = {
        id: this.ecopoints.length + 1,
        foto: foto,
        criador: criador,
        nome: nome,
        localizacao: localizacao,
        morada: morada,
        codigoPostal: codigoPostal,
        dataCriacao: new Date().toLocaleDateString('pt-PT'),
        tipo: tipo,
        latitude: latitude,
        longitude: longitude,
        validacao: false
      }
      this.ecopoints.push(ecopoint)
      localStorage.setItem('ecopoints', JSON.stringify(this.ecopoints))
    },

    // funcao que a partir da localizacao e codigo postal, retorna a latitude e longitude
    async getLatitudeLongitude(morada, codigoPostal) {
      const url = `https://nominatim.openstreetmap.org/search?street=${morada}&postalcode=${codigoPostal}&format=json&limit=1`;
      const response = await fetch(url);
      const data = await response.json();
      this.latitude = data[0].lat;
      this.longitude = data[0].lon;
      return {
        latitude: this.latitude,
        longitude: this.longitude
      }
    },

    // VALIDAR ECOPONTO
    validarEcoponto(id) {
      const index = this.ecopoints.findIndex((ecopoint) => ecopoint.id === id)
      this.ecopoints[index].validacao = true
      localStorage.setItem('ecopoints', JSON.stringify(this.ecopoints))
    },

    deleteEcopoint(id) {
      const index = this.ecopoints.findIndex((ecopoint) => ecopoint.id === id);
      this.ecopoints.splice(index, 1);
      localStorage.setItem('ecopoints', JSON.stringify(this.ecopoints));
    },

  }
})
