<template>
    <div class="edit-profile">
        <b-container fluid>
            <b-row class="mt-5" id="forms">
                <b-col cols="12 my-3" md="12" class="mt-5">
                    <div class="text-center">
                        <h1 id="title">Editar dados pessoais</h1>
                    </div>
                </b-col>


                <b-col cols="10" md="6" sm="12" class="mt-3 ">
                    <b-form @submit="onSubmit" @reset="onReset" v-if="store.users">
                        <b-form-group id="input-group-1" label-for="input-1">
                            <b-form-input type="text" id="usernameUpdate" placeholder="Username" v-model="store.users.username"
                                required></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label-for="input-2">
                            <b-form-input type="email" id="emailUpdate" placeholder="Email" v-model="store.users.email"
                                required></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label-for="input-3">
                            <b-form-input type="password" id="passwordUpdate" placeholder="Password" v-model="store.users.password"
                                required></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label-for="input-4">
                            <b-form-input type="password" id="confirmPasswordUpdate" placeholder="Confirmar password"
                                v-model="store.users.password" required></b-form-input>
                        </b-form-group>

                        <!-- <b-button type="submit" variant="primary">Submit</b-button>
                        <b-button type="reset" variant="danger">Reset</b-button> -->
                    

                        <!-- Foto de utilizador -->
                        <div class="foto mt-5">
                            <b-col cols="6" md="12">
                                <div class="text-center">
                                    <h1 id="title">Foto de Utilizador</h1>
                                </div>
                            </b-col>

                            <b-row cols="12" md="6" class="mt-5">
                                <b-col cols="8">
                                    <div>
                                        <h3 id="fotoAtual">Foto Atual</h3>
                                    </div>
                                </b-col>
                                <b-col >
                                    <b-avatar src="https://placekitten.com/300/300" left size="6rem"></b-avatar>
                                </b-col>
                            </b-row>

                            <b-row class="mt-5">
                                <b-col cols="6">
                                    <div>
                                        <h3 id="novaFoto">Nova Foto</h3>
                                    </div>
                                </b-col>
                                <b-col>
                                    <b-form-file placeholder="Escolha uma foto" drop-placeholder="Escolher ficheiro"></b-form-file>
                                </b-col>
                            </b-row>
                        </div>

                        <!-- Botões de atualizar perfil e cancelar -->
                        <b-row class="mt-5 mb-5">
                            <b-col>
                                <b-button type="submit" pill class="mx-1" id="atualizarPerfil">Atualizar Perfil</b-button>
                            </b-col>
                            <b-col class="text-right">
                                <b-button type="reset" pill id="cancelar">Cancelar</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-col>


            </b-row>
        </b-container>
    </div>
</template>

<script>
import { userStore } from '../stores/user';
export default {
    data() {
        return {
            store: userStore(),
            users: [],
            form: {
                email: '',
                username: '',
                password: ''
            }
        }
    },

    created() {
        this.users = this.store.users;

        // carregar o array de users na local storage
        localStorage.setItem('users', JSON.stringify(this.users));

    },
}
</script>

<style lang="scss" scoped>

.edit-profile {
    background-image: url('../assets/imgs/mainbg.svg');
    background-repeat: no-repeat;
    background-size: cover;
    height: auto;
}

#forms {
    display: flex;
    align-items: center;
    justify-content: center;
}

#title {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 63px;
    color: #F39C12;

}

/* centrar os inputs no centro da pagina */
.b-form-group {
    display: flex;
    justify-content: center;
}


.b-form-input {
    border: 1px solid #134077;
    box-sizing: border-box;
    border-radius: 5px;
}

#usernameUpdate,
#emailUpdate,
#passwordUpdate,
#confirmPasswordUpdate {
    border: 4px solid #134077;
    border-radius: 10px;
    box-sizing: border-box;


    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 20px;
}

.foto{
    border: 5px solid #134077;
    border-radius: 25px;
    padding: 20px;
    margin: 20px;
    
}

#atualizarPerfil{
    background-color: #134077;
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 47px;
    color: #FFFFFF;
    border-radius: 25px;

    outline: none;
    border: none;
}

#cancelar{
    background-color: #E74C3C;
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 47px;
    color: #FFFFFF;
    border-radius: 25px;
    /* tirar a borda azul */
    outline: none;
    border: none;
}

#fotoAtual, #novaFoto{
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 47px;
    color: #F39C12;
}


</style>