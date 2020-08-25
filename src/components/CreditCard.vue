<template>
  <div>
    <form id="pay" @submit="doPay" name="pay">
      <div class="input-grp">
        <div class="input-with-label">
          <label>Nome</label>
          <input data-checkout="cardholderName" />
        </div>
        <div class="input-with-label">
          <label>CPF</label>
          <input v-mask="'###.###.###-##'" data-checkout="docNumber" />
        </div>
      </div>
      <div class="input-grp">
        <div class="input-with-label">
          <label>Número do cartão</label>
          <input @change="guessPaymentMethod" v-mask="'#### #### #### ####'" type="text" id="cardNumber" data-checkout="cardNumber" />
        </div>
        <div class="input-grp">
          <div class="input-with-label">
            <label>Mês do vencimento</label>
            <input v-mask="'##'" data-checkout="cardExpirationMonth" />
          </div>
          <div class="input-with-label">
            <label>Ano do vencimento</label>
            <input v-mask="'####'" data-checkout="cardExpirationYear" />
          </div>
        </div>
        <div class="input-grp">
          <div class="input-with-label">
            <label>Código de segurança</label>
            <input v-mask="'###'" data-checkout="securityCode" />
          </div>
        </div>
      </div>
      <input type="hidden" name="payment_method_id" id="payment_method_id" />
      <input type="hidden" id="docType" data-checkout="docType" value="CPF" />
      <button type="submit" class="submit-button">Enviar</button>
    </form>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask';
import '../assets/css/payment-method.css';

export default {
  directives: { mask },
  data() {
    return {
      paymentMethodId: '',
      cardToken: '',
    };
  },
  created() {
    window.Mercadopago.setPublishableKey('TEST-d9b460bc-c5e9-4033-be71-63afb5acbc70');
  },
  methods: {
    guessPaymentMethod() {
      const cardnumber = document.querySelector('#cardNumber').value;

      if (cardnumber.length >= 6) {
        const bin = cardnumber.substring(0, 6);

        window.Mercadopago.getPaymentMethod({
          bin,
        }, this.setPaymentMethod);
      }
    },
    setPaymentMethod(status, response) {
      if (status === 200) {
        const doc = document.querySelector('#payment_method_id');
        doc.value = response[0].id;

        this.paymentMethodId = response[0].id;
      } else {
        alert('Algum dado não foi digitado corretamente, verifique os dados e tente novamente');
      }
    },
    doPay(event) {
      event.preventDefault();

      const $form = document.querySelector('#pay');

      window.Mercadopago.createToken($form, this.sdkResponseHandler);
    },
    sdkResponseHandler(status, response) {
      if (status !== 200 && status !== 201) {
        alert('Algum dado não foi digitado corretamente, verifique os dados e tente novamente');
      } else {
        this.cardToken = response.id;

        const data = {
          token: this.cardToken,
          paymentMethodId: this.paymentMethodId,
        };

        this.$emit('pay', data, 'card');
      }
    },
  },
};
</script>
