<template>
    <div class="edit-profile">
        <b-container fluid>
            <b-row>
                <b-col cols="12">
                    <div class="mt-5">
                        <h1 id="title" class="text-center">Perfil de Utilizador</h1>
                    </div>
                </b-col>
            </b-row>

            <b-row class="mt-5">
                <b-col cols="12 my-3" md="6" class="mt-5" style="text-align:center; padding-top: 5vh;">
                    <div class="ml-5">
                        <!-- Apresentar foto do user e se não tiver mostrar só o avatar -->
                        <b-avatar v-if="this.store.getUserLogged().photo" :src="this.store.getUserLogged().photo"
                            size="150px"></b-avatar>
                        <!-- else mostrar só o avatar -->
                        <b-avatar v-else size="150px"></b-avatar>
                    </div>
                    <div class="mt-3 ml-5 mb-3">
                        <a href="/editPerfil">
                            <b-button pill class="bntEditarPerfil">Editar Perfil</b-button>
                        </a>
                    </div>

                    <!-- Nome de utilizador -->
                    <div>
                        <h3 id="NameUser">Nome de Utilizador: <span id="userLogged">{{
                            this.store.getUserLogged().username
                        }}</span></h3>
                    </div>

                    <!-- Email -->
                    <div>
                        <h3 id="EmailUser">Email: <span id="userLoggedEmail">{{
                            this.store.getUserLogged().email
                        }}</span></h3>
                    </div>

                    <!-- Data de Nascimento -->
                    <div>
                        <h3 id="dataNascimentoUser">Data de Nascimento: <span id="userLoggedData">{{
                            this.store.getUserLogged().datanascimento
                        }}</span></h3>
                    </div>

                    <!-- Morada -->
                    <div>
                        <h3 id="MoradaUser">Morada: <span id="userLoggedMorada">{{
                            this.store.getUserLogged().morada
                        }}</span></h3>
                    </div>

                    <!-- Localidade -->
                    <div>
                        <h3 id="LocalidadeUser">Localidade: <span id="userLoggedLocalidade">{{
                            this.store.getUserLogged().localidade
                        }}</span></h3>
                    </div>

                </b-col>

                <b-col cols="12" md="6" class="mt-5" style="right: 7vw; text-align: center;">
                    <div class="divdata">
                        <div>
                            <h3 id="pontos">Pontos: <span>{{ this.store.getUserLogged().pontos }} xp</span></h3>
                        </div>
                        <div>
                            <h3 id="ranking">Ocupação no Ranking: <span>{{ this.position }}º
                                    classificado</span></h3>
                        </div>
                        <div>
                            <h3 id="semana">Dia de semana mais frequente: <span>{{
                                this.store.getUserLogged().diaSemana
                            }}</span>
                            </h3>
                        </div>
                    </div>

                    <div class="medals">
                        <div class="text-center">
                            <h1 id="medalTitle">Medalhas</h1>
                        </div>
                        <div>
                            <!-- mostrar um paragrafo a dizer nã tens medalha o v-else -->
                            <p class="text-center" id="NaoTemMedalhas" v-if="medals.length === 0">Não tens medalhas</p>
                            <!-- Apresentar as medalhas a partir da minha storemedals -->
                            <b-row class="text-center">
                                <b-col cols="12" md="6" class="mt-5" v-for="medal in medals" :key="medal.idMedal"
                                    v-if="medals.length > 0">
                                    <div>
                                        <b-img rounded="circle" v-bind:src="medal.urlMedal" width="150px"
                                            alt="Circle image"></b-img>
                                    </div>
                                </b-col>
                            </b-row>

                        </div>
                    </div>
                </b-col>

                <!-- botão de ver ranking que fica a direita -->

                <b-col cols="12" class="btn" style="right: 8vw;">
                    <div class="mt-5 mb-5">
                        <a href="/ranking">
                            <b-button pill class="bntVerRanking">Ver Ranking</b-button>
                        </a>
                    </div>
                </b-col>
            </b-row>

        </b-container>

        <!-- MENU LATERAL -->
        <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>

                <ul id="menu">
                    <a href="/perfil">
                        <h1 v-if="this.store.getUserLogged()">
                            Olá, {{ this.store.getUserLogged().username }}
                        </h1>
                        <br>
                        <hr>
                        <br>
                    </a>
                    <a href="/">
                        <li>Página Inicial</li>
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
import { userStore } from '../stores/user';
import { medalsStore } from '../stores/medals'
export default {
    name: 'PerfilView',

    data() {
        return {
            store: userStore(),
            storemedals: medalsStore(),
            users: [],
            medals: [],
            position: 0
        }
    },

    created() {

        const allUsers = this.store.users.filter(user => user.tipo == 'userNormal')
        this.store.orderUsers(allUsers)

        this.position = allUsers.findIndex(user => user.username == this.store.getUserLogged().username)

        this.position += 1
    },

    mounted() {
        this.medals = this.mostrarMedalha();
        console.log(this.medals.length)
    },

    methods: {
        /* getUserLogged() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            return user;


        }, */

        // se o id da medalha for igual ao id da medalha do user, então mostrar a medalha
        // se não, não mostrar a medalha
        mostrarMedalha() {
            const user = JSON.parse(localStorage.getItem('user'));
            const medals = JSON.parse(localStorage.getItem('medals'));
            // create an empty array to store the user's medals
            let userMedals = [];
            // iterate through the medals array
            for (let i = 0; i < medals.length; i++) {
                // check if the user's medals array includes the current medal's id
                if (user.medals.includes(medals[i].idMedal)) {
                    // push the current medal object to the userMedals array
                    userMedals.push(medals[i]);
                }
            }
            // return the userMedals array
            return userMedals;
        },



    },
}
</script>

<style lang="scss" scoped>
.edit-profile {
    background-image: url('../assets/imgs/mainbg.svg');
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    height: auto;
    animation: gradient 70s linear infinite;
}

@keyframes gradient {
    100% {
        background-size: 3000px 2000px;
    }
}

#title {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    line-height: 47px;
    text-transform: uppercase;
    color: #F39C12;
}

.bntEditarPerfil {
    background-color: #E74C3C;
    color: #fff;
    font-weight: bold;
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 400;
    padding: 15px;
    font-size: 30px;
    line-height: 47px;
    border-radius: 1px;
}

#NameUser,
#EmailUser,
#dataNascimentoUser,
#MoradaUser,
#LocalidadeUser {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 47px;

    color: #fff;

}

#userLogged,
#userLoggedEmail,
#userLoggedData,
#userLoggedMorada,
#userLoggedLocalidade {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 47px;
    color: #fff;

}

#pontos,
#ranking,
#semana {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 35px;
    line-height: 55px;

    color: #F39C12;

}

// definir o contorno na minha div divdata
.divdata {
    border: 5px solid #fff;
    border-radius: 25px;
    padding: 20px;
    margin: 20px;
}

.medals {
    border: 5px solid #fff;
    border-radius: 25px;
    padding: 20px;
    margin: 20px;
}

#medalTitle {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 35px;
    line-height: 55px;

    color: #F39C12;
}

.bntVerRanking {
    background-color: #E74C3C;
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 47px;
    color: #FFFFFF;
    padding: 15px;
    border-radius: 10px;

    outline: none;
    border: none;
}

.btn {
    text-align: right;
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

#NaoTemMedalhas {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 35px;
    line-height: 55px;

    color: #fff;
}
</style>