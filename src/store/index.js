import { createStore } from 'vuex'
import { ref, get, set } from "firebase/database";
import { firebase } from '@/main'
import getDate from '@/utils/date'
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
    }
  },
  actions: {
    async fetchData({ commit }, { path }) {
      const dbRef = ref(firebase, `${path}/`);
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
      const dbRef = ref(firebase, `${path}/`);
      set(dbRef, data)
        .then(() => true)
      commit('SAVE_DATA', {
        path,
        data
      })
    },
    async setStatistic({ commit }, { data, date, time }) {
      const dbRef = ref(firebase, `statistic/${date}/${time}`);
      await set(dbRef, data)
      data = {
        [time]: data
      }
      commit('SAVE_DATA', { path: 'answer', data })
    },
    async setError(e) {
      const [date, time] = getDate();
      const dbRef = ref(firebase, `errors/${date}/${time}`)
      await set(dbRef, JSON.stringify(e))
    }
  },
  getters: {
    getInfo: state => path => state[path],
  },
  modules: {
    auth
  }
})
