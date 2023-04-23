export interface ResultItem {
  question: string;
  answer: string;
  choice?: string;
}

export interface Result {
  [index: string]: ResultItem[];
}

export interface TestItem extends ResultItem {
  key: string;
  answer: string[];
}

export interface PreparedItem extends TestItem {
  answer?: null | string[];
}