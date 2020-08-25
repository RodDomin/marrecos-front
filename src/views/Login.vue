<template>
<div class="container">
  <div class="auth-center">
    <form @submit="login" class="auth-form">
      <label class="auth-label">EMAIL</label>
      <input v-model="mail" class="auth-input" type="text" name="mail" />
      <label class="auth-label">SENHA</label>
      <input v-model="password" class="auth-input" type="password" name="password" />
      <input class="auth-submit" type="submit" value="Realizar o login">
      <router-link style="float: left; margin: 10px;color: white;" to="/register">Ainda não possui uma conta?</router-link>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      mail: '',
      password: '',
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();

      const obj = {
        mail: this.mail,
        password: this.password,
      };
      try {
        await this.$store.dispatch('doLogin', obj);

        this.$router.push('/dash');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped src="@/assets/css/auth.css">
</style>
