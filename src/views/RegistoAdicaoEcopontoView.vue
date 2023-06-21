<template>
    <div class="background">
        <!-- Apresentar todas as utilizações dos ecopontos de users quando submeterem as fotos para o admin validar -->
        <b-container>
            <b-row>
                <b-col cols="12" class="text-center">
                    <h1 class="mt-5 mb-5" id="title">Registo de Adição de Ecopontos</h1>
                </b-col>
            </b-row>

            <b-row>
                <!-- Apresentar cards com imagem do utilização, nome de utilizador que submeteu para cada utilização do ecopontos -->
                <b-col cols="6" md="4" v-for="(ecoponto, index) in this.ecopontos" :key="ecoponto._id">
                    <b-card-group>
                        <b-card class="mb-4">
                            <b-card-img :src="ecoponto.foto" alt="Image"></b-card-img>
                            <b-card-body>
                                <b-card-text>Id do Utilizador: {{ ecoponto.criador }}</b-card-text>
                                <b-card-text>Nome do Ecoponto: {{ ecoponto.nome }}</b-card-text>
                                <b-card-text>Tipo de Ecoponto: {{ ecoponto.tipo }}</b-card-text>
                                <b-card-text>Morada: {{ ecoponto.morada }}</b-card-text>
                                <b-card-text>Localização: {{ ecoponto.localizacao }}</b-card-text>
                                <b-card-text>Data de criação: {{ ecoponto.dataCriacao }}</b-card-text>
                            </b-card-body>
                            <!-- buuton para validar a utilização e apagar um fica a esquerda e outro a direita -->
                            <b-card-footer>
                                <b-row>
                                    <b-col cols="6" class="text-left">
                                        <b-button pill class="bntApagar"
                                            @click="deleteEcopontoById(ecoponto._id)">Apagar</b-button>
                                    </b-col>
                                    <b-col cols="6" class="text-right">
                                        <b-button pill class="bntValidar" @click="validateEcoponto(ecoponto._id)"
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
export default {
    data() {
        return {
            store: ecopointStore(),
            storeUser: userStore(),
            ecopontos: [],
            areButtonsDisabled: [],
            txtBtns: [],
        }
    },

    methods: {
        async getAllEcopontos() {
            try {
                await this.store.getAllEcopontos();
                const allEcopontos = this.store.getEcopoints;
                this.ecopontos = allEcopontos.filter(ecoponto => ecoponto.validacao === false);
                console.log(this.ecopontos);

            } catch (error) {
                console.log(error);
            }
        },

        async validateEcoponto(id, indexBtn) {
            try {
                const result = await this.$swal({
                    title: 'Tens a certeza que queres validar este ecoponto?',
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
                })
                if (result) {

                    await this.store.validateEcoponto(id, {
                        validacao: true
                    });

                    this.txtBtns[indexBtn] = 'Validado';
                    console.log(this.txtBtns[indexBtn]);

                    this.ecopontos.forEach((ecoponto, index) => {
                        if (ecoponto.validacao) {
                            this.txtBtns[index] = 'Validado';
                        }
                    });

                    //deixar o botão disabled se o registo ja tiver sido validado
                    this.areButtonsDisabled[indexBtn] = true;

                    if (this.ecopontos[indexBtn] && this.ecopontos[indexBtn].criador) {
                        this.storeUser.addPointsForAddEcopoints(this.ecopontos[indexBtn].criador);
                        // contar o número de ecopontos que o utilizador tem registados
                        this.storeUser.countEcopontosRegistados(this.ecopontos[indexBtn].criador);
                    }


                }

            } catch (error) {
                console.log(error);
            }
        },

        async deleteEcopontoById(id) {
            try {
                const response = await EcopontosService.deleteEcopontoById(id);
                return response;
            } catch (error) {
                console.log(error);
            }
        }

    },
}
</script>

<style scoped>
.background {
    background-image: url('../assets/imgs/adminBG.svg');

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