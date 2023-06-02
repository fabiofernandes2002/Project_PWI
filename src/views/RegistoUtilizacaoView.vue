<template>
    <div class="background">
        <!-- Apresentar todas as utilizações dos ecopontos de users quando submeterem as fotos para o admin validar -->
        <b-container>
            <b-row>
                <b-col cols="12" class="text-center">
                    <h1 class="mt-5 mb-5" id="title">Registo de Utilizações</h1>
                </b-col>
            </b-row>

            <b-row>
                <!-- Apresentar cards com imagem do utilização, nome de utilizador que submeteu para cada utilização do ecopontos -->
                <b-col cols="6" md="4" v-for="(utilizacao, index) in utilizacoes" :key="utilizacao.id">
                    <b-card-group>
                        <b-card class="mb-4">
                            <b-card-img :src="utilizacao.foto" alt="Image"></b-card-img>
                            <b-card-body>
                                <b-card-text>Id do Utilizador: {{ utilizacao.idUtilizador }}</b-card-text>
                                <b-card-text>Id do Ecoponto: {{ utilizacao.idEcoponto }}</b-card-text>
                                <b-card-text>Data de Utilização: {{ utilizacao.dataUtilizacao }}</b-card-text>
                            </b-card-body>
                            <!-- buuton para validar a utilização e apagar um fica a esquerda e outro a direita -->
                            <b-card-footer>
                                <b-row>
                                    <b-col cols="6" class="text-left">
                                        <b-button pill class="bntApagar" @click="removeRegister(index)">Apagar</b-button>
                                    </b-col>
                                    <b-col cols="6" class="text-right">
                                        <b-button pill class="bntValidar" @click="validateRegister(index)"
                                            :disabled="areButtonsDisabled[index]">{{ txtBtns[index] }}</b-button>
                                    </b-col>
                                </b-row>
                            </b-card-footer>

                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>

            <!-- MENU LATERAL DE ADMINISTRADOR -->
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <a href="/perfil">
                            <h1 v-if="!this.storeUser.getUserLogged">
                                Olá, {{ this.storeUser.getUserLogged.username }}
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
                            <li v-if="!this.storeUser.getUserLogged">Logout</li>
                        </a>
                    </ul>
                </div>
            </nav>
        </b-container>
    </div>
</template>

<script>
import { ecopointStore } from '../stores/ecopoint'
import { userStore } from '../stores/user'
import { occurenceStore } from '../stores/occurence'
export default {
    data() {
        return {
            store: ecopointStore(),
            storeUser: userStore(),
            storeOccurence: occurenceStore(),
            utilizacoes: [],
            areButtonsDisabled: [],
            txtBtns: []
        }
    },

    created() {
        this.storeOccurence.getOccurences;
        this.utilizacoes = this.storeOccurence.occurences;

        //lista, cujos elementos terão string "Validar" se o elemento da lista utilizacoes tiver o campo isValidated a false
        //ou "Validado" se o elemento da lista utilizacoes tiver o campo isValidated a true
        this.txtBtns = this.utilizacoes.map(utilizacao => utilizacao.validacao ? "Validado" : "Validar");

        this.areButtonsDisabled = this.utilizacoes.map(utilizacao => utilizacao.validacao);
        


    },
    methods: {
        removeRegister(id) {
            //swal message a perguntar se quer mesmo eliminar o registo
            this.$swal({
                title: 'Tens a certeza que queres eliminar este registo?',
                text: 'Não poderás reverter esta ação!',
                icon: 'warning',
                buttons: {
                    cancel: {
                        text: "Não",
                        value: false,
                        visible: true,
                        className: "",
                        closeModal: true,
                    },
                    confirm: {
                        text: "Sim",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                }
            }).then((result) => {
                if (result) {
                    // se clicar em yes, remove o registo
                    this.storeOccurence.removeOccurrence(id + 1);

                    this.$router.go();
                }
            });



        },

        validateRegister(indexBtn) {
            //swal message a perguntar se quer mesmo validar o registo
            this.$swal({
                title: 'Tens a certeza que queres validar este registo?',
                text: 'Não poderás reverter esta ação!',
                icon: 'warning',
                buttons: {
                    cancel: {
                        text: "Não",
                        value: false,
                        visible: true,
                        className: "",
                        closeModal: true,
                    },
                    confirm: {
                        text: "Sim",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                }
            }).then((result) => {
                if (result) {

                    this.txtBtns[indexBtn] = 'Validado';

                    this.utilizacoes.forEach((utilizacao, index) => {
                        if (utilizacao.validacao) {
                            this.txtBtns[index] = 'Validado';
                        }
                    });

                    //deixar o botão disabled se o registo ja tiver sido validado
                    this.areButtonsDisabled[indexBtn] = true;

                    this.storeOccurence.validateOccurrence(indexBtn + 1);

                    //chamar a função addPoints do userStore
                    this.storeUser.addPoints(this.utilizacoes[indexBtn].idUtilizador);

                    // contar o numero de ecopontos que o utilizador usou
                    this.storeUser.countEcopontosUtilizados(this.utilizacoes[indexBtn].idUtilizador);

                }
            });
        }
    },




}
</script>

<style scoped>
.background {
    background-image: url(../assets/imgs/adminBG.svg);

    background-size: cover;
    background-position: center;

}

.bntValidar {
    background-color: #134077;
    color: white;
    border: none;
    border-radius: 5px;
    width: 100%;
}

.bntApagar {
    background-color: #E74C3C;
    color: white;
    border: none;
    border-radius: 5px;
    width: 100%;
}

#title {
    color: #fff;
    font-size: 40px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: 'Saira Condensed';
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