import { TestItem } from "@/types/test";

export interface User {
  key: string;
  name: string;
  picture: string;
  privileged: boolean;
  sub: string;
  dateList?: DateList;
}

export interface DateList {
  [index: string]: {
    [index: number]: { counter: number } | TestInfo;
  };
}

export interface TestInfo {
  correct: number;
  question: number;
  timeLeft: number;
  timeSpent: number;
}

export interface Statistic {
  [index: string]: {
    [index: number]: HistoryRecord;
  };
}

export interface HistoryRecord {
  [index: number]: DifficultOfTEst;
}

export interface DifficultOfTEst {
  [index: string]: TestItem[];
}