<template>
  <div>
    <div class="nav-links">
      <router-link class="nav-link" to="/dash">
        <img src="@/assets/home.png" alt="icone da home" />
        <p>Home</p>
      </router-link>
      <router-link to="/dash/apostas" class="nav-link">
        <img src="@/assets/apostas.png" alt="icone de apostas" />
        <p>Apostas</p>
      </router-link>
      <router-link to="/dash/minhas-apostas" class="nav-link">
        <img src="@/assets/minhas_apostas.png" alt="icone de Minhas apostas" />
        <p to="/minhas-apostas">Minhas apostas</p>
      </router-link>
      <router-link to="/dash/creditos" class="nav-link">
        <img src="@/assets/credito.png" alt="icone de creditos" />
        <p>Créditos</p>
      </router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
