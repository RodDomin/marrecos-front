<template>
  <header>
    <div class="header-container">
      <div class="header-links">
        <img class="header-logo" src="../assets/logo.png" alt="logo" />
        <div class="links">
          <a href="#">Home</a>
          <a href="#">Dicas</a>
          <a href="#">Apostas</a>
        </div>
      </div>
      <div style="display: flex; flex-direction: row">
        <div v-if="authUser" class="card-price" style="margin-right: 50px;">
          <p>Valor:</p>
          <div class="value">
            <h3>R$</h3>
            <h1>{{ getCredits }}</h1>
            <h3>,00</h3>
          </div>
        </div>
        <div v-on:click="disabledDrop = !disabledDrop" class="auth-container">
          <p class="mr-2">{{ userName }}</p>
          <img class="login-logo" :src="[img]" alt="foto de usuário" />
        </div>
        <div class="burguer-menu" v-on:click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="48"
            height="48"
            viewBox="0 0 172 172"
            style=" fill:#000000;"
          >
            <g
              fill="none"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <path d="M0,172v-172h172v172z" fill="none" />
              <g fill="#ffffff">
                <path
                  d="M0,14.33333v14.33333h172v-14.33333zM0,78.83333v14.33333h172v-14.33333zM0,143.33333v14.33333h172v-14.33333z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div v-bind:class="open ? 'sub-menu' : 'd-none'" id="sub-menu">
      <div class="sub-menu-links">
        <a href="#">Home</a>
        <a href="#">Dicas</a>
        <a href="#">Apostas</a>
      </div>
      <div class="sub-menu-auth-container">
        <a href="/login" class="mr-2">{{ userName }}</a>
        <img class="login-logo" src="../assets/user.png" alt="foto de usuário" />
      </div>
      <div class="close" v-on:click="close">X</div>
    </div>
    <drop-down v-bind:disabled="disabledDrop" />
  </header>
</template>

<script>
import DropDown from './DropDown.vue';
import UserDefaultImg from '../assets/user.png';

export default {
  components: {
    DropDown,
  },
  data() {
    return {
      open: false,
      disabledDrop: true,
      user: this.$store.state.auth?.data?.user,
      img: UserDefaultImg,
    };
  },
  computed: {
    authUser() {
      return this.$store.state.auth.data;
    },
    getCredits() {
      return this.$store.state.credits;
    },
    userName() {
      return this.$store.getters.getUserName ?? 'Entrar';
    },
  },
  created() {
    this.unwatch = this.$store.subscribe(
      (_, state) => {
        const { data } = state.auth;
        this.user = data?.user;

        this.img = data?.user?.img ? `http://localhost:3000/profile/${this.user.img.actualName}` : UserDefaultImg;
      },
    );
  },
  beforeDestroy() {
    this.unwatch();
  },
  methods: {
    imgUrl() {
      if (this.user?.img) {
        return `http://localhost:3000/profile/${this.user.img.actualName}`;
      }

      return UserDefaultImg;
    },
    close() {
      this.open = !this.open;
    },
    changeDrop() {
      this.disabledDrop = !this.disabledDrop;
    },
  },
};
</script>

<style lang="scss" scoped>
  .card-price {
    margin: 10px 0px -20px 0px;
    height: 40px;

    background-color: rgb(255, 255, 255);
    color: #858585;
    width: fit-content;
    padding: 5px 15px;
    border-radius: 1rem;

    p {
      text-align: left;
      font-size: 12px;
      color: #858585;
    }

    .value {
      display: flex;
      align-items: center;
      color: #858585;

      h3 {
        font-size: 16px;
        color: #858585;
      }

      h1 {
        font-size: 30px;
        line-height: 25px;
        color: #858585;
      }
    }
}

* {
  color: white;
  text-decoration: none;
}

.d-none {
  display: none;
}

.sub-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: absolute;
  overflow: hidden;
  top: 0%;
  width: 50vw;
  height: 100vh;
  background-color: white;
  z-index: 110;
}

.close {
  position: absolute;
  top: 0%;
  margin-top: 10px;
  margin-right: 10px;
  left: 90%;
}

.sub-menu-links {
  display: flex;
  justify-content: center;
  flex-direction: column;

  align-items: flex-start;

  padding: 15px;
}

.sub-menu-auth-container {
  display: flex;

  padding: 15px;
}

.sub-menu-links a {
  margin-top: 10px;
}

.sub-menu * {
  color: black;
}

.header-container {
  display: flex;
  justify-content: space-between;

  height: 75px;

  padding: 0 25px;

  background-color: rgba(0, 0, 0, 0.3);
}

.header-links {
  display: flex;
  align-items: center;
}

.header-links a {
  margin: 0 25px;

  font-size: 18px;
  text-decoration: none;
}

.header-links a:hover {
  text-decoration: underline;
}

.header-logo {
  width: 175px;
  height: 150px;

  margin-top: 20px;
}

.login-logo {
  width: 50px;
  height: auto;
  border-radius: 50%;
}

.auth-container {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.burguer-menu {
  display: none;
}

@media (max-width: 550px) {
  .burguer-menu {
    display: block;

    padding: 15px;
  }

  .auth-container {
    display: none;
  }

  .links {
    display: none;
  }
}
</style>
