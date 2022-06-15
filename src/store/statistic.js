import { realtime } from "@/main";
import { get, ref } from "firebase/database";

export const statistic = {
  namespaced: true,
  state: {
    statistic: null,
  },
  mutations: {
    SAVE_STATISTIC(state, data) {
      state.statistic = data;
    },
  },
  actions: {
    async getStatistic({ commit }, { uid, admin }) {
      let path = admin ? "" : `${uid}/`;
      const dbRef = ref(realtime, `users/${path}`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = await snapshot.val();
        if (admin) {
          for (let [key, value] of Object.entries(data)) {
            if (!value?.statistic) delete data[key];
          }
        } else {
          let tmp = {};
          tmp[uid] = data;
          data = tmp;
        }
        commit("SAVE_STATISTIC", data);
      }
    },
  },
  getters: {
    getStatistic: (state) => state.statistic,
  },
};