<template>
  <div class="container" v-bind:class="{ loading: loading }">
      <form v-on:submit.prevent method="POST" class="auth-form">
        <button
          style="background-color: rgb(240, 121, 57); color: white; padding: 5px; border: none; border-radius: 15px;font-size: 18px;margin: 10px;"
          class="edit_button"
          @click="editMode = !editMode"
        >{{ editMode ? 'Editar' : 'Parar edição de' }} usuário</button>
        <div class="auth-img">
          <div>
            <img :src="[imageBlob || userDefaultImg]" id="preview-img" />
          </div>
        </div>
        <input ref="fileInput" class="auth-input-file" type="file" name="file" />
        <label class="auth-label">NOME COMPLETO</label>
        <input v-model="name" class="auth-input" type="text" name="name" :disabled=editMode />
        <label class="auth-label">EMAIL</label>
        <input v-model="mail" class="auth-input" type="text" name="mail" disabled />
        <!-- <label class="auth-label">SENHA</label> -->
        <!-- <input v-model="password" class="auth-input" type="password" name="password" /> -->
        <label class="auth-label">NOME DO TIME</label>
        <input v-model="time" class="auth-input" type="text" name="time_name" :disabled=editMode />
        <label class="auth-label">CIDADE</label>
        <input v-model="city" class="auth-input" type="text" name="city" :disabled=editMode />
        <label class="auth-label">TELEFONE</label>
        <input v-model="phone" v-mask="'(##) 9####-####'" class="auth-input" type="text" name="phone" :disabled=editMode />
        <input v-on:click="updateUser" v-if="!editMode" class="auth-submit" type="submit" value="CONFIRMAR" />
      </form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import userDefaultImg from '../assets/user.png';

export default {
  directives: { mask },
  data() {
    return {
      editMode: 1,
      loading: false,
      name: this.$store.state.auth.data?.user.name,
      city: this.$store.state.auth.data?.user.city,
      mail: this.$store.state.auth.data?.user.mail,
      phone: this.$store.state.auth.data?.user.phone,
      time: this.$store.state.auth.data?.user.time,
      userDefaultImg,
      imageBlob: this.$store.state.auth.data?.user.img?.actualName && `http://localhost:3000/profile/${this.$store.state.auth.data?.user.img?.actualName}`,
    };
  },
  methods: {
    updateUser() {
      this.editMode = true;

      this.$store.dispatch('updateUser', {
        name: this.name,
        phone: this.phone,
        city: this.city,
        time: this.time,
      });

      this.$toast.open({
        message: 'Usuário atualizado com sucesso',
        type: 'success',
      });
    },
  },
};
</script>

<style scoped src="@/assets/css/auth.css">
.container {
  height: 100%;
  width: 100%;
}

.edit_button {
  width: 75px;
  background-image: rgb(240, 121, 57);
  color: white;
}
</style>
