import { defineStore } from "pinia";
import { requestGet } from "@/utils/requests";

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
      this.users = await requestGet(`/user/${sub}`);
    },
    async getDateList(sub) {
      this.dateList = await requestGet(`/history/date/${sub}`);
    },
    async getTimeList({date, sub}) {
      return await requestGet(`/history/date/${sub}/${date}`);
    },
    async getResult({sub, timestamp}) {
      return requestGet(`/history/test/${sub}/${timestamp}`);
    }
  }
});