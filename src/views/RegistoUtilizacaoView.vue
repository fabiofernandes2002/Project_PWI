<template>
    <div>
        <!-- Apresentar todas as utilizações dos ecopontos de users quando submeterem as fotos para o admin validar -->
        <b-container>
            <b-row>
                <b-col cols="12" class="text-center">
                    <h1 class="mt-5 mb-5">Registo de Utilizações</h1>
                </b-col>
            </b-row>

            <b-row>
                <!-- Apresentar cards com imagem do utilização, nome de utilizador que submeteu para cada utilização do ecopontos -->
                <b-col cols="6" md="4" v-for="utilizacao in this.utilizacoes" :key="utilizacao.id">
                    <b-card-group>
                        <b-card class="mb-2">
                            <b-card-img :src="utilizacao.photo" alt="Image"></b-card-img>
                            <b-card-body>
                                <b-card-text>Id do Utilizador: {{ utilizacao.userId }}</b-card-text>
                                <b-card-text>Id do Ecoponto: {{ utilizacao.idEcopoint }}</b-card-text>
                                <b-card-text>Data de Utilização: {{ utilizacao.useData }}</b-card-text>
                            </b-card-body>
                            <!-- buuton para validar a utilização e apagar um fica a esquerda e outro a direita -->
                            <b-card-footer>
                                <b-row>
                                    <b-col cols="6" class="text-left">
                                        <b-button pill class="bntApagar">Apagar</b-button>
                                    </b-col>
                                    <b-col cols="6" class="text-right">
                                        <b-button pill class="bntValidar">Validar</b-button>
                                    </b-col>
                                </b-row>
                            </b-card-footer>
                            
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
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

        }
    },

    created() {
        this.storeOccurence.getOccurences;
        this.utilizacoes = this.storeOccurence.occurences;
        console.log(this.utilizacoes);
    },




}
</script>

<style scoped>

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


</style>