import { createStore } from 'vuex'

import { ref, get, set } from "firebase/database";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebase } from '@/main'

import { getDate, getUID, setUID } from "@/utils";

export default createStore({
  state: {
    settings: null,
    statistic: null,
    order: ['easy', 'medium', 'hard'],
    answer: null,
    info: {
      uid: null,
      displayName: "Войти с помощью Google",
      photoURL: require("@/assets/google.svg"),
      login: false,
      admin: false,
      priveleged: false,
    },
    speech: null
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
    },
    SAVE_INFO(state, info) {
      state.info.uid = info.uid;
      state.info.displayName = info.displayName
      state.info.photoURL = info.photoURL
      state.info.login = true;
      state.info.admin = info.admin || false;
      state.info.priveleged = info.priveleged || false;
    },
    SAVE_SPEECH(state, data) {
      state.speech = data
    }
  },
  actions: {
    async getSettings({ commit }) {
      const dbRef = ref(firebase.realtime, `settings/`);
      let snapshot = await get(dbRef)
      if (snapshot.exists()) {
        let settings = snapshot.val();
        commit('SAVE_SETTINGS', settings)
      } else {
        console.log("No data available");
      }
    },
    async setSettings({ commit }, settings) {
      const dbRef = ref(firebase.realtime, `settings/`);
      await set(dbRef, settings)
      commit('SAVE_SETTINGS', settings)
    },

    async recovery({ dispatch }) {
      let uid = getUID();
      if (uid) {
        await dispatch('getUserInfo', uid);
      }
    },
    async login({ getters, dispatch }) {
      const auth = firebase.auth;
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(auth, provider)
      let user = result.user;
      if (!(await dispatch('getUserInfo', user.uid))) await dispatch('setUserInfo', user)
      setUID(user.uid);
      let answer = getters.getAnswer;
      if (answer) {
        answer = answer[Object.keys(answer)]
        dispatch('setStatistic', answer)
      }
    },
    async getUserInfo({ commit, dispatch }, uid) {
      const dbRef = ref(firebase.realtime, `users/${ uid }/info`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let info = await snapshot.val();
        info.uid = uid;
        commit('SAVE_INFO', info)
        await dispatch('getStatistic')
        return true
      } else {
        return false
      }
    },
    async setUserInfo({ commit }, user) {
      const dbRef = ref(firebase.realtime, `users/${ user.uid }/info/`);
      set(dbRef, {
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      commit('SAVE_INFO', user)
    },

    async getStatistic({ getters, commit }) {
      let info = getters.getUserInfo;
      let path = (info.admin) ? '' : `${ info.uid }/statistic`;
      const dbRef = ref(firebase.realtime, `users/${ path }/`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let statistic = await snapshot.val();
         for (let key in statistic) {
           if (!statistic[key]?.statistic) delete statistic[key]
         }
        commit('SAVE_STATISTIC', statistic)
      }
    },
    async setStatistic({ commit, getters }, data) {
      let uid = getters.getUserInfo.uid
      let [date, time] = getDate()
      if (uid) {
        const dbRef = ref(firebase.realtime, `users/${ uid }/statistic/${ date }/${ time }`);
        await set(dbRef, data)
      }
      data = {
        [time]: data
      }
      commit('SAVE_ANSWER', data)
    },
    async getSpeech({ commit }) {
      const dbRef = ref(firebase.realtime, `speech/`)
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let speech = await snapshot.val();
        commit('SAVE_SPEECH', speech)
      }
    },
  },
  getters: {
    getSettings: state => state.settings,
    getStatistic: state => state.statistic,
    getOrder: state => state.order,
    getAnswer: state => state.answer,
    getUserInfo: state => state.info,
    getLogin: state => state.info.login,
    getSpeech: state => state.speech
  }
})
