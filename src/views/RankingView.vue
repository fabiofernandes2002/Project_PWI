<template>
    <div>
        <!-- Tabela de ranking -->
        <b-container>
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
                        <b-table striped hover :items="users" :fields="fields" class="text-center">
                            <template #cell(Classificação)="row">
                                <span>{{ row.index + 1 }}</span>
                            </template>
                            <template #cell(Nome de Utilizador)="row">
                                <span>{{ row.item.email }}</span>
                            </template>
                            <template #cell(Pontos)="row">
                                <span>{{ row.item.pontos }}</span>
                            </template>
                        </b-table>
                        
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { userStore } from '../stores/user';
    export default {
        name: 'RankingView',
        data() {
            return {
                store: userStore(),
                users: [],
                fields: ['Classificação', 'Nome de Utilizador', 'Pontos'],
            }
        },

        created() {
            this.users = this.store.users;
        },

        methods: {
            sortedTableByPoints() {
                this.users.sort((a, b) => {
                    return b.pontos - a.pontos;
                });
            },
        },


    }
</script>

<style lang="scss" scoped>
#title {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 63px;
    color: #F39C12;

}


</style>