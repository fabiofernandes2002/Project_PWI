<template>
    <div class="backgroundFundo">
        <b-container fluid>
            <div class="adminMain">

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

                                <!-- Button registo de utilização -->
                                <div class="mt-3">
                                    <a href="/registoUtilizacao">
                                        <b-button class="bntEditarPerfil">Registo de Utilização</b-button>
                                    </a>
                                </div>

                                <!-- Button registo de adição de ecopontos -->
                                <div class="mt-3">
                                    <a href="/registoAdicaoEcoponto">
                                        <b-button class="bntEditarPerfil">Registo de Adição de Ecopontos</b-button>
                                    </a>
                                </div>

                            </b-col>
                        </div>

                    </b-col>

                    <b-col cols="12" md="6" class="logoImage mt-5">
                        <!-- buscar minha imagem do logo -->
                        <b-img src="src/assets/imgs/logo_acabado.webp" alt="Logo" id="logo"></b-img>
                        <h1 class="logoName">Photo Recycle</h1>
                        <h3 id="nameAdmin">Administrador</h3>
                    </b-col>
                </b-row>
            </div>

            <!-- MENU LATERAL DE ADMINISTRADOR -->
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <a href="/perfil">
                            <h1 v-if="!this.store.getUserLogged">
                                Olá, {{ this.store.getUserLogged.username }}
                            </h1>
                        </a>
                        <br>
                        <hr>
                        <br>
                        <a href="/admin">
                            <li>Página Principal Admin</li>
                        </a>
                        <a href="/addEcopoint">
                            <li>Gerir Ecopontos</li>
                        </a>
                        <a href="/gerirUtilizadores">
                            <li>Gerir Desafios</li>
                        </a>
                        <a href="/desafios">
                            <li>Gerir Recompensas</li>
                        </a>
                        <a href="/ranking">
                            <li>Gerir Utilizadores</li>
                        </a>
                        <br>
                        <hr>
                        <br>
                        <a href="/">
                            <li>Página Inicial da App</li>
                        </a>
                        <a href="/login" @click="logout">
                            <li v-if="!this.store.getUserLogged">Logout</li>
                        </a>
                    </ul>
                </div>
            </nav>

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
    background-image: url("../assets/imgs/adminBG.svg");
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    height: 100vh;
    animation: gradient 80s infinite alternate linear;
}

@keyframes gradient {
    100% {
        background-size: 3000px 2000px;
    }
}

.adminMain {
    transform: translateY(50%);
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
    padding: 10px;
}

.btn {
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

.btn:hover {
    background-color: #f39c12;
    transition: all 0.3s ease;
    transform: scale(1.1);
}

.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
}

.logoName {
    font-size: 2.5rem;
    font-weight: 700;
    color: #f39c12;

    /* boldhead font para o logo */
    margin-top: 20px;
    padding: 20px;
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
    width: 30%;
    height: 40%;
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

a:hover {
    text-decoration: none;
}

/* MENU LATERAL */
#menuToggle {
    display: block;
    position: fixed;
    top: 6vh;
    left: 96vw;
    z-index: 1;

    user-select: none;
}

#menuToggle a {
    font-family: "Saira Condensed";
    text-decoration: none;
    color: #232323;

    transition: color 0.3s ease;
}

#menuToggle a:hover {
    color: #2ecc71;
}

#menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
}

/* HAMBURGER */
#menuToggle span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #f39c12;
    border-radius: 3px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

#menuToggle span:first-child {
    transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
}

#menuToggle input:checked~span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
}

#menuToggle input:checked~span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked~span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
}

/* POSIÇÃO DO MENU */
#menu {
    position: absolute;
    width: 350px;
    margin: -100px 0 0 0;
    padding: 50px;
    padding-top: 150px;
    padding-bottom: 520px;
    right: -50px;
    background: #ededed;
    list-style-type: none;
    transform-origin: 0% 0%;
    transform: translate(100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
}

#menu li {
    padding: 10px 0;
    font-size: 22px;
}

#menuToggle input:checked~ul {
    transform: none;
    opacity: 1;
}
</style>