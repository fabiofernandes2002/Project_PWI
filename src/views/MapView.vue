<template>
    <div class="mapView">
        <b-container>
            <b-row>
                <b-col class="mt-5">
                    <h1>Mapa dos ecopontos</h1>
                    <div id="map">
                    </div>


                </b-col>
            </b-row>
            <!-- MENU LATERAL -->
        <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>

                <ul id="menu">
                    <a href="/perfil">
                        <h1 v-if="!this.storeUser.getUserLogged">
                            Olá, {{ this.storeUser.getUserLogged.username }}
                        </h1>
                    </a>
                    <br>
                    <hr>
                    <br>
                    <a href="/">
                        <li>Página Inicial</li>
                    </a>
                    <a href="/addEcopoint">
                        <li>Adicionar Ecoponto</li>
                    </a>
                    <a href="/perfil">
                        <li v-if="!this.storeUser.getUserLogged">Perfil</li>
                    </a>
                    <a href="/desafios">
                        <li v-if="!this.storeUser.getUserLogged">Desafios</li>
                    </a>
                    <a href="/ranking">
                        <li v-if="!this.storeUser.getUserLogged">Ranking</li>
                    </a>
                    <br>
                    <hr>
                    <br>
                    <a href="/login" @click="logout">
                        <li v-if="!this.storeUser.getUserLogged">Logout</li>
                    </a>
                </ul>
            </div>
        </nav>
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

        // for of para iterar sobre o array de ecopoints e criar um marker para cada um
        for (const ecopoint of this.ecopoints) {
            //console.log(ecopoint.latitude);
            const marker = new google.maps.Marker({
                position: { lat: ecopoint.latitude, lng: ecopoint.longitude },
                map: map,
                title: ecopoint.ecopointName,
                // mudar o icone do marker para o icone do ecopoint
                icon: svgMarker,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                <div class="infoWindowMapa">
                    <h3>${ecopoint.ecopointName}</h3>
                    <h3>Tipo de lixo:</h3>
                    <p>${ecopoint.ecopointType}</p>
                    <h3>Morada:</h3>
                    <p>${ecopoint.ecopointAddress}</p>
                   <button class="btn btn-primary" @click="goToForm" id= 'bntUtilizarEcoponto'>Utilizar ecoponto</button>
                   
                </div>
                `
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
    
        }

        

        // pegar na localização atual do utilizador e mostrar no mapa os ecopontos mais próximos
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                const marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "Localização atual",
                    icon: {
                        path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                        fillColor: "red",
                        fillOpacity: 1,
                        strokeWeight: 0,
                        rotation: 0,
                        scale: 2,
                        anchor: new google.maps.Point(0, 20),
                    },
                });

                const infoWindow = new google.maps.InfoWindow({
                    content: `
                    <div>
                        <h3>Localização atual</h3>
                    </div>
                    `
                });

                marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                });

                map.setCenter(pos);
            }, () => {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }







    },

    created() {
        this.ecopoints = this.store.getEcopoints;
        this.users = this.storeUser.getUsers;


    },
    methods: {

        logout() {
            localStorage.removeItem('user');
            this.$router.push('/login');
        },
    },

    methods: {
        goToForm() {
            document.querySelector('#form').scrollIntoView({ behavior: 'smooth' });
        }
    },

}
</script>

<style lang="scss" scoped>

@import url("https://fonts.googleapis.com/css?family=Saira Condensed");
@import url("https://fonts.cdnfonts.com/css/boldhead");

.mapView {
    background-image: url("../assets/imgs/mainbg.svg");
    height: auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #f39c12;
    text-shadow: 0 0 10px #000;
    font-family: "Saira Condensed";
    text-align: center;
    padding-bottom: 3rem;
}

#map {
    /* mapa largura e altura da window */
    width: 100%;
    height: 100vh;
}
</style>