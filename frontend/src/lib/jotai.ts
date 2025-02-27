import { atom } from "jotai";

export const activePageAtom = atom<"home" | "setting">("home");
