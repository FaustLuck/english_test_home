import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { get, ref, set } from 'firebase/database'
import { firebase } from '@/main'

export default {
  state: {
    uid: '',
    name: '',
    photo: '',
    admin: false,
    privileged: false
  },
  mutations: {
    SAVE_ID(state, user) {
      state.uid = user.uid;
      state.name = user.displayName;
      state.photo = user.photoURL
    },
    SAVE_USER_INFO(state, data) {
      state.admin = data.admin || false;
      state.privileged = data.privileged || false
    }
  },
  actions: {
    async login({ commit, dispatch }) {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        let result = await signInWithPopup(auth, provider)
        const user = result.user;
        dispatch('getUserInfoFromDB', { user })
        commit('SAVE_ID', user)
      } catch (e) {
        dispatch('setError', e)
      }
    },
    async logout() {
      await signOut()
    },
    async getUserInfoFromDB({ commit, dispatch }, { user }) {
      const dbref = ref(firebase, `users/${user.uid}`);
      let snapshot = await get(dbref);
      if (snapshot.exists()) {
        let data = snapshot.val();
        commit('SAVE_USER_INFO', data)
      } else {
        dispatch('setUserInfo', user)
      }
    },
    async setUserInfo({ commit }, user) {
      const dbref = ref(firebase, `users/${user.uid}`);
      let data = {
        name: user.displayName,
        photo: user.photoURL
      }
      await set(dbref, data)
      commit('SAVE_USER_INFO', data)
    }
  },
  getters: {
    getUID: state => state.uid,
    getUserInfo(state) {
      return {
        title: state.name,
        src: state.photo
      }
    },
  }
}