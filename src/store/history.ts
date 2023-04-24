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

  async function getHistoryRange(year: number, sub: string, start: number, end: number = start) {
    const info: HistoryRecord[] = await requestGet(`/history/get/${sub}/${start}/${end}`);
    if (!history[sub]) history[sub] = {};
    if (!history[sub][year]) history[sub][year] = [];
    info.forEach(el => {
      const item: HistoryRecord | undefined = history[sub][year].find(record => record.key === el.key);
      (item) ? Object.assign(item, el) : history[sub][year].push(el);
    });
  }

  return {
    history,
    users,
    getUser,
    getUsers,
    getHistoryRange,
    getRange,
    checkRange
  };
});