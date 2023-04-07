export interface Record {
  key?: string | null;
  question: string;
  answer: string;
  included?: boolean;
  excluded?: boolean;
  edited?: boolean;
  oldAnswer?: string;
  oldQuestion?: string;
}

export interface Dictionary {
  [index: string]: Record[];
}

export interface Limits {
  [index: string]: number;
}