import { firebaseAuth, firebaseRealtime } from "@/main";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, get } from "firebase/database";

export const auth = {
  namespaced: true,
  state: {
    uid: "unauthorizedUser",
    displayName: "Войти с помощью Google",
    photoURL: require("@/assets/google.svg"),
    isAdmin: null,
    isPrivileged: false,
    isLogin: null,
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
      onAuthStateChanged(firebaseAuth, async (user) => {
        if (!user) return commit("changeLoginStatus", false);
        commit("saveUserInfoFromGoogle", user);
        await dispatch("requestUserInfo", user.uid);
      });
    },
    async toLogin({state, dispatch}) {
      if (state.isLogin) return;
      try {
        const provider = new GoogleAuthProvider();
        let result = await signInWithPopup(firebaseAuth, provider);
        let user = result.user;
        await dispatch("requestUserInfo", user.uid);
      } catch (e) {
        console.log(e);
      }
    },
    async requestUserInfo({commit}, uid) {
      const dbRef = ref(firebaseRealtime, `users/${uid}/info`);
      try {
        let snapshot = await get(dbRef);
        if (snapshot.exists()) {
          let data = await snapshot.val();
          commit("saveUserInfoFromDB", data);
        }
        commit("changeLoginStatus", true);
      } catch (e) {
        console.log(e);
      }
    }
  }
};