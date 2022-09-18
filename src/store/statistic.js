import { realtime } from "@/main";
import { get, ref } from "firebase/database";

export const statistic = {
  namespaced: true,
  state: {
    statistic: null,
  },
  mutations: {
    saveStatistic(state, data) {
      state.statistic = data;
    },
  },
  actions: {
    async getStatistic({ commit }, { uid, isAdmin }) {
      let path = isAdmin ? "" : `${uid}/`;
      const dbRef = ref(realtime, `users2/${path}`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = await snapshot.val();
        if (isAdmin) {
          for (let [key, value] of Object.entries(data)) {
            if (!value?.statistic) delete data[key];
          }
        } else {
          let tmp = {};
          tmp[uid] = data;
          data = tmp;
        }
        commit("saveStatistic", data);
      }
    },
  }
};