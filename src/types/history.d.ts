import { TestItem } from "@/types/test";

export interface User {
  key: string;
  name: string;
  picture: string;
  privileged: boolean;
  sub: string;
}

export interface DateList {
  [index: number]: { counter: number };

  [index: number]: TestInfo;
}

export interface TestInfo {
  correct: number;
  question: number;
  timeLeft: number;
  timeSpent: number;
}

export interface Statistic {
  [index: number]: HistoryRecord;
}

export interface HistoryRecord {
  [index: number]: DifficultOfTEst;
}

export interface DifficultOfTEst {
  [index: string]: TestItem[];
}