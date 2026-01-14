// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useDispatchTyped = () => useDispatch<AppDispatch>();
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector;
