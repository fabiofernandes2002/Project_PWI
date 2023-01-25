<template>
    <div class="backgroundFundo">
        <b-container fluid>
            <b-row class="mt-5 ">
                <b-col cols="12 my-3" md="6" class="b-col border-right text-center">

                    <div class="buttons mt-5">
                        <b-col cols="10" md="6" class="text-center mt-3">
                            <!-- Button de gerir ecopontos -->
                            <div class="mt-3">
                                <a href="/gerirEcopontos">
                                    <b-button class="bntEditarPerfil">Gerir Ecopontos</b-button>
                                </a>
                            </div>

                            <!-- Button geris desafios -->
                            <div class="mt-3">
                                <a href="/gerirDesafios">
                                    <b-button class="bntEditarPerfil">Gerir Desafios</b-button>
                                </a>
                            </div>

                            <!-- Button gerir recompensas -->
                            <div class="mt-3">
                                <a href="/gerirRecompensas">
                                    <b-button class="bntEditarPerfil">Gerir Recompensas</b-button>
                                </a>
                            </div>

                            <!-- Button gerir utilizadores -->
                            <div class="mt-3">
                                <a href="/gerirUtilizadores">
                                    <b-button class="bntEditarPerfil">Gerir Utilizadores</b-button>
                                </a>
                            </div>

                        </b-col>
                    </div>

                </b-col>

                <b-col cols="12" md="6" class="logoImage mt-5">
                    <!-- buscar minha imagem do logo -->
                    <b-img src="src/assets/imgs/logo_acabado.png" alt="Logo" id="logo"></b-img>
                    <h1 class="logoName">Photo Recycle</h1>
                    <h3 id="nameAdmin">Administrador</h3>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { userStore } from '../stores/user';
export default {
    data() {
        return {
            store: userStore(),
        }
    },
}
</script>

<style scoped>

.backgroundFundo {
  background-image: url("../assets/imgs/mainbg.svg");
  background-repeat: no-repeat;
  background-size: 1500px 2500px;
  height: 100vh;
  animation: gradient 30s infinite alternate linear;
}

@keyframes gradient {
  100% {
    background-size: 2000px 3000px;
  }
}

.mt-5 {
  margin-top: 0rem !important;

  line-height: 118px;
}
.bntEditarPerfil {
    background-color: #E74C3C;
    color: white;
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Saira Condensed';
    display: flex;
    justify-content: center;
    align-items: center;
}


.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logoName {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;

    /* boldhead font para o logo */
    margin-top: 20px;
    font-family: 'Boldhead';
}

@media (max-width: 576px) {

    #logo {
        margin-right: 10px;
        width: 50px;
    }
}

@media (max-width: 395px) {
    .logoImage {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

.logoImage {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#logo {
    width: 25%;
    height: 35%;
}

.b-col.border-right {
    border-right: 2px solid #F39C12 !important;
}

@media (max-width: 764px) {
    .b-col.border-right {
        border-right: none !important;
        border-bottom: 2px solid #F39C12 !important;
    }
}

#nameAdmin {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 700;
    font-size: 45px;
    line-height: 118px;
    color: #FFFFFF;
}

a{
    text-decoration: none;

}
</style>