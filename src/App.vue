<template>
  <div class="proj-app">
  <Header />
  <div id="app">
    <div v-if="userLogged">
    <div class="nav-links">
      <router-link class="nav-link" to="/dash">
        <img src="@/assets/home.png" alt="icone da home" />
        <p>Home</p>
      </router-link>
      <router-link to="/dash/apostas" class="nav-link">
        <img src="@/assets/apostas.png" alt="icone de apostas">
        <p >Apostas</p>
      </router-link>
      <router-link to="/dash/minhas-apostas" class="nav-link">
        <img src="@/assets/minhas_apostas.png" alt="icone de Minhas apostas">
        <p to="/minhas-apostas">Minhas apostas</p>
      </router-link>
      <router-link to="/dash/creditos" class="nav-link">
        <img src="@/assets/credito.png" alt="icone de creditos">
        <p>Créditos</p>
      </router-link>
    </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },
  computed: {
    userLogged() {
      return this.$store.state.auth.data;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.proj-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-height: 100vh;

  background-image: url('./assets/fundo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

#app {
  display: flex;
}

.content {
  width: 100%;
  max-height: calc(100vh - 75px);
  overflow-y: scroll;
}

#nav {
  padding: 30px;
}

.nav-links a {
  text-decoration: none;
  color: rgb(240, 121, 57);
  font-size: 18px;
  text-align: left;

  margin-left: 5px;
  max-width: 110px;
}

.nav-link {
  margin: 30px 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link img {
  width: 25px;
  height: 25px;
}

.nav-links {
  background-color: rgba(0, 0, 0, 0.5);
  height: calc(100vh - 75px);
  padding-left: 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 550px) {
  #app {
    flex-direction: column;
    max-height: calc(100vh - 75px);
  }

  .nav-links {
    padding: 0;
    height: 75px;
    flex-direction: row;
    justify-content: space-around;
  }

  .nav-link > p {
    display: none;
    margin: 0;
  }
}
</style>
