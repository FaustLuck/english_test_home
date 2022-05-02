import { createStore } from 'vuex'
import { getDatabase, ref, get, set } from "firebase/database";
export default createStore({
  state: {
    settings: {},
    statistic: {},
    order: ['easy', 'medium', 'hard']
  },
  mutations: {
    SAVE_DATA(state, data) {
      state[data.path] = data.data
    }
  },
  actions: {
    async fetchData({ commit }, { path }) {
      const dbRef = ref(getDatabase(), `${path}/`);
      let snapshot = await get(dbRef);
      if (snapshot.exists()) {
        let data = snapshot.val();
        commit('SAVE_DATA', {
          path,
          data
        })
        return data
      } else {
        console.log("No data available");
      }
    },
    setData({ commit }, { path, data }) {
      const dbRef = ref(getDatabase(), `${path}/`);
      set(dbRef, data)
      commit('SAVE_DATA', {
        path,
        data
      })
    }
  },
  getters: {
    getInfo: state => path => state[path]
  }
})
