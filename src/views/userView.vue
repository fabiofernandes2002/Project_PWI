<template>
    <div>
        <!-- Apresentar o user que foi clicado no link numa card com photo, username, email, data de nascimento, morada, localidade -->
        <b-card v-if="user !== null" class="mt-3 mb-2 mx-auto text-center" style="max-width: 20rem">
            <b-card-img :src="user.foto" class="img-fluid"></b-card-img>
            <b-card-body>
                <b-card-title>{{ user.username }}</b-card-title>
                <b-card-text>
                    <b>Nome:</b> {{ user.username }}<br>
                    <b>Email:</b> {{ user.email }}<br>
                    <b>Data de Nascimento:</b> {{ user.dataNascimento }}<br>
                    <b>Morada:</b> {{ user.morada }}<br>
                    <b>Localidade:</b> {{ user.localidade }}<br>
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
    name: 'userView',
    data() {
        return {
            store: userStore(),
            user: null,
            id: this.$route.params.id

        }
    },

    methods: {
        
        async getUserById(id){
           try {
            const user = await this.store.getUserById(id);
            this.user = user;
           } catch (error) {
            console.log(error);
           }
        }
    },

    async mounted() {
        const id = this.$route.params.id;
        await this.getUserById(id);
    }
}

</script>

<style lang="scss" scoped></style>