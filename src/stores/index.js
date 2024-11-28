import { createContext, useContext } from "react";
import { ThemeStore } from "./theme";
import { TasksStore } from "./task";

const ctx = createContext({
    theme: new ThemeStore(),
    tasks: new TasksStore()
})

export const useStore = () => useContext(ctx);