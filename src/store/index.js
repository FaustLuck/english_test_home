import { createStore } from 'vuex'
import { ref, get, set } from "firebase/database";
import { firebase } from '@/main'
import getDate from "@/utils/date";
import auth from './auth'
export default createStore({
  state: {
    settings: {},
    statistic: {},
    order: ['easy', 'medium', 'hard'],
    answer: {},
  },
  mutations: {
    SAVE_STATISTIC(state, data) {
      state.statistic = data
    },
    SAVE_SETTINGS(state, data) {
      state.settings = data
    },
    SAVE_ANSWER(state, data) {
      state.answer = data
    }
  },
  actions: {
    async getSettings({ commit }) {
      const dbRef = ref(firebase.realtime, `settings/`);
      let snapshot = await get(dbRef)
      if (snapshot.exists()) {
        let data = snapshot.val();
        commit('SAVE_SETTINGS', data)
      } else {
        console.log("No data available");
      }
    },
    async getStatistic({ commit, getters }, uid) {
      let admin = getters.getUserInfo.admin;
      if (admin) uid = '';
      const dbRef = ref(firebase.realtime, `statistic/${uid}`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = snapshot.val();
        commit('SAVE_STATISTIC', data)
        return data
      } else {
        console.log("No data available");
      }
    },
    async setSettings({ commit }, data) {
      const dbRef = ref(firebase.realtime, `settings/`);
      await set(dbRef, data)
      commit('SAVE_SETTINGS', data)
    },
    async setStatistic({ commit, getters }, data) {
      let uid = getters.getUserInfo.uid
      let [date, time] = getDate()
      if (uid) {
        const dbRef = ref(firebase.realtime, `statistic/${uid}/${date}/${time}`);
        await set(dbRef, data)
      }
      data = {
        [time]: data
      }
      commit('SAVE_ANSWER', data)
    },
  },
  getters: {
    getSettings: state => state.settings,
    getStatistic: state => state.statistic,
    getOrder: state => state.order,
    getAnswer: state => state.answer
  },
  modules: {
    auth
  }
})
