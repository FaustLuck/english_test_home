export interface TestItem {
  key: string;
  question: string;
  answer?: string[];
  choice?: string;
}

export interface ResultItem extends TestItem{
  answer: string;
}

export interface Result {
  [index: string]: ResultItem[];
}