<template>
    <div class="addEcopoint">

        <div class="add-title">
            <h1>Adicionar Ecoponto</h1>
        </div>

        <div class="display-img">
            <img v-if="imageUrl === null" src="https://dummyimage.com/640x360/fff/aaa" />
            <img v-if="imageUrl" :src="imageUrl" />
        </div>

        <div class="image-submit">
            <input type="file" ref="fileInput" @change="uploadImage" />
        </div>


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
                    <a href="/login" @click="this.store.logout()">
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

export default {
    data() {
        return {
            imageUrl: null,
            storeEcopoints: ecopointStore(),
            store: userStore(),
            ecopointsS: [],
            usersS: [],
            loggedUser: false
        }
    },

    methods: {
        onSubmit(evt) {
            evt.preventDefault()


        },

        uploadImage(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        getUserLogged() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            return user;
        },

        logout() {
            sessionStorage.removeItem('user');
            this.$router.push('/login');
        },
    }
}
</script>
  
<style scoped>
@import "../assets/css/addEcopoint.css";
</style>