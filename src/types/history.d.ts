import { TestItem } from "@/types/test";

export interface User {
  key: string;
  name: string;
  picture: string;
  privileged: boolean;
  sub: string;
  minYear: number;
}

export interface TestInfo {
  correct: number;
  questions: number;//todo в БД записано как questions
  timeLeft: number;
  timeSpent: number;
}

export interface History {
  [index: string]: {
    [index: string]: DetailInfo[];
  };
}

export interface DetailInfo {
  key: string;
  timestamp: number;
  info?: TestInfo;
  test?: {
    [index: string]: DifficultOfTEst
  };
}

export interface HistoryRecord {
  [index: number]: DifficultOfTEst;
}

export interface DifficultOfTEst {
  [index: string]: TestItem[];
}