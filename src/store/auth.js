import { loadFirebaseRealtime, loadFirebaseAuth } from "@/main";

export const auth = {
  namespaced: true,
  state: {
    uid: "unauthorizedUser",
    displayName: "Войти с помощью Google",
    photoURL: require("@/assets/google.svg"),
    isAdmin: false,
    isPrivileged: false,
    isLogin: false,
  },
  mutations: {
    saveUserInfoFromGoogle(state, info) {
      state.uid = info.uid;
      state.displayName = info.displayName;
      state.photoURL = info.photoURL;
    },
    saveUserInfoFromDB(state, info) {
      state.isAdmin = info.isAdmin ?? false;
      state.isPrivileged = info.isPrivileged ?? false;
    },
    changeLoginStatus(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {
    async restoreLogin({dispatch, commit}) {
      const firebaseAuth = await loadFirebaseAuth();
      const {onAuthStateChanged} = await import("firebase/auth");
      onAuthStateChanged(firebaseAuth, async (user) => {
        commit("saveUserInfoFromGoogle", user);
        await dispatch("requestUserInfo", user.uid);
      });
    },
    async toLogin({state, dispatch}) {
      if (state.isLogin) return;
      const firebaseAuth = await loadFirebaseAuth();
      const {GoogleAuthProvider, signInWithPopup} = await import("firebase/auth");
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(firebaseAuth, provider);
      let user = result.user;
      await dispatch("requestUserInfo", user.uid);
    },
    async requestUserInfo({commit}, uid) {
      const firebaseRealtime = await loadFirebaseRealtime();
      const {ref, get} = await import("firebase/database");
      const dbRef = ref(firebaseRealtime, `users/${uid}/info`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = await snapshot.val();
        commit("saveUserInfoFromDB", data);
      }
      commit("changeLoginStatus", true);
    }
  }
};