<template>
    <GoogleMap
      api-key="AIzaSyBrCOmc3Yqq6DK8kBr2O66nt_yvsulC3hw"
      style="width: 100%; height: 500px"
      mapTypeId="hybrid"
      :center="center"
      :zoom="18"
    >
      <!-- <Marker :options="currentPosMarkerOptions" />
      <Marker
        v-for="ecoponto in ecopontos"
        :key="ecoponto.id"
        :options="{
          position: {
            lat: ecoponto.coordenadas.lat,
            lng: ecoponto.coordenadas.lng,
          },
          icon: {
            url: '/src/assets/imgs/iconeEcoponto.png',
            scaledSize: { width: 29, height: 40 },
          },
        }"
      /> -->
    </GoogleMap>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import Vue from "vue";
  import { GoogleMap, Marker } from "vue3-google-map";
  import { ecopointStore } from "../stores/ecopoint";
  
  export default defineComponent({
    components: { GoogleMap, Marker },
    data() {
      return {
        //center: { lat: 41.36611, lng: -8.739542 },
        store: ecopointStore,
        ecopontos: [],
        center: { lat: 0, lng: 0 },
        currentPosMarkerOptions: {
          position: { lat: 0, lng: 0 },
          icon: {
            url: "/src/assets/imgs/locAtual2.png",
            scaledSize: { width: 29, height: 40 },
          },
        },
      };
    },
    mounted() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.currentPosMarkerOptions.position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      } else {
        this.center = { lat: 41.36611, lng: -8.739542 };
        this.currentPosMarkerOptions.position = { lat: 41.36611, lng: -8.739542 };
      }
      this.ecopontos = this.store.ecopoints;
    },
  });
  </script>