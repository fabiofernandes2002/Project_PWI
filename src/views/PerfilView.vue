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
                <b-col cols="12 my-3" md="6" class="mt-5">
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

                <b-col cols="12" md="6" class="mt-5">
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
                            <p class="text-center" v-if="medals.length === 0">Não tens medalhas</p>
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

                <b-col cols="12" class="btn">
                    <div class="mt-5 mb-5">
                        <a href="/ranking">
                            <b-button pill class="bntVerRanking">Ver Ranking</b-button>
                        </a>
                    </div>
                </b-col>
            </b-row>

        </b-container>
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
    background-size: cover;
    height: auto;
}

#title {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 50px;
    line-height: 47px;

    color: #f6f7f9;
}

.bntEditarPerfil {
    background-color: #E74C3C;
    color: #fff;
    font-weight: bold;
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 47px;
    border-radius: 25px;
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
    border-radius: 25px;

    outline: none;
    border: none;
}

.btn {
    text-align: right;
}
</style>