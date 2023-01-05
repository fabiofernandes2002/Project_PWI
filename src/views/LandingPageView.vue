<template>
    <div>
        <h1>LandingPageView</h1>
        <div>
            <h1>Olá {{ getUserLogged().username }}</h1>
        </div>


        <!-- logout de utilizador -->
        <b-button @click="logout">Logout</b-button>

    </div>
</template>

<script>
import { userStore } from '../stores/user';
export default {
    name: "LandingPageView",
    data() {
        return {
            store: userStore(),
            users: [],
        };
    },

    created() {
        this.users = JSON.parse(localStorage.getItem('user'));
    },

    // carregar os dados da store para a local storage para poder fazer o login
    mounted() {
        this.store.load();
    },





    methods: {
        // pegar os dados do utilizador que está logado na session storage
        getUserLogged() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            return user;
        },


        // logout do utilizador
        logout() {
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
    },

}
</script>

<style lang="scss" scoped>

</style>