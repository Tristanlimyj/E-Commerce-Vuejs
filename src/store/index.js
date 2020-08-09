import Vue from 'vue';
import Vuex from 'vuex';
import VueJwtDecode from 'vue-jwt-decode';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: '',
    currentUser: {},
    apiurl: 'http://127.0.0.1:5000/',
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
      Vue.$cookies.set('name', cleanToken.name, '15min');
      commit('setCurrentUser', cleanToken.name);
    },
  },
});

export default store;
