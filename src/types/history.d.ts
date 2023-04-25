import { ResultItem } from "@/types";

export interface User {
  key: string;
  name: string;
  picture: string;
  sub: string;
  minYear: number;
}

export interface TestInfo {
  correct: number;
  questions: number;
  timeLeft: number;
  timeSpent: number;
}

export interface History {
  [index: string]: {
    [index: string]: HistoryRecord[];
  };
}

export interface HistoryRecord {
  key: string;
  timestamp: number;
  info?: TestInfo;
  test?: TestDetail;
}

interface TestDetail {
  [index: string]: ResultItem[];
}