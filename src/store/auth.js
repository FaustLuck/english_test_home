import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { Oauth, realtime } from "@/main";

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
      if (uid) await dispatch("getUserInfo", uid);
    },
    async toLogin({state, dispatch}) {
      if (state.isLogin) return;
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(Oauth, provider);
      let user = result.user;
      if (!(await dispatch("getUserInfo", user.uid)))
        await dispatch("setUserInfo", user);
      dispatch("setUID", user.uid);
    },
    async getUserInfo({commit}, uid) {
      const dbRef = ref(realtime, `users/${uid}/info`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = await snapshot.val();
        data.uid = uid;
        commit("saveUserInfo", data);
        commit("changeLoginStatus", true);
        return true;
      } else {
        return false;
      }
    },
    async setUserInfo({commit}, user) {
      const dbRef = ref(realtime, `users/${user.uid}/info/`);
      await set(dbRef, {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      commit("saveUserInfo", user);
      commit("changeLoginStatus", true);
    },
    setUID(uid) {
      window.localStorage.setItem("uid", uid);
    },
    getUID() {
      return window.localStorage.getItem("uid");
    }
  }
};