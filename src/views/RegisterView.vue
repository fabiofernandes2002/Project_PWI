<template>
  <div class="registerPage">
    <b-container fluid>
      <b-row>
        <b-col cols="12 my-3" md="6" class="b-col border-right">
          <h1 class="loginTitle">Regista-te</h1>
          <h3 class="textLogin">Regista já os teus dados pessoais para entrares <span id="textLogin2">no mundo da
              reciclagem!</span></h3>

          <div class="formulario mx-auto " id="forms" style="border-color: red;">

            <b-col cols="6" md="10" class="mt-3">
              <b-form @submit="onSubmit">
                <!-- input username -->
                <b-form-group label-for="username-input">
                  <b-form-input type="text" id="username-input" class="user" v-model="form.username"
                    placeholder="Username" required></b-form-input>
                </b-form-group>
                <!-- input email -->
                <b-form-group label-for="email-input">
                  <b-form-input type="email" id="email-input" v-model="form.email" placeholder="Email"
                    required></b-form-input>
                </b-form-group>
                <!-- Data de Nascimento -->
                <b-form-group label-for="datanascimento-input">
                  <b-form-input type="date" id="datanascimento-input" v-model="form.dataNascimento"
                    placeholder="Data de Nascimento" required></b-form-input>
                </b-form-group>
                <!-- input morada -->
                <b-form-group label-for="morada-input">
                  <b-form-input type="text" id="morada-input" v-model="form.morada" placeholder="Morada"
                    required></b-form-input>
                </b-form-group>
                <!-- input localidade -->
                <b-form-group label-for="localidade-input">
                  <b-form-input type="text" id="localidade-input" v-model="form.localidade" placeholder="Localidade"
                    required></b-form-input>
                </b-form-group>
                <!-- input codigo postal number type -->
                <b-form-group label-for="codigopostal-input">
                  <b-form-input type="text" id="codigopostal-input" v-model="form.codigoPostal"
                    placeholder="Codigo Postal" required></b-form-input>
                </b-form-group>

                <b-form-group label-for="password-input">
                  <b-form-input type="password" id="password-input" v-model="form.password" placeholder="Password"
                    required></b-form-input>
                </b-form-group>
                <!-- input confirmar password -->
                <b-form-group label-for="confirmarpassword-input">
                  <b-form-input type="password" id="confirmarpassword-input" v-model="form.confirmPassword"
                    placeholder="Confirmar Password" required></b-form-input>
                </b-form-group>
                <br>
                <b-button block variant="primary" type="submit" id="bntLogin" @click="registo">Registar</b-button>
              </b-form>
            </b-col>
          </div>
        </b-col>

        <b-col cols="12" md="6" class="logoImage">
          <!-- buscar minha imagem do logo -->
          <b-img src="src/assets/imgs/logo_acabado.webp" alt="Logo" id="logo"></b-img>
          <h1 class="logoName">Photo Recycle</h1>

          <!-- link de ainda não tiver conta -->
          <b-link href="/login" id="linkCriarConta" style="color: #fff;">Já tens uma conta? <span id="registerLink">Faz
              já
              login!</span></b-link>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import { userStore } from '@/stores/user.js'
export default {

  name: "RegisterView",
  data() {
    return {
      store: userStore(),
      usersS: [],
      form: {
        username: "",
        email: "",
        dataNascimento: "",
        morada: "",
        localidade: "",
        codigoPostal: "",
        password: "",
        confirmPassword: "",
        ecopontosRegistados: 0,
      },
    };

  },

  /* methods: {
    onSubmit() {
      this.store.register(this.form.username, this.form.email, this.form.password, this.form.confirmarpassword, this.form.datanascimento, this.form.morada, this.form.localidade, this.form.postalCode)
      //this.router.push('/login')
    }
  }, */

  // guardar os dados do utilizador registado na local storage
  created() {
    //this.usersS = this.store.users;  

    // carregar o array de users na local storage

    if (localStorage.getItem('users') == null) {
      localStorage.setItem('users', JSON.stringify(this.store.users));
    } else {
      this.store.users = JSON.parse(localStorage.getItem('users'));
    }

  },




  methods: {
    async registo(event) {
      try {
        event.preventDefault();
        await this.store.registo({
          username: this.form.username,
          password: this.form.password,
          confirmPassword: this.form.confirmPassword,
          email: this.form.email,
          dataNascimento: this.form.dataNascimento,
          morada: this.form.morada,
          localidade: this.form.localidade,
          codigoPostal: this.form.codigoPostal,
          tipo: this.form.tipo,
        });
        console.log(this.form.password);
        console.log(this.form.confirmPassword);
      } catch (err) {
        console.log(err);
      }
    },
/*     onSubmit(event) {
      event.preventDefault()

      const data = {
        // incrementar o id do utilizador
        id: this.store.users.length + 1,
        username: this.form.username,
        email: this.form.email,
        dataNascimento: this.form.datanascimento,
        morada: this.form.morada,
        localidade: this.form.localidade,
        codigoPostal: this.form.codigopostal,
        password: this.form.password,
        confirmarpassword: this.form.confirmarpassword,
        photo: '',
        tipo: 'userNormal',
        pontos: 0,
        medalhas: [],
        ecopontosUtilizados: 0,
        desafios: [],
        diaSemana: '',
        classificacao: 0,
        ecopontosRegistados: 0,
      }


      // se a password for igual a confirmar password e o username não existir, guardar os dados do utilizador na local storage
      if (this.passwordVerify(data.password, data.confirmarpassword) && this.usernameExists(data.username)) {
        this.store.users.push(data)
        this.$swal({
          title: 'Registado com sucesso!',
          text: 'Bem vindo à Photo Recycle!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        //alert('Registado com sucesso! Bem vindo à Photo Recycle!')
        // redirecionar para a página de login
        this.$router.push('/login')
        // enviar os dados para a local storage no array users
        //localStorage.setItem('usersS', JSON.stringify(this.usersS))
        localStorage.setItem('users', JSON.stringify(this.store.users))



      }
    },


    // verificar se o username já existe de acordo com a os dados da store
    usernameExists(username) {
      const users = this.store.users.find(user => user.username === username)
      if (users) {
        this.$swal({
          title: 'Username já existe!',
          text: 'Por favor escolha outro username!',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        //alert('Username já existe! Por favor escolha outro username!')
        return false
      } else {
        return true
      }
    },



    // verificar se a password é igual a confirmar password
    passwordVerify(password, confirmarpassword) {
      if (password !== confirmarpassword) {
        this.$swal({
          title: 'Password não é igual!',
          text: 'Por favor verifique a sua password!',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        //alert('Password não é igual! Por favor verifique a sua password!')
        return false
      } else {
        return true
      }
    },*/
  },
}

</script>

<style scoped>
.registerPage {
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

.logoImage {
  text-align: center;
}

.loginTitle {
  color: #FFFFFF;
  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 118px;
}

.textLogin {
  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 55px;
  text-align: center;
  color: #FFFFFF;
}




/* Posicinar a imagem do logo e o logoName mais para a direita */
@media (max-width: 576px) {

  #logo {
    margin-right: 10px;
    width: 70px;
    height: 70px;
  }
}


/* centrar o textLogin */
.textLogin {
  text-align: center;
}

/* centrar o loginTitle */
.loginTitle {
  text-align: center;
}

/* centrar o botão login */
.b-button {
  text-align: center;
}

/* centrar o link */
#linkCriarConta {
  text-align: center;
  color: #fff;
}

/* fazer a quebra de linha do registarLink e centrar */
#registerLink {
  display: block;
  text-align: center;
}

#textLogin2 {
  display: block;
  text-align: center;
}

/* email-input com borda a amarela */
#email-input {
  border: 4px solid #F39C12;
  border-radius: 10px;
  box-sizing: border-box;


  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 20px;
}

#username-input,
#morada-input,
#localidade-input,
#codigopostal-input,
#confirmarpassword-input,
#datanascimento-input {
  border: 4px solid #F39C12;
  border-radius: 10px;
  box-sizing: border-box;


  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 20px;
}

/* password-input com borda a amarela */
#password-input {
  border: 4px solid #F39C12;
  border-radius: 10px;
  box-sizing: border-box;


  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 20px;
}

#forms {
  display: flex;
  align-items: center;
  justify-content: center;
}

#bntLogin {
  background-color: #E74C3C;
  border-color: #fff;
  border-radius: 10px;

  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 20px;

  width: 100%;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
}

#bntLogin:hover {
  background-color: #fff;
  border-color: #E74C3C;
  color: #E74C3C;
}

.logoImage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.logoName {
  margin-top: 20px;
  font-family: 'Boldhead';
  color: #fff;
}

#logo {
  width: 20%;
  height: 15%;
}

#linkCriarConta {
  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 20px;
  color: #000;
  margin-top: 20px;
}

#registerLink {
  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 20px;
  color: #E74C3C;
  margin-top: 20px;
}

.b-col.border-right {
  border-right: 2px solid #F39C12 !important;
}

.form-control:focus {
  box-shadow: none;
}

@media (max-width: 764px) {
  .b-col.border-right {
    border-right: none !important;
    border-bottom: 2px solid #F39C12 !important;
  }
}
</style>