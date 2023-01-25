// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'



export const ecopointStore = defineStore('ecopoint', { 
  state: () => ({

    ecopoints: [
      
        {id: 1, ecopointName: 'Ecopoint Blue', userCreate: '1', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'Paper', latitude: 41.133333, longitude: -8.616667} ,
        {id: 2, ecopointName: 'Ecopoint Green', userCreate: '2', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'Battery', latitude: 41.362774699560454, longitude: -8.740214109420776},
        {id: 3, ecopointName: 'Ecopoint Yellow', userCreate: '3', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'Plastic', latitude: 41.31776, longitude: -8.67931},
        {id: 4, ecopointName: 'Ecopoint Brown', userCreate: '4', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'Organic', latitude: 41.36581039362086, longitude: -8.74010682106018 },
        {id: 5, ecopointName: 'Ecopoint Black', userCreate: '5', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'Glass', latitude: 41.351730, longitude: -8.747862},

      
    ]

  }),

  getters: {
    getEcopoints: (state) => {
      return state.ecopoints
    }
  },

  actions: {
    setEcopoints(ecopoints) {
      this.ecopoints = ecopoints
    },

    addEcopoint(ecopointName, ecopointLocation, ecopointAddress, latitude, longitude, ecopointType, userCreate, ecopointCreationDate) {
      const ecopoint = {
        id: this.ecopoints.length + 1,
        ecopointName: ecopointName,
        userCreate: userCreate,
        ecopointLocation: ecopointLocation,
        ecopointAddress: ecopointAddress,
        ecopointCreationDate: ecopointCreationDate,
        ecopointType: ecopointType,
        latitude: latitude,
        longitude: longitude,
      }
      this.ecopoints.push(ecopoint)
      localStorage.setItem('ecopoints', JSON.stringify(this.ecopoints))
    },

    deleteEcopoint(id) {
      const index = this.ecopoints.findIndex((ecopoint) => ecopoint.id === id)
      this.ecopoints.splice(index, 1)
      localStorage.setItem('ecopoints', JSON.stringify(this.ecopoints))
    },

    
  }
})