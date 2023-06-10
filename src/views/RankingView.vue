<template>
    <div class="edit-profile">
        <!-- Tabela de ranking -->
        <b-container fluid>
            <b-row>
                <b-col cols="12">
                    <div class="mt-5 mb-5">
                        <h1 id="title" class="text-center">Top Pontuação</h1>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <div class="mt-5 mb-5">
                        <!-- Apresentar os users na tabela ranking, username e pontos e ordenar a tabela por pontos  -->
                        <b-table striped hover :items="users" :fields="fields">
                            <template #cell(index)="row">
                                <span>{{ row.index +1 }}</span>
                            </template>
                            <template #cell(username)="row" class="align-middle">
                                <!-- Por avatar e username do user ao lado -->
                                <b-avatar :src="row.item.foto" size="2rem" class="mr-2"></b-avatar> {{ row.item.username }}
                            </template>
                            <template #cell(pontos)="row">
                                <span>{{ row.item.pontos }}</span>
                            </template>

                        </b-table>

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
export default {
    name: 'RankingView',
    data() {
        return {
            store: userStore(),
            //usersS: [],
            fields: [
                { key: 'index', label: 'Classificação' },
                { key: 'username', label: 'Nome de Utilizador' },
                { key: 'pontos', label: 'Pontos' },

            ],
            users: [],
        }
    },

    /* async created() {
        //const allUsers = this.store.users.filter(user => user.tipo == 'userNormal')
        await this.getTop10()
        

        /* let position = this.allUsers.findIndex(user => user.username == this.store.getUserLogged().username)
        console.log(position);
        position += 1

        const top10 = allUsers.length > 10 ? allUsers.slice(0, 10) : allUsers
        this.store.users = top10
    }, */

    methods: {
        async getTop10(){
            try {
                const users = await this.store.getTop10()
                this.users = users
            } catch (error) {
                console.log(error);
            }
        }
    },

    async mounted() {
        await this.getTop10();
    },

    /* mounted () {
        
    }, */

    /* methods: {
        sortedTableByPoints() {
            this.store.users.sort((a, b) => {
                return b.pontos - a.pontos;
            });
        },

        // se o utizador for de type admin não aparece na tabela
        filterAdmin() {
            this.usersS = this.store.users.filter(user => user.tipo !== 'admin');
        },

        // só incluir na tabela os 10 primeiros users com mais pontos
        filterTop10() {
            this.usersS = this.store.users.slice(0, 10);
        },
    }, */


}
</script>

<style lang="scss" scoped>
.edit-profile {
    background-image: url('../assets/imgs/mainbg.svg');
    background-size: 1920px 1080px;
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
    margin: 0 auto;
    font-weight: 800;
    font-size: 50px;
    line-height: 63px;
    text-transform: uppercase;
    color: #F39C12;

}

/* Por os avatars todos posicionados na mesma linha verticalmente */
.b-avatar {
    vertical-align: middle;

}

/* diminuir a espaço de classificação da tabela */
.b-table td:nth-child(1) {
    width: 50%;
}

/* mudar tipo de letra da tabela*/
.b-table {
    font-family: 'Saira Condensed ExtraBold';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 31px;
    color: #fff
}

.col-12 {
    margin: 0 auto;
    max-width: 80%;
    border-radius: 10px;
}

/* mudar cor da tabela */
.b-table thead th {
    background-color: #F39C12;
    color: #fff;
}

th {
    color: #F39C12;
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