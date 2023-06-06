<template>
    <div class="addEcopoint">
        <b-container fluid>
            <div class="add-title">
                <h1>Adicionar Ecoponto</h1>
            </div>

            <b-form @submit.prevent="onSubmit">
                <div class="display-img">
                    <img v-if="imageUrl === null" src="https://dummyimage.com/640x360/fff/aaa" />
                    <img v-if="imageUrl" :src="imageUrl" />
                </div>

                <div class="image-submit">
                    <input type="file" ref="fileInput" @change="uploadImage" />
                </div>

                <div class="location">
                    <h2>Localização:</h2>
                    <div class="location-input">
                        <input type="text" v-model="form.morada" placeholder="Rua" />
                        <input type="text" v-model="form.codigoPostal" placeholder="Código Postal" />
                        <input type="text" v-model="form.localizacao" placeholder="Freguesia" />
                    </div>
                </div>

                <div class="description">
                    <h2>Nome do Ecoponto:</h2>
                    <div class="description-input">
                        <input type="text" v-model="form.nome" placeholder="Nome do ecoponto" />
                    </div>
                </div>

                <div class="comment">
                    <h2>Tipo do Ecoponto:</h2>
                    <div class="comment-input">
                        <input type="text" v-model="form.tipo" placeholder="Tipo do ecoponto" />
                    </div>
                </div>

                <div class="submit">
                    <button type="submit" class="submit-btn">Submeter</button>
                </div>
            </b-form>



            <!-- MENU LATERAL -->
            <nav role="navigation">
                <div id="menuToggle">
                    <input type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>

                    <ul id="menu">
                        <a href="/perfil">
                            <h1 v-if="this.storeUser.getUserLogged()">
                                Olá, {{ this.storeUser.getUserLogged().username }}
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

export default {
    data() {
        return {
            store: ecopointStore(),
            storeUser: userStore(),
            ecopoints: [],
            users: [],
            imageUrl: null,
            form: {
                nome: '',
                tipo: '',
                localizacao: '',
                morada: '',
                foto: '',
                codigoPostal: ''
            }
        }
    },

    methods: {
        async onSubmit(evt) {
            evt.preventDefault()

            if (this.imageUrl != null) {
                // adicionar o ecoponto na store dos ecopontos
                const { latitude, longitude } = await this.store.getLatitudeLongitude(this.form.localizacao, this.form.codigoPostal);
                const latestEcopoint = this.store.ecopoints[this.store.ecopoints.length - 1];
                const dataCriacao = latestEcopoint.dataCriacao;

                // pegar validacao do ecoponto e adicionar na store dos ecopontos
                const validacao = latestEcopoint.validacao;

                this.store.addEcopoint(this.imageUrl, this.form.nome, this.storeUser.getUserLogged().id, this.form.localizacao, this.form.morada, this.form.codigoPostal, this.form.tipo, latitude, longitude, dataCriacao, validacao);

                //this.store.addEcopoint(this.form.nomeEcoponto, this.form.localizacao, this.form.morada, latitude, longitude ,this.form.tipoEcoponto, this.storeUser.getUserLogged().id, dataCriacao, validacao, this.imageUrl);
                
                // sweet alert para mostrar que a imagem foi submetida com sucesso
                this.$swal({
                    title: 'Ecoponto submetido com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#f39c12',
                });
            }
            else {
                // sweet alert para mostrar que a imagem não foi submetida
                this.$swal({
                    title: 'Ecoponto não submetido!',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#f39c12',
                });
            }

            // limpar o formulário e a imagem do ecoponto depois de submetido
            this.form.nome = '';
            this.form.tipo = '';
            this.form.localizacao = '';
            this.form.morada = '';
            this.form.codigoPostal = '';
            this.imageUrl = null;

        },

        uploadImage(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },

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
  
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Saira Condensed");
@import url("https://fonts.cdnfonts.com/css/boldhead");


.addEcopoint {
    background-image: url("../assets/imgs/mainbg.svg");
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    height: auto;
    animation: gradient 70s ease infinite;
}

@keyframes gradient {
    100% {
        background-size: 3000px 2000px;
    }
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


.add-title {
    display: flex;
    padding-top: 5vh;
    padding-bottom: 5vh;
    justify-content: center;
}

.add-title h1 {
    font-size: 3.5em;
    color: #fff;
    font-family: "Saira Condensed";
    font-weight: bold;
}

.image-submit {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    color: white;
    padding-top: 2vh;
    width: 100%;
    font-family: "Saira Condensed";
}

.display-img img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 35%;
    height: 35%;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
}

.image-submit input[type="file"] {
    background-color: #2ecc71;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    ;
    border-radius: 10px;
    font-family: "Saira Condensed";
}

.image-submit input::file-selector-button {
    background-color: #f39c12;
    border-radius: 10px;
    border: none;
    padding: 15px;
    margin-right: 20px;
    color: white;
    cursor: pointer;
}

.image-submit input::file-selector-button:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
}

.submitButton {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    color: white;
    padding-top: 2vh;
    font-family: "Saira Condensed ExtraBold";
    background-color: #f39c12;
    border-radius: 10px;
    border: none;
    padding: 15px;
}

.location {
    display: flex;
    margin-left: 3vw;
    margin-top: 3vh;
    color: white;
    font-family: "Saira Condensed";
}

.location h2 {
    margin-top: 2vh;
    margin-right: 1vw;
}

.location input[type="text"] {
    background-color: #2ecc71;
    border: none;
    color: white;
    padding: 15px 64px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 20px;
    border-radius: 10px;
    font-family: "Saira Condensed";
}

.location input[type="number"] {
    background-color: #2ecc71;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 2px;
    ;
    border-radius: 10px;
    font-family: "Saira Condensed";
}

.location input:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
}

.description {
    display: flex;
    margin-left: 3vw;
    margin-top: 3vh;
    color: white;
    font-family: "Saira Condensed";
}

.description h2 {
    margin-right: 1vw;
    margin-top: 2vh;
}

.description input {
    background-color: #2ecc71;
    border: none;
    color: white;
    padding: 15px 64px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 40px;
    border-radius: 10px;
    font-family: "Saira Condensed";
}

.description input:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
}

.comment {
    display: flex;
    margin-left: 3vw;
    margin-top: 3vh;
    color: white;
    font-family: "Saira Condensed";
}

.comment h2 {
    margin-right: 1vw;
    margin-top: 2vh;
}

.comment input {
    background-color: #2ecc71;
    border: none;
    color: white;
    padding: 15px 64px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 20px;
    ;
    border-radius: 10px;
    font-family: "Saira Condensed";
}

.comment input:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
}

.submit {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    padding: 5vh;
    border: none;
}

.submit-btn {
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: "Saira Condensed";
    background-color: #f39c12;
    border-radius: 10px;
    border: none;
    padding-left: 50px;
    padding-right: 50px;
}

.submit-btn:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
}
</style>