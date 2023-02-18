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
      state.users = users;
    },
    saveDateList(state, dateList) {
      state.dateList = dateList;
    }
  },
  actions: {
    async getUsers({commit}, {sub}) {
      const users = await request(`getusers/${sub}`, null, "GET");
      commit("saveUsers", users);
      return users?.length > 1;
    },
    async getDateList({commit}, sub) {
      const dateList = await request(`getdatelist/${sub}`, null, "GET");
      commit("saveDateList", dateList);
    },
    //TODO убрать
    // eslint-disable-next-line no-empty-pattern
    async getTimeList({}, {date, sub}) {
      return await request(`getTimeList/${sub}/${date}`, null, "GET");
    }
  }
};