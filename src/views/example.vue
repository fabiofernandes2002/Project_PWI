
<template>
  <div>
    <!-- titulo e subtitulo -->
    <b-row>
      <div class="title mx-auto">
        <b-col cols="6">
          <h1 class="loginTitle">Login</h1>
          <h3 class="textLogin">Insere os teus dados para continuares a tua aventura no mundo da reciclagem</h3>
        </b-col>
      </div>
    </b-row><br>
    <b-row>
      <div class="formulario mx-auto b-col border-right" style="border-color: red;">
        <b-col>
          <b-form-group label-for="email-input">
            <b-form-input type="email" id="email-input" v-model="email" placeholder="Username ou email"
              required></b-form-input>
          </b-form-group>
        </b-col>
        <br>
        <b-col>
          <b-form-group label-for="password-input">
            <b-form-input type="password" id="password-input" v-model="password" placeholder="Password"
              required></b-form-input>
          </b-form-group><br>
          <b-button block variant="primary">Login</b-button>
        </b-col>
      </div>
    <!-- <div class="w-100">
        <hr>
        </div> -->
      <div class="logoEName text-right b-col">
        <b-col cols="6" class="logoImage">
          <!-- buscar minha imagem do logo -->
          <b-img src="src/assets/imgs/logo_acabado.png" alt="Logo" id="logo"></b-img>
          <h1 class="logoName">Photo Recycle</h1>

          <!-- link de ainda não tiver conta -->
          <b-link href="/register" id="linkCriarConta">Ainda não tens conta? <span id="registerLink">Crie
              conta!</span></b-link>
        </b-col>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
}
</script>

<style>
.logoImage {
  text-align: center;
}

#logo {
  width: 125px;
  height: 125px;
}

.logoName {
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
}

/* Posicinar a imagem do logo e o logoName mais para a direita */
@media (min-width: 576px) {
  .logoImage {
    text-align: right;
    text-align: center;

  }

  #logo {
    margin-right: 10px;
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
}

/* fazer a quebra de linha do registarLink e centrar */
#registerLink {
  display: block;
  text-align: center;
}

/* email-input com borda a amarela */
#email-input {
  border-color: #F39C12;
}

/* password-input com borda a amarela */
#password-input {
  border-color: #F39C12;
}
</style>