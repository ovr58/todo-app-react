import { MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md"
import PropTypes from 'prop-types'
import { useStore } from "../stores"
import { FaRegEdit } from "react-icons/fa"
import { ImCheckboxChecked } from "react-icons/im"
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io"
import { SubTaskInput } from "./subTaskInput"
import { motion } from "framer-motion"

export const TaskItem = (props) => {

    const store = useStore()
  
    return (
    <>
    <motion.div 
        className="
            flex
            items-center
            justify-between
            px-3
            my-[7px]
            h-[48px]
            bg-component
            dark:bg-componentDark
            text-dark
            dark:text-light
            rounded-lg
            gap-1.5
            shadow-md
        "
        initial={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
        transition={{ duration: 0.5 }}
    >
        <button 
            className='w-[5%] cursor-pointer'
            title={props.task.completed ? "Убрать отметку выполненно" : "Отметить как выполненно"} 
            onClick={() => {store.tasks.toggleCompleted(props.task.id)}}
        >
            {props.task.completed ? <ImCheckboxChecked /> : <MdCheckBoxOutlineBlank />}
        </button>

        <button 
            className='w-[5%] cursor-pointer'
            title='Редактировать задачу' 
            onClick={() => (
                props.setIsInputOpen(''), 
                store.tasks.editTask(props.task)
            )}
        >
            <FaRegEdit />
        </button>

        {
            !props.task.completed && 
            <button 
                className='w-[5%] cursor-pointer'
                title='Добавить подзадачу' 
                onClick={
                    () => 
                        (props.setIsInputOpen(
                            props.isInputOpen === props.task.id ? '' : props.task.id
                        ), store.tasks.editTask(''))}>
                        {
                        props.isInputOpen === props.task.id ? 
                            <IoIosAddCircle /> : 
                            <IoIosAddCircleOutline />
                }
            </button>
        }

        <div className="flex-grow truncate">
            <label 
                className={
                    `inline
                    relative
                    after:content-['']
                    after:absolute
                    after:left-0
                    after:h-[2px]
                    after:top-[calc(50%)]
                    after:bg-primary
                    after:ease-in-out
                    ${props.task.completed ? 
                        'after:w-full' : 'after:w-0'
                    }
                    after:duration-300
                    after:transition-all
                    text-left 
                    truncate`
                }
            >
                {props.task.task}
            </label>
        </div>

        <button 
            className='text-danger ml-auto cursor-pointer'
            title='Удалить задачу'
            onClick={() => store.tasks.removeTask(props.task.id)}
        >
            <MdDelete />
        </button>

    </motion.div>
    {props.isInputOpen === props.task.id && !props.task.completed && <SubTaskInput ofTask={props.task.id} setFocus={true}/>}
    </>
  )
}

TaskItem.propTypes = {
    task: PropTypes.object,
    isInputOpen: PropTypes.string,
    setIsInputOpen: PropTypes.func
  };