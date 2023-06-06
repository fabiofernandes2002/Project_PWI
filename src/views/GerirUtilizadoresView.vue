<template>
    <div class="backgroundFundo">
        <b-container fluid>
            <div class="gerirUsers">
                <b-row class="mt-5 ">
                    <b-col cols="12 my-3" md="6" class="b-col border-right text-center">

                        <div class="buttons mt-5">

                            <b-table striped hover :items="this.allUsers" :fields="fields" @row-clicked="selectUser">
                                <template #cell(username)="row">
                                    <b-avatar :src="row.item.foto" size="2rem" class="mr-2"></b-avatar>
                                    <!-- routerview que ao carregar em cima do username aparece os seus dados mais abaixo na pagina -->
                                    <router-link :to="{ name: 'User', params: { id: row.item.id } }">
                                        {{ row.item.username }}
                                    </router-link>
                                </template>
                                <template #cell(apagar)="row" class="align-middle">
                                    <!-- Por avatar e username do user ao lado -->
                                    <b-button size="sm" pill variant="danger"
                                        @click="this.removeUser(row.item)">Remover</b-button>
                                </template>

                            </b-table>

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
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            store: userStore(),
            fields: [
                { key: 'username', label: 'Utilizadores', sortable: true },
                { key: 'apagar', label: 'Apagar' },
            ],
            user: {},
            allUsers: [],
            selectUser: {},
        }
    },

    created() {
        this.user = this.store.getUserById(this.$route.params.id);
        this.allUsers = this.store.users.filter(user => user.tipo == 'userNormal');

    },



    methods: {
        removeUser(id) {
            this.$swal({
                title: 'Tens a certeza que queres eliminar este utilizador?',
                text: "Não poderás reverter esta ação!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal(
                        'Eliminado!',
                        'O utilizador foi eliminado.',
                        'success'
                    )
                }
                this.$router.go();
            })
            this.store.removeUser(id.id);
            // atualizar os id dos users para nao haver erros
            this.store.users.forEach((user, index) => {
                user.id = index + 1;
            });

            localStorage.setItem('users', JSON.stringify(this.store.users));

        },

        /* selectUser(user) {
            this.selectUser = user
        } */
    },

    computed: {
        userWithLink() {
            return this.allUsers.map(user => {
                return {
                    ...user,
                    username: ''
                }
            })
        },

        /* selectUser() {
            return this.store.users.find(user => user.id === this.$route.params.id);
        } */
    },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Saira Condensed");
@import url("https://fonts.cdnfonts.com/css/boldhead");

.backgroundFundo {
    background-image: url("../assets/imgs/adminBG.svg");
    background-size: 1500px 2500px;
    height: 120vh;
    animation: gradient 30s infinite alternate linear;
}

.gerirUsers {
    transform: translate(0, 20%);
}

@keyframes gradient {
    100% {
        background-size: 2000px 3000px;
    }
}

.mt-5 {
    margin-top: 0rem !important;
    line-height: 120px;
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
    color: #F39C12;

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
    margin-bottom: 20px;
    width: 35%;
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
    color: white;
}

a {
    color: #F39C12;
    font-family: "Saira Condensed";
    margin-left: 10px;
}

a:hover {
    text-decoration: none;
    transition: 0.2s;
}

/* diminuir o tamanho da tabela */
.b-table {
    font-size: 1.5rem;

}

.b-table td:nth-child(1) {
    width: 50%;
}

/* mudar tipo de letra da tabela*/
.b-table {
    font-family: 'Saira Condensed ExtraBold';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    text-align: left;
    line-height: 31px;
    color: white;

}

/* mudar cor da tabela */
.b-table th {
    background-color: #F39C12;
    color: #000;
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