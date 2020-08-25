<template>
  <div>
    <form @submit="sendData">
      <div class="input-grp">
        <div class="input-with-label">
          <label>CEP</label>
          <input v-model="cep" @change="findCEP"  v-mask="'#####-###'" />
        </div>
        <div class="input-with-label">
          <label>CPF</label>
          <input v-mask="'###.###.###-##'" v-model="cpf" />
        </div>
      </div>
      <div class="input-grp">
        <div class="input-with-label">
          <label>Cidade/Estado</label>
          <input v-model="city" />
        </div>
        <div class="input-with-label">
          <label>Bairro</label>
          <input v-model="neighborhood" />
        </div>
      </div>
      <div class="input-grp">
        <div class="input-with-label">
          <label>Rua</label>
          <input v-model="street" />
        </div>
        <div class="input-grp">
          <div class="input-with-label">
            <label>Número</label>
            <input v-model="streetNumber" />
          </div>
          <div class="input-with-label">
            <label>Complemento</label>
            <input />
          </div>
        </div>
      </div>
    <button type="submit" class="submit-button">Enviar</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mask } from 'vue-the-mask';
import { HttpService } from '../services/HttpService';
import '../assets/css/payment-method.css';

export default Vue.extend({
  data() {
    return {
      cep: '',
      street: '',
      streetNumber: '',
      federalUnit: '',
      city: '',
      cpf: '',
      neighborhood: '',
      httpService: new HttpService(),
    };
  },
  directives: { mask },
  methods: {
    async findCEP() {
      const response = await this.httpService.get(`https://viacep.com.br/ws/${this.cep}/json`);

      this.street = response.logradouro;
      this.city = response.localidade;
      this.federalUnit = response.uf;
      this.neighborhood = response.bairro;
    },
    async sendData(e: Event) {
      e.preventDefault();

      const data = {
        cpf: this.cpf,
        cep: this.cep,
        street: this.street,
        streetNumber: this.streetNumber,
        federalUnit: this.federalUnit,
        city: this.city,
      };

      this.$emit('pay', data);
    },
  },
});
</script>
