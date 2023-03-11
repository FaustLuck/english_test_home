import { request } from "@/utils/utils";
import { defineStore } from "pinia";

export const statisticStore = defineStore("statistic", {
  state() {
    return {
      statistic: undefined,
      dateList: undefined,
      users: undefined
    };
  },
  actions: {
    async getUsers({sub}) {
      this.users = await request(`/user/get/${sub}`, null, "GET");
    },
    async getDateList(sub) {
      this.dateList = await request(`/history/date/${sub}`, null, "GET");
    },
    async getTimeList({date, sub}) {
      return await request(`/history/date/${sub}/${date}`, null, "GET");
    },
    async getResult({sub, timestamp}) {
      return request(`/history/test/${sub}/${timestamp}`, null, "GET");
    }
  }
});