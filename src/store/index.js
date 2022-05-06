import { createStore } from 'vuex'
import { getDatabase, ref, get, set } from "firebase/database";
import auth from './auth'
export default createStore({
  state: {
    settings: {},
    statistic: {},
    order: ['easy', 'medium', 'hard'],
    answer: {},
    errors: ''
  },
  mutations: {
    SAVE_DATA(state, data) {
      state[data.path] = data.data
    },
    SET_ERROR(state, e) {
      state.errors = e
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
        .then(() => true)
      commit('SAVE_DATA', {
        path,
        data
      })
    },
    setStatistic({ commit }, { data, date, time }) {
      const dbRef = ref(getDatabase(), `statistic/${date}/${time}`);
      set(dbRef, data).then(() => true)
      data = {
        [time]: data
      }
      commit('SAVE_DATA', { path: 'answer', data })
    },

  },
  getters: {
    getInfo: state => path => state[path],
    getError: state => state.errors
  },
  modules: {
    auth
  }
})
