<template>
  <div class="container">
    <div class="auth-center">
      <form @submit="register" method="POST" class="auth-form">
        <div class="alert alert-danger d-none" role="alert"></div>
        <div class="auth-img" @click="changeImg">
          <div>
            <img :src="[imageBlob || userDefaultImg]" id="preview-img" />
          </div>
        </div>
        <input @change="handleChangeImg" ref="fileInput" class="auth-input-file" type="file" name="file" />
        <label class="auth-label">NOME COMPLETO</label>
        <input v-model="name" class="auth-input" type="text" name="name" />
        <label class="auth-label">EMAIL</label>
        <input v-model="mail" class="auth-input" type="text" name="mail" />
        <label class="auth-label">SENHA</label>
        <input v-model="password" class="auth-input" type="password" name="password" />
        <label class="auth-label">NOME DO TIME</label>
        <input v-model="time" class="auth-input" type="text" name="time_name" />
        <label class="auth-label">CIDADE</label>
        <input v-model="city" class="auth-input" type="text" name="city" />
        <label class="auth-label">TELEFONE</label>
        <input v-model="phone" v-mask="'(##) 9####-####'" class="auth-input" type="text" name="phone" />
        <input class="auth-submit" type="submit" value="INSCREVER-SE" />
        <div style="margin: 15px;color: white;">
          <input type="checkbox" v-model="accepted" />
          <label>Aceitar os <strong><a>Termos de uso</a></strong></label>
        </div>
        <router-link style="float: left; margin: 10px;color: white;" to="/login">Ja tenho uma conta</router-link>
      </form>
    </div>
  </div>
</template>

<script>
// TODO: Colocar link dos termos de uso
import { mask } from 'vue-the-mask';
import userDefaultImg from '../assets/user.png';

export default {
  directives: { mask },
  data() {
    return {
      name: '',
      mail: '',
      password: '',
      city: '',
      phone: '',
      time: '',
      file: undefined,
      userDefaultImg,
      imageBlob: undefined,
      accepted: false,
    };
  },
  methods: {
    async register(e) {
      e.preventDefault();

      const data = {
        name: this.name,
        mail: this.mail,
        phone: this.phone,
        password: this.password,
        city: this.city,
        time: this.time,
      };

      await this.$store.dispatch('doRegister', data);

      if (this.imageBlob) {
        await this.$store.dispatch('sendPhoto', this.$refs.fileInput);
      }

      this.$router.push('/dash');
    },
    changeImg() {
      this.$refs.fileInput.click();
    },
    async handleChangeImg() {
      const file = this.$refs.fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (readerResult) => {
        this.imageBlob = readerResult.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped src="@/assets/css/auth.css">
</style>
