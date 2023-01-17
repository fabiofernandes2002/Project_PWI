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
            zoom: 18,
            center: { lat: 41.3538, lng: -8.74287 },
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeIds: ["roadmap", "terrain"],

            },
        });;

        const svgMarker = {
            path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "blue",
            fillOpacity: 1,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            anchor: new google.maps.Point(0, 20),
        };


        /* this.ecopoints.forEach(ecopoint => {
            const marker = new google.maps.Marker({
                position: { lat: ecopoint.latitude, lng: ecopoint.longitude },
                map: map,
                title: ecopoint.ecopointName
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                <div>
                    <h3>${ecopoint.ecopointName}</h3>
                    <h3>Tipo de lixo:</h3>
                    <p>${ecopoint.ecopointType}</p>
                    <h3>Morada:</h3>
                    <p>${ecopoint.address}</p>
                    <button class="btn btn-primary">Direções</button>
                    <button class="btn btn-primary">Comentar</button>
                </div>
                `
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });

        }); */
        console.log(this.store.getEcopoints);
        // for of para iterar sobre o array de ecopoints e criar um marker para cada um
        for (const ecopoint of this.ecopoints) {
            console.log(ecopoint.latitude);
            const marker = new google.maps.Marker({
                position: { lat: ecopoint.latitude, lng: ecopoint.longitude },
                map: map,
                title: ecopoint.ecopointName,
                // mudar o icone do marker para o icone do ecopoint
                icon: svgMarker,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                <div>
                    <h3>${ecopoint.ecopointName}</h3>
                    <h3>Tipo de lixo:</h3>
                    <p>${ecopoint.ecopointType}</p>
                    <h3>Morada:</h3>
                    <p>${ecopoint.address}</p>
                    <button class="btn btn-primary">Direções</button>
                    <button class="btn btn-primary">Comentar</button>
                </div>
                `
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        }



    },

    created() {
        this.ecopoints = this.store.getEcopoints;
        this.users = this.storeUser.getUsers;


    },

}
</script>

<style lang="scss" scoped>
#map {
    /* mapa largura e altura da window */
    width: 100%;
    height: 100vh;
}
</style>