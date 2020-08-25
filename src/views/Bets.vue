<template>
  <div class="page">
    <h1>Apostas</h1>
    <div class="cards-container">
      <Card v-for="card in cards" v-bind:key="card">
        <div class="card-header">
          <div class="header">
            <h3>1º</h3>
            <p>Rodada</p>
          </div>
        </div>
        <div class="card-body">
          <div>
            Participantes:
            <strong>10</strong>
          </div>
          <div>
            Permiação:
            <strong>R$ 1.200,00</strong>
          </div>
          <div class="card-price">
            <p>Valor: </p>
            <div class="value">
              <h3>R$</h3>
              <h1>10</h1>
              <h3>,00</h3>
            </div>
          </div>
        </div>
        <div class="card-button">
          <button>apostar</button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card.vue';

export default {
  data() {
    return {
      cards: new Array(8),
    };
  },
  components: { Card },
};
</script>

<style lang="scss" scoped>
* {
  color: white;
}

.cards-container {
  margin-top: 60px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  justify-content: center;
  align-items: center;
  gap: 60px 30px;

  .card-header {
    position: absolute;
    top: calc(0% - 37.5px);
    left: calc(50% - 37.5px);
    width: 75px;
    background-color: #d85430;
    height: 75px;
    border-radius: 37.5px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .header {
      color: white;
    }
  }

  .card-button {
    position: absolute;
    bottom: calc(0% - 15px);
    left: calc(50% - 75px);

    button {
      width: 150px;
      height: 30px;
      background-color: #d85430;
      border: none;
      border-radius: 25px;
      transition: 250ms;
      cursor: pointer;

      text-transform: uppercase;
      font-weight: 900;
      font-size: 18px;
    }

    button:hover {
      background-color: white;
      color: #d85430;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .card-price {
    margin: 10px 0px -20px 0px;

    background-color: #d85430;
    width: fit-content;
    padding: 5px 15px;
    border-radius: 1rem;

    p {
      text-align: left;
      font-size: 12px;
    }

    .value {
      display: flex;
      align-items: center;

      h3 {
        font-size: 16px;
      }

      h1 {
        font-size: 30px;
        line-height: 25px;
      }
    }
  }
}
</style>
