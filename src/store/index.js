import { createStore } from 'vuex'

import { ref, get, set } from "firebase/database";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, realtime } from '@/main'

import { getUID, setUID } from "@/utils";
import { statistic } from "@/store/statistic";

export default createStore({
  state: {
    settings: null,
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
      const dbRef = ref(realtime, `settings/`);
      let snapshot = await get(dbRef)
      if (snapshot.exists()) {
        let settings = snapshot.val();
        commit('SAVE_SETTINGS', settings)
      } else {
        console.log("No data available");
      }
    },
    async setSettings({ commit }, settings) {
      const dbRef = ref(realtime, `settings/`);
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
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(auth, provider)
      let user = result.user;
      if (!(await dispatch('getUserInfo', user.uid))) await dispatch('setUserInfo', user)
      setUID(user.uid);
      let answer = getters.getAnswer;
      if (answer) {
        answer = answer[Object.keys(answer)]
        dispatch('statistic/setStatistic', answer)
      }
    },
    async getUserInfo({ commit, dispatch }, uid) {
      const dbRef = ref(realtime, `users/${ uid }/info`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let info = await snapshot.val();
        info.uid = uid;
        commit('SAVE_INFO', info)
        await dispatch('statistic/getStatistic')
        return true
      } else {
        return false
      }
    },
    async setUserInfo({ commit }, user) {
      const dbRef = ref(realtime, `users/${ user.uid }/info/`);
      await set(dbRef, {
        displayName: user.displayName,
        photoURL: user.photoURL
      });
      commit('SAVE_INFO', user)
    },
    async getSpeech({ commit }) {
      const dbRef = ref(realtime, `speech/`)
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let speech = await snapshot.val();
        commit('SAVE_SPEECH', speech)
      }
    },
  },
  getters: {
    getSettings: state => state.settings,
    getOrder: state => state.order,
    getAnswer: state => state.answer,
    getUserInfo: state => state.info,
    getLogin: state => state.info.login,
    getSpeech: state => state.speech
  },
  modules: {
    statistic
  }
})
