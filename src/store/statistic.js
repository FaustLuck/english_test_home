import { realtime } from "@/main";
import { ref, get, set } from "firebase/database";

export const statistic = {
  namespaced: true,
  state: {
    statistic: null
  },
  mutations: {
    SAVE_STATISTIC(state, data) {
      state.statistic = data
    }
  },
  actions: {
    async getStatistic({ commit }, { uid, admin }) {
      let path = (admin) ? '' : `${ uid }/`;
      const dbRef = ref(realtime, `users/${ path }`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = await snapshot.val();
        if (admin) {
          for (let [key, value] of Object.entries(data)) {
            if (!value?.statistic) delete data[key]
          }
        } else {
          let tmp = {};
          tmp[uid] = data;
          data = tmp;
        }
        commit('SAVE_STATISTIC', data)
      }
    },
    async setStatistic({ commit, rootGetters }, { data, uid }) {
      let [date, time] = rootGetters.getTime;
      if (uid) {
        const dbRef = ref(realtime, `users/${ uid }/statistic/${ date }/${ time }`);
        await set(dbRef, data);
      }
      data = {
        [time]: data
      }
      commit('SAVE_ANSWER', data, { root: true })
    }
  }
}