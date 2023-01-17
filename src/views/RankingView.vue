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
                        <b-table striped hover :items="usersS" :fields="fields">
                            <template #cell(index)="row" >
                                <span>{{ row.index + 1 }}</span>
                            </template>
                            <template #cell(username)="row" class="align-middle">
                                <!-- Por avatar e username do user ao lado -->
                                <b-avatar :src="row.item.avatar" size="2rem" class="mr-2"></b-avatar> {{ row.item.username }}
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
                usersS: [],
                fields: [
                    { key: 'index', label: 'Classificacão' },
                    { key: 'username', label: 'Nome de Utilizador' },
                    { key: 'pontos', label: 'Pontos' },

                ],
            }
        },

        created() {
            this.usersS = this.store.users;
            this.sortedTableByPoints();
            this.filterAdmin();
            this.filterTop10();
        },

        methods: {
            sortedTableByPoints() {
                this.usersS.sort((a, b) => {
                    return b.pontos - a.pontos;
                });
            },

            // se o utizador for de type admin não aparece na tabela
            filterAdmin() {
                this.usersS = this.usersS.filter(user => user.tipo !== 'admin');
            },

            // só incluir na tabela os 10 primeiros users com mais pontos
            filterTop10() {
                this.usersS = this.usersS.slice(0, 10);
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
    
}

/* mudar cor da tabela */
.b-table thead th {
    background-color: #F39C12;
    color: #fff;
}

th {
    color: #F39C12;
}





</style>