<template>
  <div class="mainpage">
    <section id="section-1">

      <!-- TÍTULO -->
      <div class="title">
        <h1>PHOTORECYCLE</h1>
      </div>

      <!-- LOGO -->
      <div class="logo">
      </div>

      <!-- BARRA DE PESQUISA -->
      <div class="wrap">
        <div class="search">
          <input type="text" class="searchTerm" placeholder="Insira a localização...">
          <button type="submit" class="searchButton">
          </button>
        </div>
      </div>

      <!-- BOTÃO DE LOCALIZAÇÃO -->
      <div class="location">
        <button type="submit" class="locationButton"><span>Utilizar Localização Atual</span></button>
      </div>

    </section>

    <section id="section-2">
      <div class="title2">
        <h1>O QUE É A RECICLAGEM?</h1>
      </div>
      <div class="line">
        <span class="circle-top"></span>
        <span class="circle-bottom"></span>
        <span class="circle-2"></span>
        <span class="circle-3"></span>
      </div>
    </section>

    <section id="section-3">
      <div class="title2">
        <h1>MAPA DE ECOPONTOS</h1>
      </div>
    </section>

    <section id="section-4">
      <div class="title2">
        <h1>LEADERBOARD</h1>
      </div>
    </section>

    <!-- MENU LATERAL -->
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <!-- pegar no nome do utilizador logado -->
          <a href="#section-1">
            <h1 v-if="getUserLogged()">
              Olá {{ getUserLogged().username }},
            </h1>
          </a>
          <a href="#section-1">
            <li>Página Inicial</li>
          </a>
          <a href="#section-2">
            <li>O que é a reciclagem?</li>
          </a>
          <a href="#section-3">
            <li>Mapa de Ecopontos</li>
          </a>
          <a href="#section-4">
            <li>Leaderboard</li>
          </a>
          <!-- carregar no link e fazer logout -->
          <a href="/login" @click="logout">
            <li v-if="getUserLogged()">Logout</li>
          </a>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { ecopointStore } from '../stores/ecopoint';
import { userStore } from '../stores/user';


export default {
  name: 'LandingPage',
  data() {
    return {
      storeEcopoints: ecopointStore(),
      storeUsers: userStore(),
      ecopoints: [],
      users: [],
    }
  },

  created() {

    this.ecopoints = this.storeEcopoints.ecopoints;
    this.users = this.storeUsers.users;

    localStorage.setItem('ecopoints', JSON.stringify(this.ecopoints));
    //localStorage.setItem('users', JSON.stringify(this.users));
  },

  methods: {
    getUserLogged() {
      const user = JSON.parse(sessionStorage.getItem('user'));
      return user;
      

    },

    // logout do utilizador e remover os dados da session storage
    logout() {
      sessionStorage.removeItem('user');
      //localStorage.removeItem('user');
      this.$router.push('/login');
    },

  },
}
</script>

<style scoped>
@import "../assets/css/index.css";
</style>