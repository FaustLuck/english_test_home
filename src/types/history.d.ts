import { TestItem } from "@/types/test";

export interface User {
  key: string;
  name: string;
  picture: string;
  privileged: boolean;
  sub: string;
  minYear: number;
}

export interface TimeList {
  [index: number]: TestInfo;
}

export interface TestInfo {
  correct: number;
  question: number;
  timeLeft: number;
  timeSpent: number;
}

export interface History {
  [index: string]: {
    [index: string]: {
      key: string;
      timestamp: number;
    }[];
  };
}


export interface HistoryRecord {
  [index: number]: DifficultOfTEst;
}

export interface DifficultOfTEst {
  [index: string]: TestItem[];
}