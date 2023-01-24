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
                    <a href="/perfil">
                        <h1 v-if="getUserLogged()">
                            Olá, {{ getUserLogged().username }}
                        </h1>
                    </a>
                    <br>
                    <hr>
                    <br>
                    <a href="/">
                        <li>Página Inicial</li>
                    </a>
                    <a href="/addEcopoint">
                        <li>Adicionar Ecoponto</li>
                    </a>
                    <a href="/perfil">
                        <li v-if="getUserLogged()">Perfil</li>
                    </a>
                    <a href="/desafios">
                        <li v-if="getUserLogged()">Desafios</li>
                    </a>
                    <a href="/ranking">
                        <li v-if="getUserLogged()">Ranking</li>
                    </a>
                    <br>
                    <hr>
                    <br>
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