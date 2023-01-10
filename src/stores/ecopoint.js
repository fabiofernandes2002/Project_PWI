// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'



export const ecopointStore = defineStore('ecopoint', { 
  state: () => ({

    ecopoints: [
      {
        id: 1, ecopointName: 'Ecopoint Blue', userCreate: '1', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'paper', 
        id: 2, ecopointName: 'Ecopoint Green', userCreate: '2', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'battery',
        id: 3, ecopointName: 'Ecopoint Yellow', userCreate: '3', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'plastic',
        id: 4, ecopointName: 'Ecopoint Brown', userCreate: '4', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'organic',
        id: 5, ecopointName: 'Ecopoint Black', userCreate: '5', ecopointLocation: 'Vila Nova de Gaia', ecopointAddress: 'Avenida da Republica', ecopointCreationDate: '2021-01-01', ecopointStatus: 'active', ecopointType: 'glass',

      },
    ]

  }),

  getters: {
    getEcopoints: (state) => {
      return state.ecopoints
    }
  },
})