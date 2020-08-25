import Vue from 'vue';
import Vuex from 'vuex';
import { HttpService } from '../services/HttpService';

const httpService = new HttpService();

interface LoginProps {
  mail: string;
  password: string;
}

interface AuthStore {
  auth: {
    loading: boolean;
    err: boolean;
    data?: {
      user: {
        id: number;
        name: string;
        mail: string;
      };
      token: string;
    };
  };
  credits: number;
}

Vue.use(Vuex);

const store = new Vuex.Store<AuthStore>({
  state: {
    auth: {
      loading: false,
      err: false,
      data: undefined,
    },
    credits: 0,
  },
  getters: {
    getUserName(state) {
      return state.auth.data?.user?.name;
    },
  },
  mutations: {
    setAuthFail(state) {
      state.auth.loading = false;
      state.auth.err = true;
    },
    setAuthSuccess(state, data) {
      state.auth.loading = false;
      state.auth.err = false;
      state.auth.data = data;
    },
    updateUser(state, data) {
      (state.auth.data as any).user = {
        ...(state.auth.data as any).user,
        ...data,
      };
    },
    logout(state) {
      state.auth.data = undefined;
    },
    updateCredits(state, value) {
      state.credits = value;
    },
  },
  actions: {
    async doLogin(ctx, { mail, password }: LoginProps) {
      try {
        const data: { token: string } = await httpService.post('/auth', { mail, password });

        ctx.commit('setAuthSuccess', data);

        httpService.setToken(data.token);

        const { balance } = await httpService.get('/credits');

        ctx.commit('updateCredits', balance ? Number(balance) : 0);
      } catch (err) {
        ctx.commit('setAuthFail');
        alert('Houve um erro em um dos passos do login, por favor verifique os dados');
        console.log(err);
      }
    },
    async doRegister(ctx, data: object) {
      try {
        const responseData = await httpService.post('/users', data);

        ctx.commit('setAuthSuccess', responseData);
      } catch (err) {
        ctx.commit('setAuthFail');
        console.log(err);
      }
    },
    async sendPhoto(_, imgRef: { files: Array<string> }) {
      try {
        const formData = new FormData();
        formData.append('file', imgRef.files[0]);

        await httpService.post('/files', formData);
      } catch (err) {
        console.log(err);
      }
    },
    async updateUser(_, data) {
      try {
        const { id } = this.state.auth.data?.user as any;

        await httpService.put(`/users/${id}`, data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default store;
