import { firebaseRealtime } from "@/main";
import { get, ref } from "firebase/database";

export const statistic = {
  namespaced: true,
  state: {
    statistic: null,
  },
  mutations: {
    saveStatistic(state, statistic) {
      state.statistic = statistic;
    },
  },
  actions: {
    async getStatistic({ commit }, { uid, isAdmin }) {
      let path = isAdmin ? "" : `${uid}/`;
      const dbRef = ref(firebaseRealtime, `users2/${path}`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let statisticData = await snapshot.val();
        if (isAdmin) {
          for (let [key, value] of Object.entries(statisticData)) {
            if (!value?.statistic) delete statisticData[key];
          }
        } else {
          let tmp = {};
          tmp[uid] = statisticData;
          statisticData = tmp;
        }
        commit("saveStatistic", statisticData);
      }
    },
  }
};