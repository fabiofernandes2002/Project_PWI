<script setup>
import { RouterView } from 'vue-router'
import { userStore } from './stores/user';
import { medalsStore } from './stores/medals'
import { ecopointStore } from './stores/ecopoint';

const store = userStore();

if (localStorage.getItem('users')) {
      let users = JSON.parse(localStorage.getItem('users'));
      store.setUsers(users);
}

const storemedals = medalsStore();
if (localStorage.getItem('medals')) {
      let medals = JSON.parse(localStorage.getItem('medals'));
      storemedals.setMedals(medals);
}

const storeecopoint = ecopointStore();
if (localStorage.getItem('ecopoints')) {
      let ecopoints = JSON.parse(localStorage.getItem('ecopoints'));
      storeecopoint.setEcopoints(ecopoints);
}



</script>

<template>
      <RouterView />
      <!-- <Maps/> -->


</template>
