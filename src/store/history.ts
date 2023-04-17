import { defineStore } from "pinia";
import { reactive, ref, Ref } from "vue";
import { History, User } from "@/types/history";
import { requestGet } from "@/utils/requests";

export const useHistoryStore = defineStore("history", () => {
  const history: History = reactive({});
  const users: Ref<User[]> = ref([]);

  async function getUsers(sub: string) {
    users.value = await requestGet(`/user/${sub}`);
  }

  function getUser(sub: string) {
    return users.value.find(el => el.sub === sub);
  }

  function getTestsOfDay(sub: string, year: number, start: number) {
    const msInDay = 1000 * 60 * 60 * 24;
    return history[sub][year]
      .filter(el => el.timestamp >= start && el.timestamp < start + msInDay);
  }

  async function getHistoryOfYear(year: string, sub: string) {
    const resStatistic = await requestGet(`/history/date/${sub}/${year}`);
    if (!history[sub]) history[sub] = {};
    if (!history[sub][year]) history[sub][year] = [];
    Object.assign(history[sub][year], resStatistic);
  }

  async function getResult(sub: string, timestamp: number) {
    const result = await requestGet(`/history/test/${sub}/${timestamp}`);
    if (!history?.[sub]) history[sub] = {};
    Object.assign(history, { [timestamp]: result });
  }

  return {
    history,
    users,
    getUser,
    getUsers,
    getHistoryOfYear,
    getTestsOfDay,
    getResult
  };
});