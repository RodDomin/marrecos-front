<template>
  <div class="container" v-bind:class="{ loading: loading }">
    <h1 style="color: white; padding: 50px">+ créditos</h1>
    <div class="cards">
      <Card>
        <div class="pass">
          <div class="pass-number">
            <h2>1º</h2>
          </div>
          <div class="pass-info">
            <h2>valor</h2>
            <p>Selecione o valor</p>
          </div>
        </div>
        <div>
          <ul>
            <li
              v-for="price in prices"
              v-bind:key="price.value"
              v-bind:class="{ active: price.checked }"
              v-on:click="price.checked = !price.checked"
            >
              <h3>
                R$
                <h2>{{ price.value }}</h2>,00
              </h3>
            </li>
          </ul>
        </div>
      </Card>
      <Card>
        <div class="pass">
          <div class="pass-number">
            <h2>2º</h2>
          </div>
          <div class="pass-info">
            <h2>pagameto</h2>
            <p>Selecione a forma de pagamento</p>
          </div>
        </div>
        <div class="payment">
          <div class="payment-div" v-for="method in paymentMethods" v-bind:key="method.name">
            <input
              type="radio"
              name="method.name"
              v-on:click="current = method"
              :checked="method.name === current.name"
            />
            <label for="method.name">{{ method.text }}</label>
          </div>
        </div>
        <component v-bind:is="current.component" v-on:pay="pay"></component>
      </Card>
    </div>
  </div>
</template>

<script>
import { HttpApiService } from '@/services/HttpApiService';
import Card from '../components/Card.vue';
import CreditCard from '../components/CreditCard.vue';
import Boleto from '../components/Boleto.vue';

export default {
  components: {
    Card,
    CreditCard,
    Boleto,
  },
  data() {
    return {
      loading: false,
      httpService: new HttpApiService({ useDefaultApiRoute: false }),
      paymentMethods: [
        {
          text: 'Cartão de crédito',
          name: 'credit_card',
          component: CreditCard,
          clicked: true,
        },
        {
          text: 'Boleto bancário',
          name: 'boleto',
          component: Boleto,
          clicked: false,
        },
      ],
      current: {
        text: 'Cartão de crédito',
        name: 'credit_card',
        component: CreditCard,
        clicked: true,
      },
      prices: [
        { value: 10, checked: false },
        { value: 20, checked: false },
        { value: 30, checked: false },
        { value: 50, checked: false },
      ],
    };
  },
  methods: {
    changePaymentMethod(name) {
      const index = this.paymentMethods.findIndex(
        (method) => name === method.name,
      );

      if (index === -1) {
        throw new Error('Payment method does not exists');
      }

      this.paymentMethods.forEach((each) => {
        each.clicked = false;
      });

      this.paymentMethods[index].clicked = true;

      this.current = this.paymentMethods[index];
    },
    async pay(data, model) {
      this.loading = true;
      let amount = this.prices.filter((each) => each.checked);
      amount = amount.reduce((acc, el) => acc + el.value, 0);

      if (amount === 0) {
        alert('Você deve selecionar pelo menos 1 dos valores');
        this.loading = false;
        return;
      }

      const requestData = {
        ...data,
        amount,
      };

      try {
        this.httpService.setToken(this.$store.state.auth.data.token);
        if (model === 'card') {
          await this.httpService.post('/payment/card', requestData);
          alert('Seu pagamento está sendo processado, assim que confirmado seu crédito estará disponível');
        } else {
          const response = await this.httpService.post('/payment/boleto', requestData);

          window.open(response.boletoUrl, '_blank');
          alert('Seu boleto foi gerado');
        }
      } catch (err) {
        console.log(err);
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.loading {
  cursor: wait;
}

h1,
h2,
h3 {
  text-transform: uppercase;
}

.container {
  height: 100%;
}

.cards {
  height: 60%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.payment {
  display: flex;
  justify-content: center;
}

.payment .payment-div {
  margin: 0 10px;
  color: white;
}

.paymeny > input {
  width: 15px;
  height: 15px;
}

ul {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 25px;
}

.pass {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 25px;
}

.pass-number {
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: white;
  color: #f07939;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-size: 26px;
}

.pass-info {
  text-align: left;
  color: white;
}

li {
  padding: 10px;
  background-color: white;
  color: #f07939;
  border-radius: 15px;
  cursor: pointer;

  transition: 250ms;
}

li:hover {
  background-color: #f07939;
  color: white;
}

li > h3 {
  display: flex;
  justify-content: center;
  align-items: center;
}

ul,
li {
  list-style: none;
}

.active {
  background-color: #f07939;
  color: white;
}
</style>
