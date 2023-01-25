<template>
    <div>
        <b-container fluid>

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
                        <b-col>
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
                ecopointName: '',
                ecopointLocation: '',
                ecopointAddress: '',
                latitude: '',
                longitude: '',
                ecopointType: '',
                userCreate:'',
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
            this.storeEcopoint.addEcopoint(this.form.ecopointName,this.form.ecopointLocation,this.form.ecopointAddress, this.form.latitude, this.form.longitude, this.form.ecopointType, this.form.userCreate, this.form.ecopointCreationDate);
            /* this.form = {
                ecopointName: this.form.ecopointName,
                // pegar no user que está logado id, de quem está a adicionar o ecoponto
                userCreate: this.storeUser.getUserLogged().id,
                ecopointLocation: this.form.ecopointLocation,
                ecopointAddress: this.form.ecopointAddress,
                // pegar a data atual e converter para o formato dd/mm/yyyy
                ecopointDate: new Date().toLocaleDateString('pt-PT'),
                ecopointType: this.form.ecopointType,
                latitude: this.form.latitude,
                longitude: this.form.longitude,
                

            }; */
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
#form {
    font-family: 'Saira Condensed ExtraBold';
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 31px;
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
</style>