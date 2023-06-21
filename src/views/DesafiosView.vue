<template>
    <div class="desafios">
        <b-container fluid>

            <div class="title">
                <h1>Desafios</h1>
            </div>

            <div class="desafios-list">
                <b-row>
                    <b-col cols="12">
                        <div class="tabela-desafios">
                            <b-table striped :items="this.desafios" :fields="fields">
                                <!-- adiciona o nome do desafio -->
                                <template #cell(nome)="row">
                                    <span>{{ row.item.nome }}</span>
                                </template>
                                <!-- adiciona a descrição do desafio -->
                                <template #cell(descricao)="row">
                                    <span>{{ row.item.descricao }}</span>
                                </template>
                                <template #cell(recompensa)="row">
                                    <span>{{ row.item.recompensa }}</span>
                                </template>
                            </b-table>

                        </div>
                    </b-col>
                </b-row>
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
                            <h1 v-if="this.store.getUserLogged()">
                                Olá, {{ this.store.getUserLogged().username }}
                            </h1>
                            <br>
                            <hr>

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
        </b-container>
    </div>
</template>

<script>
import { userStore } from '../stores/user';
import { desafiosStore } from '../stores/desafios';

export default {

    data() {
        return {
            store: userStore(),
            desafiosStore: desafiosStore(),
            fields: [
                { key: 'nome', label: 'Nome' },
                { key: 'descricao', label: 'Descrição' },
                {key: 'recompensa', label: 'Recompensa'}
            ],
            desafios: [],
        }
    },

    async mounted () {
        await this.getDesafios();
    },

    methods: {
        async getDesafios(){
            try {
                const desafios = await this.desafiosStore.getAllDesafios();
                this.desafios = desafios;
                
            } catch (error) {
                console.log(error);
            }
        },
    },

}
</script>

<style scoped>
.desafios {
    background-image: url("../assets/imgs/mainbg.svg");
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    height: 100vh;
    animation: gradient 70s linear infinite;
}

@keyframes gradient {
    100% {
        background-size: 3000px 2000px;
    }
}

.logo h1 {
    font-family: "Saira Condensed";
    font-size: 2.5em;
    color: #f39c12;
    position: absolute;
    top: 6vh;
    left: 12vw;
}

.logo-img {
    width: 8%;
    height: 10%;
    position: absolute;
    top: 4vh;
    left: 2vw;
}

.title {
    position: absolute;
    top: 5vh;
    left: 0;
    width: 100%;
}

.title h1 {
    font-family: "Saira Condensed";
    font-size: 3.5em;
    color: #f39c12;
    font-weight: bold;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
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

.tabela-desafios {
    display: flex;
    position: relative;
    margin: 0 auto;
    top: 30vh;
    width: 85%;
}

.table {
    font-family: "Saira Condensed";
    font-size: 1.3em;
    color: white;
    text-transform: uppercase;
}
</style>