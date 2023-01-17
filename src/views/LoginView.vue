<template>
   <div class="backgroundFundo">
    <b-container fluid>
      <b-row class="mt-5 ">
        <b-col cols="12 my-3" md="6" class="b-col border-right">
          <h1 class="loginTitle">Login</h1>
          <h3 class="textLogin">Insere os teus dados para continuares a tua aventura <span id="textLogin2">no mundo da
              reciclagem!</span> </h3>

          <div class="formulario" id="forms">

            <b-col cols="6" md="10" class="mt-3">
              <b-form @submit="onSubmit">
                <b-form-group label-for="email-input">
                  <b-form-input type="text" id="email-input" v-model="form.email" placeholder="Username ou email"
                    required></b-form-input>
                </b-form-group>
                <b-form-group label-for="password-input">
                  <b-form-input type="password" id="password-input" v-model="form.password" placeholder="Password"
                    required></b-form-input>
                </b-form-group><br>
                <b-button block variant="primary" type="submit" id="bntLogin" @click="login">Login</b-button>
              </b-form>
            </b-col>
          </div>
        </b-col>

        <b-col cols="12" md="6" class="logoImage">
          <!-- buscar minha imagem do logo -->
          <b-img src="src/assets/imgs/logo_acabado.png" alt="Logo" id="logo"></b-img>
          <h1 class="logoName">Photo Recycle</h1>

          <!-- link de ainda não tiver conta -->
          <b-link href="/register" id="linkCriarConta" style="color: #fff;">Ainda não tens conta? <span id="registerLink">Crie
              conta!</span></b-link>
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
      usersS: [],
      form: {
        email: '',
        username: '',
        password: ''
      }
    }
  },

  created() {
    this.usersS = this.store.users;

  },



  methods: {
    onSubmit(event) {
      
      event.preventDefault();
      const data = {
        email: this.form.email,
        username: this.form.username,
        password: this.form.password
      }

      const user = this.usersS.find(user => user.email === data.email && user.password === data.password);

      // chamar a função loginWithUsername
      //this.loginWithUsername();

      if (user) {
        //this.store.login(user); // login user in store and save it in local storage
        //alert('Login efetuado com sucesso');
        // usar o SweetAlert para mostrar a mensagem de sucesso
        this.$swal({
          title: 'Login efetuado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F39C12',
          onClose: false,
        }).then(() => {
          // o código aqui será executado após o usuário clicar no botão de confirmação
          this.$router.push('/LandingPage');
        });
        //this.$router.push('/LandingPage');

        // guardar o utilizador na session storage para poder ser usado em outras páginas
        sessionStorage.setItem('user', JSON.stringify(user));

        //localStorage.setItem('user', JSON.stringify(user));
      } else {
        //alert('Email ou password incorretos');
        // usar o SweetAlert para mostrar a mensagem de erro
        this.$swal({
          title: 'Email ou password incorretos!',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F39C12',
        });
      }
  
      }

    }
  }


    /* loginWithUsername() {
      const user = this.users.find(user => user.username === this.users.username && user.password === this.users.password);

      if (user) {
        this.$swal({
          title: 'Login efetuado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F39C12',
          onClose: false,
        }).then(() => {
          // o código aqui será executado após o usuário clicar no botão de confirmação
          this.$router.push('/LandingPage');
        });
      } else {
        this.$swal({
          title: 'Email ou password incorretos!',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F39C12',
        });
      }

    } */


</script>

<style scoped>
.backgroundFundo {
  background-image: url("../assets/imgs/mainbg.svg");
  background-repeat: no-repeat;
  background-size: 1500px 2500px;
  height: 100vh;
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

.textLogin {
  font-family: 'Saira Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 55px;
  text-align: center;
  color: #fff;
}



.logoName {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;

  /* boldhead font para o logo */
  font-family: 'Bebas Neue', cursive;
}

/* Posicinar a imagem do logo e o logoName mais para a direita */
@media (max-width: 576px) {

  #logo {
    margin-right: 10px;
    width: 50px;
  }
}

/* centrar o textLogin */
.textLogin {
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

/* centrar o loginTitle */
.loginTitle {
  text-align: center;
  color:#fff
}

/* centrar o botão login */
.b-button {
  text-align: center;
}

/* centrar o link */
#linkCriarConta {
  text-align: center;
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

#logo {
  width: 20%;
  height: 25%;
}

.logoName {
  margin-top: 20px;
  font-family: 'Boldhead';
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

/* Quando a minha tela tiver uma largura de 764 a minha linha horizontal b-col.border-right passa para vertical e diminui o tamanho da linha */
@media (max-width: 764px) {
  .b-col.border-right {
    border-right: none !important;
    border-bottom: 2px solid #F39C12 !important;
  }
}
</style>