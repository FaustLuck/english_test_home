import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { get, ref, set } from 'firebase/database'
import { firebase } from '@/main';
import { getUID, setUID } from '@/utils/localStorage'

export default {
  state: {
    uid: '',
    name: '',
    photo: '',
    login: false,
    admin: false,
    privileged: false,
  },
  mutations: {
    SAVE_INFO(state, info) {
      state.uid = info.uid;
      state.name = info.displayName || info.name;
      state.photo = info.photoURL || info.photo;
      state.login = true;
      state.admin = info.admin || false;
    }
  },
  actions: {
    async recovery({ dispatch }) {
      let uid = getUID();
      if (uid) {
        await dispatch('getUserInfo', uid);
      }
    },
    async login({ dispatch, getters }) {
      const auth = firebase.auth;
      const provider = new GoogleAuthProvider();
      try {
        let result = await signInWithPopup(auth, provider)
        let user = result.user;
        if (!(await dispatch('getUserInfo', user.uid))) dispatch('setUserInfo', user)
        setUID(user.uid);
        let answer = getters.getAnswer;
        if (Object.keys(answer).length) {
          answer = answer[Object.keys(answer)]
          dispatch('setStatistic', answer)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUserInfo({ commit }, uid) {
      const dbRef = ref(firebase.realtime, `users/${uid}`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let info = await snapshot.val();
        info.uid = uid;
        commit('SAVE_INFO', info)
        return true
      } else {
        return false
      }
    },
    async setUserInfo({ commit }, user) {
      const dbRef = ref(firebase.realtime, `users/${user.uid}`);
      set(dbRef, {
        name: user.displayName,
        photo: user.photoURL
      });
      commit('SAVE_INFO', user)
    },
  },
  getters: {
    getUserInfo: state => state,
    getLogin: state => state.login,
  }
}
