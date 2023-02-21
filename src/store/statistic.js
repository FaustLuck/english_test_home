import { request } from "@/utils/utils";

export const statistic = {
  namespaced: true,
  state: {
    statistic: null,
    dateList: null,
    users: null
  },
  mutations: {
    saveUsers(state, users) {
      (users?.length) ? state.users = users : state.users = [users];
    },
    saveDateList(state, dateList) {
      state.dateList = dateList;
    }
  },
  actions: {
    async getUsers({commit}, {sub}) {
      const users = await request(`getusers/${sub}`, null, "GET");
      commit("saveUsers", users);
    },
    async getDateList({commit}, sub) {
      const dateList = await request(`getdatelist/${sub}`, null, "GET");
      commit("saveDateList", dateList);
    },
    async getTimeList(_, {date, sub}) {
      return await request(`getTimeList/${sub}/${date}`, null, "GET");
    },
    async getResult(_, {sub, timestamp}) {
      return request(`getTest/${sub}/${timestamp}`, null, "GET");
    }
  }
};