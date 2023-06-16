<template>
    <div class="mapView">
        <b-container>
            <b-row>
                <b-col class="mt-5">
                    <h1>Mapa dos ecopontos</h1>
                    <div id="map">
                    </div>

                    <div id="divImagem" v-if="mostrarDivImagem"> <!-- v-if="mostrarDivImagem" -->
                        <div class="display-img">
                            <img v-if="imageUrl === null" src="https://dummyimage.com/640x360/fff/aaa" />
                            <img v-if="imageUrl" :src="fotoPreview" />
                        </div>

                        <div class="image-submit">
                            <input type="file" ref="fileInput" @change="uploadImage" />
                        </div>

                        <!-- botão de submeter imagem -->
                        <div class="mb-5 mt-3 text-center">
                            <b-button @click="useEcoponto" class="submitButton" variant="primary">Submeter
                                Imagem</b-button>
                        </div>
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
                            <h1 v-if="user">
                                Olá, {{ user.username }}
                            </h1>
                            <br>
                            <hr>

                        </a>
                        <a href="/">
                            <li>Página Inicial</li>
                        </a>
                        <a href="/mapView">
                            <li>Mapa de Ecopontos</li>
                        </a>
                        <a href="/addEcopoint">
                            <li v-if="this.storeUser.getUserLogged()">Adicionar Ecoponto</li>
                        </a>
                        <a href="/perfil">
                            <li v-if="this.storeUser.getUserLogged()">Perfil</li>
                        </a>
                        <a href="/desafios">
                            <li v-if="this.storeUser.getUserLogged()">Desafios</li>
                        </a>
                        <a href="/ranking">
                            <li v-if="this.storeUser.getUserLogged()">Ranking</li>
                        </a>
                        <hr>
                        <br>
                        <a href="/login">
                            <li v-if="!this.storeUser.getUserLogged()">Iniciar Sessão</li>
                        </a>
                        <a href="/register">
                            <li v-if="!this.storeUser.getUserLogged()">Registar</li>
                        </a>
                        <a href="/login" @click="this.storeUser.logout()">
                            <li v-if="this.storeUser.getUserLogged()">Logout</li>
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
import { utilizacaoStore } from '../stores/utilizacoes';
import jwtDecode from 'jwt-decode';


export default {
    data() {
        return {
            mostrarDivImagem: false,
            store: ecopointStore(),
            storeUser: userStore(),
            storeUtilizacao: utilizacaoStore(),
            ecopoints: [],
            users: [],
            imageUrl: null,
            fotoPreview: null,
            idSelectedEcopoint: null,
            userId: '',
            user: [],
        }
    },

    async mounted() {
        await this.getAllEcopontos();
        this.getUserId();
        await this.getUser(this.userId);

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
        const ecopontosValidados = this.ecopoints.filter(ecopoint => ecopoint.validacao === true);
        for (const ecopoint of ecopontosValidados) {
            //console.log(ecopoint.latitude);
            //console.log(typeof ecopoint.latitude)
            const marker = new google.maps.Marker({
                position: { lat: ecopoint.latitude, lng: ecopoint.longitude },
                map: map,
                title: ecopoint.nome,
                // mudar o icone do marker para o icone do ecopoint
                icon: svgMarker,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                <div class="infoWindowMapa">
                    <h3>${ecopoint.nome}</h3>
                    <h3>Tipo de lixo:</h3>
                    <p>${ecopoint.tipo}</p>
                    <h3>Morada:</h3>
                    <p>${ecopoint.morada}</p>
                   <button class="btn btn-primary" id="btn-utilizar-ecoponto" >Utilizar ecoponto</button>
                </div>
                `
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
                this.$nextTick(() => {
                    google.maps.event.addDomListener(document.getElementById('btn-utilizar-ecoponto'), 'click', this.mostrarDiv);
                    this.idSelectedEcopoint = ecopoint._id;
                });


                // desapaercer a mostarDiv da imagem ao carregar no botão de fechar a infoWindow
                google.maps.event.addListener(infoWindow, 'closeclick', () => {
                    this.mostrarDivImagem = false;
                });
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

    /* created() {
        this.ecopoints = this.store.getEcopoints;
        this.users = this.storeUser.getUsers;
    }, */

    /* created() {
        this.getAllEcopontos()
        //await this.getAllUsers()
    }, */

    methods: {

        getUserId() {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user.token;

            if (token) {
                const decoded = jwtDecode(token);
                this.userId = decoded.id;
            } 
        },

        async getUser(id) {
            try {
                const users = await this.storeUser.getUserById(id);
                this.user = users;
            } catch (error) {
                console.log(error);
            }
        },

        logout() {
            localStorage.removeItem('user');
            this.$router.push('/login');
        },

        uploadImage() {
            this.imageUrl = this.$refs.fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                this.fotoPreview = e.target.result;
            };
            reader.readAsDataURL(this.imageUrl);
        },

        /* ao clicar no botão "bntUtilizarEcoponto", a div, que contem a imagem do lugar do ecoponto, o botão "Escolher o ficheiro" e o botão "Submeter Imagem, aparece" */
        mostrarDiv() {
            // fazer com que o v-show do elemento "divImagem" seja true
            this.mostrarDivImagem = true;
        },
        submitImage() {
            // verificar se imageUrl não é null

            if (this.imageUrl != null) {
                //console.log(this.idSelectedEcopoint, this.storeUser.getUserLogged().id);
                this.storeOccurence.getOccurences(this.idSelectedEcopoint, this.storeUser.getUserLogged().id, this.imageUrl);

                // sweet alert para mostrar que a imagem foi submetida com sucesso
                this.$swal({
                    title: 'Imagem submetida com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#f39c12',
                });
            }
            else {
                // sweet alert para mostrar que a imagem não foi submetida
                this.$swal({
                    title: 'Imagem não submetida!',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#f39c12',
                });
            }
            this.mostrarDivImagem = false;
            this.useEcoponto();
        },

        async getAllEcopontos() {
            try {
                await this.store.getAllEcopontos();
                this.ecopoints = this.store.getEcopoints;
                //console.log(this.ecopoints[0].latitude);

            } catch (error) {
                console.log(error);
            }
        },

        async useEcoponto(){
            const currentDate = new Date();
            const options = { timeZone: 'Europe/Lisbon' };
            const formattedDate = currentDate.toLocaleString('pt-PT', options);
            const formData = new FormData();
            formData.append('idEcoponto', this.idSelectedEcopoint);
            formData.append('idUtilizador', this.userId);
            formData.append('image', this.imageUrl);
            formData.append('dataUtilizacao', formattedDate);

            try {
                await this.store.useEcoponto(this.idSelectedEcopoint,formData);
                this.$swal({
                    title: 'Utilização feita com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#f39c12',
                });
                this.mostrarDivImagem = false;
            } catch (error) {
                console.log(error);
                throw error;
            }

            /* try {
                await this.store.useEcoponto(this.idSelectedEcopoint,{
                    idEcoponto: this.idSelectedEcopoint,
                    idUtilizador: this.userId,
                    foto: this.imageUrl,
                    dataUtilizacao: formattedDate,
                });
                // guardar a utilização do ecoponto na store de utilização
                await this.storeUtilizacao.createUtilizacao({
                    idEcoponto: this.idSelectedEcopoint,
                    idUtilizador: this.userId,
                    foto: this.imageUrl,
                    dataUtilizacao: formattedDate,
                });
                console.log(this.imageUrl, this.idSelectedEcopoint, this.userId, formattedDate);
            } catch (error) {
                console.log(error);
            } */
        }
    },

}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Saira Condensed");
@import url("https://fonts.cdnfonts.com/css/boldhead");
@import "../assets/css/addEcopoint.css";

.mapView {
    background-image: url("../assets/imgs/mainbg.svg");
    background-size: 1920px 1080px;
    background-position: center;
    animation: gradient 70s ease infinite;
}

@keyframes gradient {
    100% {
        background-size: 3000px 2000px;
    }
}

.mt-5 h1 {
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
    height: 70vh;
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

#menuToggle input:checked~span {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
}

#menuToggle input:checked~span:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
}

#menuToggle input:checked~span:nth-last-child(2) {
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

#menuToggle input:checked~ul {
    transform: none;
    opacity: 1;
}
</style>