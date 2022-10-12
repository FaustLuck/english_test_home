import { firebaseRealtime } from "@/main";
import { ref, get } from "firebase/database";
import { getDate } from "@/utils";

export const statistic = {
  namespaced: true,
  state: {
    statistic: null,
    dateList: null,
  },
  mutations: {
    saveStatistic(state, statistic) {
      state.statistic = statistic;
    },
    createDateList(state, statisticData) {
      let tmp = {};
      for (let user in statisticData) {
        tmp[user] = [];
        for (let timestamp in statisticData[user].statistic) {
          timestamp=parseInt(timestamp)
          let [date, time] = getDate(timestamp);
          let i = tmp[user].findIndex((el) => el[0] === date);
          if (i > -1) {
            tmp[user][i][1].push({timestamp, time});
          } else {
            tmp[user].push([date, [{timestamp, time}]]);
          }
        }
        tmp[user].reverse();
        tmp[user].map(([, time]) => time.reverse());
      }
      state.dateList = tmp;
    }
  },
  actions: {
    async requestStatistic({commit, state}, {uid, isAdmin = false}) {
      if (state.statistic && !isAdmin) return true;
      let path = isAdmin ? "" : `${uid}/`;
      const dbRef = ref(firebaseRealtime, `users/${path}`);
      try {
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
          commit("createDateList", statisticData);
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    getAnswers(state) {
      return function (uid, timestamp) {
        return state.statistic[uid].statistic[timestamp];
      };
    }
  }
};