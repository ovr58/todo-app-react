import { observer } from "mobx-react-lite"
import { TaskItem } from "./taskItem"
import { useStore } from "../stores"
import { useState } from "react"

export const TaskList = observer(() => {

    const store = useStore()

    const [isInputOpen, setIsInputOpen] = useState('')

    const getTasksTree = (tasks, parentId = '-1') => {
        return tasks
            .filter(task => task.ofTask === parentId)
            .map(task => ({
                ...task,
                subTasks: getTasksTree(tasks, task.id)
            }))
    }

    const tasksTree = getTasksTree(store.tasks.getTasks)

    const renderTasks = (tasks) => {
        return tasks.map(task => (
          <div key={task.id}>
            <TaskItem task={task} isInputOpen={isInputOpen} setIsInputOpen={setIsInputOpen} />
            {task.subTasks.length > 0 && (
              <div className="ml-4">
                {renderTasks(task.subTasks)}
              </div>
            )}
          </div>
        ));
      };

  return (
    <div className="mt-6">
        {renderTasks(tasksTree)}
        <div className="py-3 text-center text-gray-500 flex justify-evenly">
            {store.tasks.tasks.length === 0 && 'Нет задач'}
            {store.tasks.tasks.length === 0 && <div></div>}
            Completed ({store.tasks.getCompletedTasks.length})
        </div>
        {/* {store.tasks.getCompletedTasks.map((task) => (
            <TaskItem key={task.id} task={task}/>
        ))} */}
    </div>
  )
})
