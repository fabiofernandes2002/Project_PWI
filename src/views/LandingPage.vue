<template>
  <div class="mainpage">

    <!------------------- SECTION 1 ----------------->
    <section id="section-1">

      <div class="title">
        <h1>PHOTORECYCLE</h1>
      </div>

      <div class="logo">
      </div>

      <div class="wrap"> <!-- Barra de pesquisa -->
        <div class="search">
          <input type="text" class="searchTerm" placeholder="Insira a localização..." v-model="location">
          <button type="submit" class="searchButton" @click="searchLocation()">
          </button>
        </div>
      </div>

      <div class="location"> <!-- Botão de localização -->
        <button type="submit" class="locationButton" @click="getCurrentLocation()"><span>Utilizar Localização
            Atual</span></button>
      </div>

    </section>

    <!------------------- SECTION 2 ----------------->

    <section id="section-2">

      <div class="title2">
        <h1>O QUE É A RECICLAGEM?</h1>
      </div>

      <div class="line">

        <span class="circle-top">
          <span class="identificacao">1. IDENTIFICAÇÃO</span>
          <span class="ident-text">A primeira etapa da reciclagem já começa antes de os resíduos serem levados para os
            locais apropriados. Além de colocar no sítio correto, é preciso identificar as diferentes características
            dentro do mesmo tipo de resíduos. É preciso ainda verificar se os materiais estão em bom estado para serem
            reciclados.</span>
          <img id="ident-img" src="../assets/imgs/identificacao.webp" alt="Identificação">
        </span>

        <span class="circle-bottom">
          <span class="fornecimento">4. FORNECIMENTO</span>
          <span class="forn-text">
            A etapa final destina-se apenas à pesquisa de potenciais compradores dos produtos transformados pós serem
            reciclados, nomeadamente arquitetos, designers e artistas.
          </span>
          <img id="forn-img" src="../assets/imgs/fornecimento.webp" alt="Fornecimento">
        </span>

        <span class="circle-2">
          <span class="separacao">2. SEPARAÇÃO</span>
          <span class="sep-text">
            Na segunda etapa do processo da reciclagem, os catadores encarregam-se por separar os resíduos que têm
            potencial para reciclagem. Uma tarefa árdua, principalmente pela tentativa de reaproveitamento dos materiais
            misturados com outros.
          </span>
          <img id="sep-img" src="../assets/imgs/separacao.webp" alt="Separação">
        </span>

        <span class="circle-3">
          <span class="descontaminacao">3. DESCONTAMINAÇÃO</span>
          <span class="descont-text">
            Uma tarefa difícil realizada nas cooperativas de catadores, é talvez a mais essencial neste grande processo
            pois determina a qualidade dos materiais recicláveis. Uma etapa desvalorizada e desajudada pois apenas as
            universidades contribuem para o fornecimento de máquinas para esta tarefa.
          </span>
          <img id="descont-img" src="../assets/imgs/descontaminacao.webp" alt="Descontaminação">
        </span>
      </div>
    </section>

    <br>
    <br>

    <!------------------- SECTION 3 ----------------->
    <section id="section-3">
      <div class="title2">
        <h1>COMO RECICLAR?</h1>
      </div>

      <div class="amarelo">
        <b-button v-b-toggle.amarelo-collapse class="btn-amarelo">Ecoponto Amarelo</b-button>
        <b-collapse id="amarelo-collapse" class="mt-2">
          <b-card>
            <div style="float: left; width: 60%;">
              <p class="amarelo-desc" style="text-align: justify;">O contentor das embalagens, onde podem ser colocadas
                todo o tipo de embalagens
                feitas de plástico, metal e pacotes de bebidas.
                Como os ecopontos fazem parte de um sistema chamado SIGRE, tudo o que não seja embalagens, deve então
                deslocar-se a um local apropriado para deixar.</p>
            </div>
            <div style="float: right; width: 40%; margin-top: 30px">
              <img src="../assets/imgs/amarelo.webp" alt="Descrição da imagem" style="width: 100%;">
            </div>
          </b-card>

        </b-collapse>
      </div>

      <div class="azul">
        <b-button v-b-toggle.azul-collapse class="btn-azul">Ecoponto Azul</b-button>
        <b-collapse id="azul-collapse" class="mt-2">
          <b-card>
            <div style="float: left; width: 60%;">
              <p class="azul-desc" style="text-align: justify;">No contentor azul do ecoponto, deve colocar-se tudo o
                que seja de papel ou cartão, desde embalagens, jornais, revistas de papel, etc.
                Uma boa curiosidade desde ecoponto, é que, desde que não estejam contaminadas, todos os materiais aqui
                colocados, podem ser reciclados 7 vezes. </p>
            </div>
            <div style="float: right; width: 40%; margin-top: 30px">
              <img src="../assets/imgs/azul.webp" alt="Descrição da imagem" style="width: 100%;">
            </div>
          </b-card>
        </b-collapse>
      </div>

      <div class="verde">
        <b-button v-b-toggle.verde-collapse class="btn-verde">Ecoponto Verde</b-button>
        <b-collapse id="verde-collapse" class="mt-2">
          <b-card>
            <div style="float: left; width: 60%;">
              <p class="verde-desc" style="text-align: justify;">No contentor azul do ecoponto, deve colocar-se tudo o
                que seja de papel ou cartão, desde embalagens, jornais, revistas de papel, etc.
                Uma boa curiosidade desde ecoponto, é que, desde que não estejam contaminadas, todos os materiais aqui
                colocados, podem ser reciclados 7 vezes. </p>
            </div>
            <div style="float: right; width: 40%; margin-top: 30px">
              <img src="../assets/imgs/verde.webp" alt="Descrição da imagem" style="width: 100%;">
            </div>
          </b-card>
        </b-collapse>
      </div>

      <div class="castanho">
        <b-button v-b-toggle.castanho-collapse class="btn-castanho">Ecoponto Castanho</b-button>
        <b-collapse id="castanho-collapse" class="mt-2">
          <b-card>
            <div style="float: left; width: 60%;">
              <p class="castanho-desc" style="text-align: justify;">No contentor azul do ecoponto, deve colocar-se tudo
                o
                que seja de papel ou cartão, desde embalagens, jornais, revistas de papel, etc.
                Uma boa curiosidade desde ecoponto, é que, desde que não estejam contaminadas, todos os materiais aqui
                colocados, podem ser reciclados 7 vezes. </p>
            </div>
            <div style="float: right; width: 40%; margin-top: 30px">
              <img src="../assets/imgs/castanho.webp" alt="Descrição da imagem" style="width: 100%;">
            </div>
          </b-card>
        </b-collapse>
      </div>

      <div class="vermelho">
        <b-button v-b-toggle.vermelho-collapse class="btn-vermelho">Ecoponto Vermelho (Pilhão)</b-button>
        <b-collapse id="vermelho-collapse" class="mt-2">
          <b-card>
            <div style="float: left; width: 60%;">
              <p class="vermelho-desc" style="text-align: justify;">No contentor azul do ecoponto, deve colocar-se tudo
                o
                que seja de papel ou cartão, desde embalagens, jornais, revistas de papel, etc.
                Uma boa curiosidade desde ecoponto, é que, desde que não estejam contaminadas, todos os materiais aqui
                colocados, podem ser reciclados 7 vezes. </p>
            </div>
            <div style="float: right; width: 40%; margin-top: 30px">
              <img src="../assets/imgs/pilhao.webp" alt="Descrição da imagem" style="width: 100%;">
            </div>
          </b-card>
        </b-collapse>
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
          <a href="#section-1">
            <h1 v-if="this.store.getUserLogged()">
              Olá, {{ this.store.getUserLogged().username }}
            </h1>
            <br>
            <hr>
            <br>
          </a>
          <a href="#section-1">
            <li>Página Inicial</li>
          </a>
          <a href="#section-2">
            <li>O que é a reciclagem?</li>
          </a>
          <a href="#section-3">
            <li>Como Reciclar?</li>
          </a>
          <a href="/mapView">
            <li>Mapa de Ecopontos</li>
          </a>
          <a href="/addEcopoint">
            <li v-if="this.store.getUserLogged()">Adicionar Ecoponto</li>
          </a>
          <a href="/perfil">
            <li v-if="this.store.getUserLogged()">Perfil</li>
          </a>
          <a href="/desafios">
            <li v-if="this.store.getUserLogged()">Desafios</li>
          </a>
          <a href="/ranking">
            <li v-if="this.store.getUserLogged()">Ranking</li>
          </a>
          <hr>
          <br>
          <a href="/login">
            <li v-if="!this.store.getUserLogged()">Iniciar Sessão</li>
          </a>
          <a href="/register">
            <li v-if="!this.store.getUserLogged()">Registar</li>
          </a>
          <a href="/" @click="this.store.logout()">
            <li v-if="this.store.getUserLogged()">Logout</li>
          </a>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { ecopointStore } from '../stores/ecopoint';
import { userStore } from '../stores/user';
import { medalsStore } from '../stores/medals';
import jwtDecode from 'jwt-decode';


export default {
  name: 'LandingPage',
  data() {
    return {
      storeEcopoints: ecopointStore(),
      store: userStore(),
      storeMedals: medalsStore(),
      ecopointsS: [],
      usersS: [],
      loggedUser: false,
      location: '',
      username: '',
    }
  },

  created() {

    localStorage.setItem('ecopoints', JSON.stringify(this.storeEcopoints.ecopoints));
    localStorage.setItem('users', JSON.stringify(this.store.users));
    localStorage.setItem('medals', JSON.stringify(this.storeMedals.medals));
  },


  methods: {

    // logout do utilizador e remover os dados da session storage
    logout() {
      try {
        this.store.logout();
      } catch (error) {
        console.log(error);
      }
    },
    // funçao que pega a localização do utilizador ao clicar no botão utilizar localização atual e mostra no input de pesquisa a localização do utilizador e depois ao pesuisar mostra os ecopontos mais proximos
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.location = position.coords.latitude + ', ' + position.coords.longitude;
      });
      console.log(this.location);


    },

    searchLocation() {

      if (this.location == '') {
        // sweet alert
        this.$swal({
          title: 'Erro!',
          text: 'Por favor, utilize a localização atual para pesquisar os ecopontos mais próximos',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        return;
      }

      this.getCurrentLocation();

      this.$router.push('/mapView');



    },


  },

  computed: {
    getUserLogged() {
      return this.store.getUserLogged;
    },
  },
}
</script>

<style scoped>
@import "../assets/css/index.css";
</style>