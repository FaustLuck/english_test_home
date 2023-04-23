import { defineStore } from "pinia";
import { reactive, ref, Ref } from "vue";
import { HistoryRecord, History, User } from "@/types";
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

  function checkRange(sub: string, year: number, month = 0, day = 1) {
    const start = createTimestamp(arguments[1], arguments[2], arguments[3]);
    arguments[arguments.length - 1] += 1;
    const finish = createTimestamp(arguments[1], arguments[2], arguments[3]);
    return getRange(sub, year, start, finish);
  }

  function createTimestamp(year: number, month = 0, day = 1) {
    return new Date(year, month, day).getTime();
  }

  function getRange(sub: string, year: number, start: number, finish: number): HistoryRecord[] {
    if (!history?.[sub]?.[year]) return [];
    return history[sub][year]
      .filter(el => el.timestamp >= start && el.timestamp < finish);
  }

  async function getHistoryOfYear(year: string, sub: string) {
    const resStatistic = await requestGet(`/history/year/${sub}/${year}`);
    if (!history[sub]) history[sub] = {};
    if (!history[sub][year]) history[sub][year] = [];
    Object.assign(history[sub][year], resStatistic);
  }

  async function getHistoryOfDay(timestamp: number, sub: string, year: number) {
    const dayStatistic = await requestGet(`/history/day/${sub}/${timestamp}`);
    dayStatistic.forEach((test: any) => {
      const historyTest = history[sub][year]
        .find(el => el.key === test.key);
      if (historyTest) Object.assign(historyTest, test);
    });

  }

  async function getResult(sub: string, key: string, year: number) {
    const result = await requestGet(`/history/test/${key}`);
    const obj = history[sub][year].find(el => el.key === key);
    if (obj) Object.assign(obj, { test: result });
  }

  return {
    history,
    users,
    getUser,
    getUsers,
    getHistoryOfYear,
    getHistoryOfDay,
    getRange,
    checkRange,
    getResult
  };
});