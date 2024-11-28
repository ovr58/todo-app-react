import { observer } from "mobx-react-lite"
import { useStore } from "../stores"
import { useEffect, useRef, useState } from "react"

export const SubTaskInput = observer(({ofTask, setFocus = false}) => {
    
    const store = useStore()

    const [subTask, setSubTask] = useState(store.tasks.getTaskEdit)

    const subInputRef = useRef(null)

    const handleSubmit = () => {
        if (subTask) {
            if (store.tasks.getTaskEdit) {
                store.tasks.updateTask(store.tasks.getTaskEdit.id, subTask)
            } else {
                store.tasks.addTask(subTask, ofTask)
            }
            setSubTask('')
        }
    }

    useEffect(() => {
        if (setFocus) {
            subInputRef.current.focus()
        }
    }, [setFocus])

    return (
        <div key='subTaskInput' className="flex md:flex-row flex-col p-3 bg-component dark:bg-componentDark rounded-lg mb-3">
            <input 
                type="text" 
                className="
                    w-full 
                    h-10 
                    px-3 
                    bg-transparent 
                    border-2 
                    border-primary 
                    dark:border-secondary 
                    rounded-lg 
                    focus:outline-none 
                    focus:ring-2 
                    focus:ring-primary 
                    dark:focus:ring-secondary
                    text-dark
                    dark:text-light
                " 
                placeholder="Добавить задачу" 
                value={subTask}
                onChange={(e) => setSubTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                ref={subInputRef}
            />
            <button 
                className="
                    w-full 
                    ml-0 
                    mt-3 
                    md:w-[20%] 
                    md:mt-0 
                    md:ml-3 
                    h-10 
                    bg-primary 
                    text-dark 
                    dark:bg-secondary 
                    dark:text-dark 
                    rounded-lg 
                    hover:bg-primary-dark 
                    dark:hover:bg-secondary-dark 
                    transition-colors 
                    duration-300
                "
                onClick={handleSubmit}
            >
                {store.tasks.getTaskEdit ? "Обновить" : "Добавить"}
            </button>
        </div>
    )
})