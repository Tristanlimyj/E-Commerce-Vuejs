import Vue from 'vue';
import Vuex from 'vuex';
import VueJwtDecode from 'vue-jwt-decode';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: '',
    currentUser: {},
    // apiurl: 'https://2efeded5bd1b.ngrok.io',
    apiurl: 'https://api.thealchemistalcohol.com',
    baseurl: 'https://www.thealchemistalcohol.com',
  },
  getters: {
  },
  mutations: {
    setLogoutUser(state) {
      state.currentUser = {};
      state.status = '';
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
      state.status = 'logged in';
    },
  },
  actions: {
    logoutUser({ commit }) {
      commit('setLogoutUser');
      Vue.$cookies.remove('token');
      Vue.$cookies.remove('name');
    },
    decodeToken({ commit }, token) {
      const cleanToken = VueJwtDecode.decode(token);
      Vue.$cookies.set('name', cleanToken.name, '20min');
      commit('setCurrentUser', cleanToken.name);
    },
  },
});

export default store;
