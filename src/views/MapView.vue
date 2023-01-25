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
                        <h1 v-if="getUserLogged()">
                            Olá, {{ getUserLogged().username }}
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
                        <li v-if="getUserLogged()">Perfil</li>
                    </a>
                    <a href="/desafios">
                        <li v-if="getUserLogged()">Desafios</li>
                    </a>
                    <a href="/ranking">
                        <li v-if="getUserLogged()">Ranking</li>
                    </a>
                    <br>
                    <hr>
                    <br>
                    <a href="/login" @click="logout">
                        <li v-if="getUserLogged()">Logout</li>
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
    methods: {
        getUserLogged() {
            const user = JSON.parse(sessionStorage.getItem('user'));
            return user;
        },

        logout() {
            sessionStorage.removeItem('user');
            this.$router.push('/login');
        },
    }

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
    width: auto;
    height: 80vh;
    margin-bottom: 3rem;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
}

/* MENU LATERAL */
#menuToggle {
    display: block;
    position: fixed;
    top: 6vh;
    left: 96vw;
    z-index: 1;
  
    user-select: none;
  }
  
  #menuToggle a {
    font-family: "Saira Condensed";
    text-decoration: none;
    color: #232323;
  
    transition: color 0.3s ease;
  }
  
  #menuToggle a:hover {
    color: #2ecc71;
  }
  
  #menuToggle input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }
  
  /* HAMBURGER */
  #menuToggle span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #f39c12;
    border-radius: 3px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }
  #menuToggle span:first-child {
    transform-origin: 0% 0%;
  }
  #menuToggle span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }
  
  #menuToggle input:checked ~ span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
  }
  #menuToggle input:checked ~ span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }
  #menuToggle input:checked ~ span:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }
  
  /* POSIÇÃO DO MENU */
  #menu {
    position: absolute;
    width: 350px;
    margin: -100px 0 0 0;
    padding: 50px;
    padding-top: 150px;
    padding-bottom: 520px;
    right: -50px;
    background: #ededed;
    list-style-type: none;
    transform-origin: 0% 0%;
    transform: translate(100%, 0);
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }
  
  #menu li {
    padding: 10px 0;
    font-size: 22px;
  }
  #menuToggle input:checked ~ ul {
    transform: none;
    opacity: 1;
  }
</style>