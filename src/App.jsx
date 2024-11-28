import { observer } from "mobx-react-lite"
import { ThemeToggle } from "./components/themeToggle"
import { useStore } from "./stores"
import { useEffect } from "react"
import { TaskList } from "./components/taskList"
import { TaskInput } from "./components/taskInput"

export const App = observer(() => {

  const store = useStore()

  useEffect(() => {
    document.body.setAttribute('data-mode', store.theme.themeMode)
  }, [store.theme.themeMode])

  return (
    <div className="max-w-screen-md mx-auto p-3 gap-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-dark dark:text-light">Somehow I Manage</h1>
        <ThemeToggle />
      </div>
      <TaskInput ofTask={'-1'} />
      <TaskList />
    </div>
  )
})

