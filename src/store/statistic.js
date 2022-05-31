import { realtime } from "@/main";
import { ref, get, set } from "firebase/database";
import { getDate } from "@/utils";

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
    async getStatistic({ commit, rootGetters }) {
      let login = rootGetters.getLogin;
      console.log(login)
      if (!login) return
      let { uid, admin } = rootGetters['authorization/getUserInfo'];
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
    async setStatistic({ commit, rootGetters }, data) {
      let { uid } = rootGetters.getUserInfo;
      let [date, time] = getDate();
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