import { defineStore } from "pinia";
import { requestGet } from "@/utils/requests.js";

export const statisticStore = defineStore("statistic", {
  state() {
    return {
      statistic: undefined,
      dateList: undefined,
      users: undefined
    };
  },
  actions: {
    async getUsers(sub: string) {
      this.users = await requestGet(`/user/${sub}`);
    },
    async getDateList(sub: string) {
      this.dateList = await requestGet(`/history/date/${sub}`);
    },
    async getTimeList(sub: string, date: number) {
      return await requestGet(`/history/date/${sub}/${date}`);
    },
    async getResult(sub: string, timestamp: number) {
      return requestGet(`/history/test/${sub}/${timestamp}`);
    }
  }
});