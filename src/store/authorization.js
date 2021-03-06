import { getUID, setUID } from "@/utils";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, realtime } from "@/main";
import { get, ref, set } from "firebase/database";

export const authorization = {
  namespaced: true,
  state: {
    uid: "unauthorizedUser",
    displayName: "Войти с помощью Google",
    photoURL: require("@/assets/google.svg"),
    admin: false,
    priveleged: false,
    login: false,
  },
  mutations: {
    SAVE_INFO(state, info) {
      state.uid = info.uid;
      state.displayName = info.displayName;
      state.photoURL = info.photoURL;
      state.admin = info.admin || false;
      state.priveleged = info.priveleged || false;
    },
    LOGIN(state, login) {
      state.login = login;
    },
  },
  actions: {
    async restoreLogin({ dispatch }) {
      let uid = getUID();
      if (uid) await dispatch("getUserInfo", uid);
    },
    async login({ dispatch }) {
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(auth, provider);
      let user = result.user;
      if (!(await dispatch("getUserInfo", user.uid)))
        await dispatch("setUserInfo", user);
      setUID(user.uid);
    },
    async getUserInfo({ commit }, uid) {
      const dbRef = ref(realtime, `users/${uid}/info`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = await snapshot.val();
        data.uid = uid;
        commit("SAVE_INFO", data);
        commit("LOGIN", true);
        return true;
      } else {
        return false;
      }
    },
    async setUserInfo({ commit }, user) {
      const dbRef = ref(realtime, `users/${user.uid}/info/`);
      await set(dbRef, {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      commit("SAVE_INFO", user);
      commit("LOGIN", true);
    },
  },
};