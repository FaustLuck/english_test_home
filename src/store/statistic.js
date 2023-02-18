import { request } from "@/utils/utils";

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
    saveDateList(state, dateList) {
      state.dateList = dateList;
    }
  },
  actions: {
    async getDateList({commit}, sub) {
      const dateList = await request("getdatelist", {sub});
      commit("saveDateList", dateList);

    }
  }
};