<template>
    <div class="backgroundFundo">
        <b-container fluid>
            <b-row class="mt-5" id="forms">
                <b-col cols="12 my-3" md="12" class="mt-5">
                    <div class="text-center">
                        <h1 id="title">Editar dados pessoais</h1>
                    </div>
                </b-col>


                <b-col cols="10" md="6" sm="12" class="mt-3 ">
                    <b-form @submit="updateUser" @reset="onReset">
                        <b-form-group id="input-group-1" label-for="input-1">
                            <b-form-input type="text" id="usernameUpdate" placeholder="Username"
                                v-model="form.usernameChange" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label-for="input-2">
                            <b-form-input type="email" id="emailUpdate" placeholder="Email" v-model="form.emailChange"
                                required></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label-for="input-3">
                            <b-form-input type="password" id="passwordUpdate" placeholder="Password"
                                v-model="form.passwordChange" required></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label-for="input-4">
                            <b-form-input type="password" id="confirmPasswordUpdate" placeholder="Confirmar password"
                                v-model="form.confirmPasswordChange" required></b-form-input>
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
                                <b-col>
                                    <b-avatar v-if="this.store.getUserLogged().foto" :src="this.store.getUserLogged().foto"
                                        left size="6rem"></b-avatar>
                                    <b-avatar v-else left size="6rem"></b-avatar>

                                </b-col>
                            </b-row>

                            <b-row class="mt-5">
                                <b-col cols="6">
                                    <div>
                                        <h3 id="novaFoto">Nova Foto</h3>
                                    </div>
                                </b-col>
                                <b-col>
                                    <b-form-file placeholder="Escolha uma foto" drop-placeholder="Escolher ficheiro"
                                        @change="uploadImage"></b-form-file>
                                </b-col>
                            </b-row>
                        </div>

                        <!-- Botões de atualizar perfil e cancelar -->
                        <b-row class="mt-5 mb-5">
                            <b-col>
                                <b-button pill class="mx-1" id="atualizarPerfil" @click="updateUser(userId, username, email, password)">Atualizar Perfil</b-button>
                            </b-col>
                            <b-col class="text-right">
                                <b-button type="reset" pill id="cancelar" @click="onReset">Cancelar</b-button>
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
import { UsersService } from '../services/users.service';
import jwtDecode from 'jwt-decode';

export default {
    data() {
        return {
            store: userStore(),
            usersS: [],
            form: {
                emailChange: '',
                usernameChange: '',
                passwordChange: '',
                confirmPasswordChange: '',
                imageUrl: null,
            },
            userId: '',
            user: [],
        }
    },

    created() {
        this.usersS = this.store.users;

    },


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
                const users = await this.store.getUserById(id);
                this.user = users;
            } catch (error) {
                console.log(error);
            }
        },

        async updateUser(id) {
            
            try {
                await this.store.updateUser(id, {
                    username: this.form.usernameChange,
                    password: this.form.passwordChange,
                    confirmPassword: this.form.confirmPasswordChange,
                    email: this.form.emailChange,
                });
                
                this.$swal({
                    title: `Perfil atualizado com sucesso!`,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#F39C12',
                    onClose: false,
                }).then(() => {
                    this.$router.push('/perfil');
                });
            } catch (err) {
                this.$swal({
                    title: err,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#F39C12',
                });
            }
        },


        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.emailChange = ''
            this.form.usernameChange = ''
            this.form.passwordChange = ''
            this.form.confirmPasswordChange = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },

        uploadImage(event) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);

            if (this.store.getUserLogged()) {
                this.store.getUserLogged().photo = this.imageUrl;
            }
        },
    },

    async mounted(){
        this.getUserId();
        await this.getUser(this.userId);
        
    },
}
</script>

<style lang="scss" scoped>
.backgroundFundo {
    background-image: url("../assets/imgs/mainbg.svg");
    background-size: 1500px 2500px;
    height: auto;
    animation: gradient 30s infinite alternate linear;
}

@keyframes gradient {
    100% {
        background-size: 2000px 3000px;
    }
}

.mt-5 {
    margin-top: 0rem !important;

    line-height: 118px;
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

.foto {
    border: 5px solid #134077;
    border-radius: 25px;
    padding: 20px;
    margin: 20px;

}

#atualizarPerfil {
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

#cancelar {
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

#fotoAtual,
#novaFoto {
    font-family: 'Saira Condensed';
    font-style: normal;
    font-weight: 800;
    font-size: 30px;
    line-height: 47px;
    color: #F39C12;
}
</style>