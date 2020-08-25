<template>
  <div class="user-dropdown"  v-bind:class="{ disabled: disabled }">
    <router-link to="/dash/usuario">Editar usuário</router-link>
    <a @click="logout">Sair</a>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    logout(e) {
      e.preventDefault();

      this.$store.commit('logout');

      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.user-dropdown {
  position: absolute;
  left: calc(100% - 150px);
  top: calc(0% + 75px);

  animation: 2s open;

  padding: 20px 10px;
  background-color: rgb(240, 121, 57);
  width: 110px;
  height: 50px;
  border-radius: 0px 0px 15px 15px;

  a {
    text-align: left;
    display: block;

    margin-bottom: 5px;

    cursor: pointer;
  }
}

.disabled {
  opacity: 0;
  pointer-events: none;
}

@keyframes open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
