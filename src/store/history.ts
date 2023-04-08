import { defineStore } from "pinia";
import { reactive } from "vue";
import { DateList, Statistic, User } from "@/types/history";
import { requestGet } from "@/utils/requests";

export const useHistoryStore = defineStore("history", () => {
  const statistic: Statistic = reactive({});
  const dateList: DateList = reactive({});
  const users: User[] = reactive([]);

  async function getUsers(sub: string) {
    const resUsers = await requestGet(`/user/${sub}`);
    Object.assign(users, resUsers);
  }

  async function getDateList(sub: string) {
    const resDateList = await requestGet(`/history/date/${sub}`);
    Object.assign(dateList, resDateList);
  }

  async function getTimeList(sub: string, date: number) {
    const timeList = await requestGet(`/history/date/${sub}/${date}`);
    Object.assign(dateList[date], timeList);
  }

  async function getResult(sub: string, timestamp: number) {
    const result = await requestGet(`/history/test/${sub}/${timestamp}`);
    Object.assign(statistic, { [timestamp]: result });
  }

  return {
    statistic,
    dateList,
    users,
    getUsers,
    getDateList,
    getTimeList,
    getResult
  };
});