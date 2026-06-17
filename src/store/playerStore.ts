import { atom } from "jotai";
import { useAtom } from "jotai/react";
import type { LessonSub } from "#/types/learn.ts";

export const current_lesson_atom = atom<LessonSub | null>(null);

export const useCurrentLesson = () => useAtom(current_lesson_atom);
