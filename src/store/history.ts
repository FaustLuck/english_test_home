import { defineStore } from "pinia";
import { reactive, ref, Ref } from "vue";
import { DateList, History, User } from "@/types/history";
import { requestGet } from "@/utils/requests";

export const useHistoryStore = defineStore("history", () => {
  const history: History = reactive({});
  const dateList: DateList = reactive({});
  const users: Ref<User[]> = ref([]);

  async function getUsers(sub: string) {
    users.value = await requestGet(`/user/${sub}`);
  }

  async function getDateList(sub: string) {
    const resDateList = await requestGet(`/history/date/${sub}`);
    const user = users.value.find(el => el.sub === sub);
    if (!user) return;
    if (!dateList?.[sub]) {
      dateList[sub] = {};
    }
    Object.assign(dateList[sub], resDateList);
  }

  async function getStatistic(year: number, sub: string) {
    const resStatistic = await requestGet(`/history/date/${sub}/${year}`);
    if (!statistic[sub]) statistic[sub] = {};
    Object.assign(statistic[sub][year], resStatistic);
  }

  async function getTimeList(sub: string, date: number) {
    const timeList = await requestGet(`/history/date/${sub}/${date}`);
    Object.assign(dateList[sub][date], timeList);
  }

  async function getResult(sub: string, timestamp: number) {
    const result = await requestGet(`/history/test/${sub}/${timestamp}`);
    if (!history?.[sub]) history[sub] = {};
    Object.assign(history, { [timestamp]: result });
  }

  return {
    history,
    dateList,
    users,
    getUsers,
    getDateList,
    getStatistic,
    getTimeList,
    getResult
  };
});