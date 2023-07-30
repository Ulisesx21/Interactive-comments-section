import { WritableDraft } from "immer/dist/internal";

export const getItem = (key: string = "state") => {
  return JSON.parse(localStorage.getItem(key) || JSON.stringify(""));
};

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
