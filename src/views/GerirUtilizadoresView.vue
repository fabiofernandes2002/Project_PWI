<template>
    <div class="backgroundFundo">
        <b-container fluid>
            <b-row class="mt-5 ">
                <b-col cols="12 my-3" md="6" class="b-col border-right text-center">

                    <div class="buttons mt-5">
                        
                        <b-table striped hover :items="this.allUsers" :fields="fields" @row-clicked="selectUser">
                            <template #cell(username)="row">
                                <b-avatar :src="row.item.photo" size="2rem" class="mr-2"></b-avatar>
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
                    <b-img src="src/assets/imgs/logo_acabado.png" alt="Logo" id="logo"></b-img>
                    <h1 class="logoName">Photo Recycle</h1>
                    <h3 id="nameAdmin">Administrador</h3>
                </b-col>
            </b-row>
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
/* .backgroundFundo {
  background-image: url("../assets/imgs/mainbg.svg");
  background-size: 1500px 2500px;
  height: auto;
  animation: gradient 30s infinite alternate linear;
}

@keyframes gradient {
  100% {
    background-size: 2000px 3000px;
  }
}

.mt-5 {
  margin-top: 0rem !important;

  line-height: 118px;
} */
.bntEditarPerfil {
    background-color: #E74C3C;
    color: white;
    border: none;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Saira Condensed';
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
    width: 25%;
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
    color: #F39C12;
}

a {
    text-decoration: none;

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
    line-height: 31px;
    color: #000000;

}

/* mudar cor da tabela */
.b-table thead th {
    background-color: #F39C12;
    color: #000;
}

th {
    color: #F39C12;
}
</style>