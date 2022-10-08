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
    saveUserInfo(state, info) {
      state.uid = info.uid;
      state.displayName = info.displayName;
      state.photoURL = info.photoURL;
      state.isAdmin = info.isAdmin ?? false;
      state.isPrivileged = info.isPrivileged ?? false;
    },
    changeLoginStatus(state, isLogin) {
      state.isLogin = isLogin;
    },
  },
  actions: {
    async restoreLogin({dispatch}) {
      let uid = await dispatch("getUID");
      if (uid) await dispatch("requestUserInfo", uid);
    },
    async toLogin({state, dispatch}) {
      if (state.isLogin) return;
      const firebaseAuth = await loadFirebaseAuth();
      const {GoogleAuthProvider, signInWithPopup} =await import("firebase/auth");
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(firebaseAuth, provider);
      let user = result.user;
      if (!(await dispatch("requestUserInfo", user.uid))) await dispatch("sendUserInfo", user);

    },
    async requestUserInfo({dispatch, commit}, uid) {
      const firebaseRealtime = await loadFirebaseRealtime();
      const {ref, get} =await import("firebase/database");
      const dbRef = ref(firebaseRealtime, `users2/${uid}/info`);//todo =>users
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = await snapshot.val();
        data.uid = uid;
        commit("saveUserInfo", data);
        dispatch("setUID");
        commit("changeLoginStatus", true);
        return true;
      } else {
        return false;
      }
    },
    async sendUserInfo({dispatch, commit}, user) {
      const firebaseRealtime = await loadFirebaseRealtime();
      const {ref, set} = import("firebase/database");
      const dbRef = ref(firebaseRealtime, `users2/${user.uid}/info/`);//todo =>users
      await set(dbRef, {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      commit("saveUserInfo", user);
      dispatch("setUID");
      commit("changeLoginStatus", true);
    },
    setUID({state}) {
      window.localStorage.setItem("uid", state.uid);
    },
    getUID() {
      return window.localStorage.getItem("uid");
    }
  }
};