// import { ref, computed } from 'vue'
import {defineStore} from 'pinia'
import {EcopontosService} from '../services/ecopontos.service'
import { get } from "mongoose";

export const ecopointStore = defineStore('ecopoint', {
  state: () => ({

    ecopoints: []

  }),

  getters: {
    getEcopoints: (state) => state.ecopoints,

    getEcopointById: (state) => (id) => state.ecopoints.find((ecopoint) => ecopoint.id === id),
  },

  actions: {
    
    async getAllEcopontos() {
      try {
        const response = await EcopontosService.getAllEcopontos();
        this.setEcopoints(response);
      } catch (error) {
        console.log(error);
      }
    },

    setEcopoints(ecopoints) {
      this.ecopoints = ecopoints;
    },

    async getEcopontoById(id) {
      try {
        const response = await EcopontosService.getEcopontoById(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async createEcoponto(ecoponto) {
      try {
        const response = await EcopontosService.createEcoponto(ecoponto);
        if(response.token){
          localStorage.setItem("ecoponto", JSON.stringify(response));
        }
      } catch (error) {
        console.log(error);
      }
    },

    async useEcoponto(id) {
      try {
        const response = await EcopontosService.useEcoponto(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async validateEcoponto(id) {
      try {
        const response = await EcopontosService.validateEcoponto(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteEcopontoById(id) {
      try {
        const response = await EcopontosService.deleteEcopontoById(id);
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    updateLocalStorage() {
      const ecopoints = localStorage.setItem('ecopoints', JSON.stringify(this.ecopoints));
      if (ecopoints) {
        this.setEcopoints = ecopoints;
      }
      
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
