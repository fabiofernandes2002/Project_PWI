<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="mt-5">
                    <h1>Mapa dos ecopontos</h1>
                    <Maps/>


                </b-col>
                
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { ecopointStore } from '../stores/ecopoint';
import Maps from '../components/Maps.vue';
import { userStore } from '../stores/user';
export default {
    data() {
        return {
            store: ecopointStore(),
            storeUser: userStore(),
            ecopoints: [],
            users: [],

        }
    },

    created() {
        this.ecopoints = JSON.parse(localStorage.getItem('ecopoints'));
        this.users = JSON.parse(localStorage.getItem('users'));
    },

}
</script>

<style lang="scss" scoped>

</style>