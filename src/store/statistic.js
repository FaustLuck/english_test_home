import { request } from "@/utils/utils";
import { defineStore } from "pinia";

export const useStatisticStore = defineStore("statistic", {
  state() {
    return {
      statistic: undefined,
      dateList: undefined,
      users: undefined
    };
  },
  actions: {
    async getUsers({sub}) {
      this.users = await request(`getUsers/${sub}`, null, "GET");
    },
    async getDateList(sub) {
      this.dateList = await request(`getDateList/${sub}`, null, "GET");
    },
    async getTimeList({date, sub}) {
      return await request(`getTimeList/${sub}/${date}`, null, "GET");
    },
    async getResult({sub, timestamp}) {
      return request(`getTest/${sub}/${timestamp}`, null, "GET");
    }
  }
});