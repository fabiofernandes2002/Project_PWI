<script setup>
import { RouterView } from 'vue-router'
import { userStore } from './stores/user';
import { medalsStore } from './stores/medals'
import { ecopointStore } from './stores/ecopoint';

const store = userStore();

if (localStorage.getItem('usersS')) {
      let usersS = JSON.parse(localStorage.getItem('usersS'));
      store.setUsers(usersS);
}

const storemedals = medalsStore();
if (localStorage.getItem('medals')) {
      let medals = JSON.parse(localStorage.getItem('medals'));
      storemedals.setMedals(medals);
}

const storeecopoint = ecopointStore();
if (localStorage.getItem('ecopointsS')) {
      let ecopointsS = JSON.parse(localStorage.getItem('ecopointsS'));
      storeecopoint.getEcopoints(ecopointsS);
}



</script>

<template>
      <RouterView />
      <!-- <Maps/> -->


</template>
