export interface TestItem {
  key?: string;
  question: string;
  answer?: string[];
  choice?: string;
}

export interface Result {
  [index: string]: TestItem[];
}