<template>

  <section id="section-1">
    <!-- TÍTULO -->
    <div class="title">
      <h1>PHOTORECYCLE</h1>
    </div>
    
    <div class="logo">
    </div>

    <!-- BARRA DE PESQUISA -->
    <div class="wrap">
      <div class="search">
        <input type="text" class="searchTerm" placeholder="Insira a localização...">
        <button type="submit" class="searchButton">
        </button>
      </div>
    </div>

  </section>

  <section id="section-2">
    <div class="title">
      <h1>O QUE É A RECICLAGEM?</h1>
    </div>
    <div class="line">
      <span class="circle-top"></span>
      <span class="circle-bottom"></span>
      <span class="circle-2"></span>
      <span class="circle-3"></span>
    </div>
  </section>

  <section id="section-3">
    <div class="title">
      <h1>MAPA DE ECOPONTOS</h1>
    </div>
  </section>

  <section id="section-4">
    <div class="title">
      <h1>LEADERBOARD</h1>
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
          <li>Mapa de Ecopontos</li>
        </a>
        <a href="#section-4">
          <li>Leaderboard</li>
        </a>
      </ul>
    </div>
  </nav>

</template>

<style scoped>
@import "../assets/css/index.css";
</style>