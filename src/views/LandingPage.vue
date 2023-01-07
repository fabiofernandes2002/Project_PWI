<template>

  <div class="mainpage">

    <!------------------- SECTION 1 ----------------->
    <section id="section-1">

      <div class="title"> 
        <h1>PHOTORECYCLE</h1>
      </div>

      <div class="logo"> 
      </div>

      <div class="wrap"> <!-- Barra de pesquisa -->
        <div class="search">
          <input type="text" class="searchTerm" placeholder="Insira a localização...">
          <button type="submit" class="searchButton">
          </button>
        </div>
      </div>

      <div class="location"> <!-- Botão de localização -->
        <button type="submit" class="locationButton"><span>Utilizar Localização Atual</span></button>
      </div>

    </section>

    <!------------------- SECTION 2 ----------------->

    <section id="section-2">

      <div class="title2"> 
        <h1>O QUE É A RECICLAGEM?</h1>
      </div>

      <div class="line"> 

        <span class="circle-top"> 
          <span class="identificacao">1. IDENTIFICAÇÃO</span>
          <span class="ident-text">A primeira etapa da reciclagem já começa antes de os resíduos serem levados para os
            locais apropriados. Além de colocar no sítio correto, é preciso identificar as diferentes características
            dentro do mesmo tipo de resíduos. É preciso ainda verificar se os materiais estão em bom estado para serem
            reciclados.</span>
          <img id="ident-img" src="../assets/imgs/identificacao.png" alt="Identificação">
        </span>

        <span class="circle-bottom">
          <span class="fornecimento">4. FORNECIMENTO</span>
          <span class="forn-text">
            A etapa final destina-se apenas à pesquisa de potenciais compradores dos produtos transformados pós serem
            reciclados, nomeadamente arquitetos, designers e artistas.
          </span>
          <img id="forn-img" src="../assets/imgs/fornecimento.png" alt="Fornecimento">
        </span>

        <span class="circle-2">
          <span class="separacao">2. SEPARAÇÃO</span>
          <span class="sep-text">
            Na segunda etapa do processo da reciclagem, os catadores encarregam-se por separar os resíduos que têm
            potencial para reciclagem. Uma tarefa árdua, principalmente pela tentativa de reaproveitamento dos materiais
            misturados com outros.
          </span>
          <img id="sep-img" src="../assets/imgs/separacao.png" alt="Separação">
        </span>

        <span class="circle-3">
          <span class="descontaminacao">3. DESCONTAMINAÇÃO</span>
          <span class="descont-text">
            Uma tarefa difícil realizada nas cooperativas de catadores, é talvez a mais essencial neste grande processo
            pois determina a qualidade dos materiais recicláveis. Uma etapa desvalorizada e desajudada pois apenas as
            universidades contribuem para o fornecimento de máquinas para esta tarefa.
          </span>
          <img id="descont-img" src="../assets/imgs/descontaminacao.png" alt="Descontaminação">
        </span>
      </div>
    </section>

    <br>
    <br>
    
    <!------------------- SECTION 3 ----------------->
    <section id="section-3">

      <div class="title2">
        <h1>COMO RECICLAR?</h1>
      </div>

    </section>

    <!------------------- SECTION 4 ----------------->
    <section id="section-4">

      <div class="title2">
        <h1>MAPA DE ECOPONTOS</h1>
      </div>

    </section>

    <!-- MENU LATERAL -->
    <nav role="navigation">
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <a href="#section-1">
            <li>Página Inicial</li>
          </a>
          <a href="#section-2">
            <li>O que é a reciclagem?</li>
          </a>
          <a href="#section-3">
            <li>Como Reciclar?</li>
          </a>
          <a href="#section-4">
            <li>Mapa de Ecopontos</li>
          </a>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <hr>
          <a href="/login">
            <li>Iniciar Sessão</li>
          </a>
          <a href="/register">
            <li>Registar</li>
          </a>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@import "../assets/css/index.css";
</style>