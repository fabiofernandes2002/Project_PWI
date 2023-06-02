<template>
    <div class="background">
        <b-container fluid>
            <div class="gerirEcopontos">
                <b-col cols="10" class="mt-5">
                    <h1 class="text-center mb-5">Gerir Ecopontos</h1>
                    <!-- formulário para adicionar novo ecoponto -->
                    <b-form @submit.prevent="addEcopoint" id="form">
                        <b-row>
                            <b-col>
                                <b-form-group id="input-group-1" label="Nome do ecoponto:" label-for="input-1">
                                    <b-form-input id="input-1" v-model="form.ecopointName" required></b-form-input>
                                </b-form-group>
                            </b-col>


                            <b-col>
                                <b-form-group id="input-group-2" label="Localidade do ecoponto:" label-for="input-2">
                                    <b-form-input id="input-2" v-model="form.ecopointLocation" required></b-form-input>
                                </b-form-group>
                            </b-col>
                            <!-- morada -->
                            <b-col>
                                <b-form-group id="input-group-3" label="Morada do ecoponto:" label-for="input-3">
                                    <b-form-input id="input-3" v-model="form.ecopointAddress" required></b-form-input>
                                </b-form-group>
                            </b-col>


                        </b-row>
                        <b-row cols="10" md="6">

                            <b-col>
                                <b-form-group id="input-group-4" label="Latitude do ecoponto:" label-for="input-4">
                                    <b-form-input id="input-4" v-model="form.latitude" required></b-form-input>
                                </b-form-group>
                            </b-col>

                            <b-col>
                                <b-form-group id="input-group-5" label="Longitude do ecoponto:" label-for="input-5">
                                    <b-form-input id="input-5" v-model="form.longitude" required></b-form-input>
                                </b-form-group>
                            </b-col>


                        <b-col>
                            <b-form-group id="input-group-6" label="Tipo de ecoponto:" label-for="input-6">
                                <b-form-select id="input-6" v-model="form.ecopointType" :options="options"
                                    required></b-form-select>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="mb-5">
                            <b-button type="submit" variant="primary">Adicionar ecoponto</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>

                <!-- tabela com os ecopontos -->
                <b-col cols="10" class="mt-5">
                    <b-table striped hover :items="storeEcopoint.ecopoints" :fields="fields" :per-page="perPage"
                        :current-page="currentPage" @filtered="onFiltered" @row-clicked="rowClicked">
                        <template #cell(ecopointName)="row">
                            <b>{{ row.item.ecopointName }}</b>
                        </template>
                        <template #cell(ecopointLocation)="row">
                            <b>{{ row.item.ecopointLocation }}</b>
                        </template>
                        <template #cell(ecopointAddress)="row">
                            <b>{{ row.item.ecopointAddress }}</b>
                        </template>
                        <template #cell(latitude)="row">
                            <b>{{ row.item.latitude }}</b>
                        </template>
                        <template #cell(longitude)="row">
                            <b>{{ row.item.longitude }}</b>
                        </template>
                        <template #cell(ecopointType)="row">
                            <b>{{ row.item.ecopointType }}</b>
                        </template>
                        <template #cell(actions)="row">
                            <b-button id="delete" variant="danger" @click="deleteEcopoint(row.item)">
                                Eliminar
                            </b-button>
                        </template>
                    </b-table>
                </b-col>
            </div>
           <!-- MENU LATERAL DE ADMINISTRADOR -->
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
                        <a href="/admin">
                            <li>Página Principal Admin</li>
                        </a>
                        <a href="/addEcopoint">
                            <li>Gerir Ecopontos</li>
                        </a>
                        <a href="/gerirUtilizadores">
                            <li>Gerir Desafios</li>
                        </a>
                        <a href="/desafios">
                            <li>Gerir Recompensas</li>
                        </a>
                        <a href="/ranking">
                            <li>Gerir Utilizadores</li>
                        </a>
                        <br>
                        <hr>
                        <br>
                        <a href="/">
                            <li>Página Inicial da App</li>
                        </a>
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
            form: {
                name: '',
                ecopointLocation: '',
                ecopointAddress: '',
                latitude: '',
                longitude: '',
                ecopointType: '',
                userCreate: '',
                // userCreate: this.storeUser.getUserLogged().id,
                ecopointCreationDate: new Date().toLocaleDateString('pt-PT'),

            },
            options: [
                { value: null, text: 'Selecione o tipo de ecoponto' },
                { value: 'papel', text: 'Paper' },
                { value: 'plastico', text: 'Plastic' },
                { value: 'Vidro', text: 'Glass' },
                { value: 'bateria', text: 'Battery' },
                { value: 'organico', text: 'Organic' }

            ],
            fields: [
                { key: 'ecopointName', label: 'Nome' },
                { key: 'ecopointLocation', label: 'Localidade' },
                { key: 'ecopointAddress', label: 'Morada' },
                { key: 'latitude', label: 'Latitude' },
                { key: 'longitude', label: 'Longitude' },
                { key: 'ecopointType', label: 'Tipo' },
                { key: 'actions', label: 'Ações' },
            ],

            storeEcopoint: ecopointStore(),
            storeUser: userStore(),
        }
    },

    methods: {
        addEcopoint() {
            this.storeEcopoint.addEcopoint(this.form.name, this.form.ecopointLocation, this.form.ecopointAddress, this.form.latitude, this.form.longitude, this.form.ecopointType, this.form.userCreate, this.form.ecopointCreationDate);
            // sweat alert para confirmar que o ecoponto foi adicionado só quando carregar no botão de confirmar do sweet alert e atualizar a página
            this.$swal({
                title: 'Ecoponto adicionado com sucesso!',
                icon: 'success',
                confirmButtonText: 'Confirmar',
                confirmButtonColor: '#2D9CDB',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
            }).then(() => {
                this.$router.push('/gerirEcopontos');
                this.$router.go();
            });
            
            
        },

        deleteEcopoint(id) {
            this.storeEcopoint.deleteEcopoint(id.id);
            // atualizar os id dos ecopontos para que não haja erros
            this.storeEcopoint.ecopoints.forEach((ecopoint, index) => {
                ecopoint.id = index + 1;
            });
            localStorage.setItem('ecopoints', JSON.stringify(this.storeEcopoint.ecopoints));
        },


    }
}
</script>

<style scoped>
.background{
background-image: url(../assets/imgs/adminBG.svg);

background-size: cover;
background-position: center;

}

.gerirEcopontos {
    font-family: 'Saira Condensed';
    font-size: 40px;
    color: #FFFFFF;
    text-align: center;
}

#form {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 31px;
}

.mt-5 {
    margin-top: 0rem !important;
}

.col-10 {
    max-width: 100%;
}

.btn-primary {
    background-color: #F39C12;
    border-color: #F39C12;
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 31px;
    margin-top: 5px;
    margin-bottom: 20px;
}

.b-table {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 31px;
}

#delete {
    font-family: 'Saira Condensed ExtraBold';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 31px;
}

.text-center {
    font-family: 'Saira Condensed';
    text-transform: uppercase;
    padding-top: 20px;
    font-weight:bold;
    font-size: 40px;
    color: #F39C12;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
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