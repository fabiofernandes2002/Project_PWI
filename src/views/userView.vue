<template>
    <div>
        <!-- Apresentar o user que foi clicado no link numa card com photo, username, email, data de nascimento, morada, localidade -->
        <b-card v-if="selectUser" class="mt-3 mb-2 mx-auto text-center" style="max-width: 20rem">
            <b-card-img :src="selectUser.photo" class="img-fluid"></b-card-img>
            <b-card-body>
                <b-card-title>{{ selectUser.username }}</b-card-title>
                <b-card-text>
                    <b>Nome:</b> {{ selectUser.username }}<br>
                    <b>Email:</b> {{ selectUser.email }}<br>
                    <b>Data de Nascimento:</b> {{ selectUser.datanascimento }}<br>
                    <b>Morada:</b> {{ selectUser.morada }}<br>
                    <b>Localidade:</b> {{ selectUser.localidade }}<br>
                </b-card-text>
            </b-card-body>
            <b-button variant="primary" @click="$router.go(-1)">Go back</b-button>
        </b-card>
    </div>
</template>

<script>
import { userStore } from '../stores/user';
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            store: userStore(),
            allUsers: [],
            //selectUser: {},

        }
    },

    created() {

        this.allUsers = this.store.users.filter(user => user.tipo == 'userNormal');
    },

    computed: {
        selectUser() {
            return this.store.users.find((user) => user.id === this.$route.params.id);
        }
    },
}

</script>

<style lang="scss" scoped></style>