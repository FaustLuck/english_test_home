import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
export default {
  actions: {
    async login({ commit }) {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        let result = await signInWithPopup(auth, provider)
        const credential = await provider.credentialFromResult(result);
        console.dir(credential)
      } catch (e) {
        commit('SET_ERROR', e)
        throw e
      }
    },
    /*     getUid() {
          const user = firebase.auth().currentUser;
          return user ? user.uid : null
        }, */
    async logout() {
      await signOut()
    }
  }
}