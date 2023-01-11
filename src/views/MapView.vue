<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="mt-5">
                    <h1>Mapa dos ecopontos</h1>
                    <div id="map">

                    </div>


                </b-col>

            </b-row>
        </b-container>
    </div>
</template>

<script>
import { ecopointStore } from '../stores/ecopoint';
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

    mounted() {
       let map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });;

        const marker = new google.maps.Marker({
            position: { lat: -34.397, lng: 150.644 },
            map: map,
        });
    },

    created() {
        this.ecopoints = JSON.parse(localStorage.getItem('ecopoints'));
        this.users = JSON.parse(localStorage.getItem('users'));





    },

}
</script>

<style lang="scss" scoped>
#map {
    height: 400px;
    width: 100%;
}
</style>