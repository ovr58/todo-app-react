import { MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md"
import PropTypes from 'prop-types'
import { useStore } from "../stores"
import { FaRegEdit } from "react-icons/fa"
import { ImCheckboxChecked } from "react-icons/im"
import { IoIosAddCircle, IoIosAddCircleOutline } from "react-icons/io"
import { SubTaskInput } from "./subTaskInput"

export const TaskItem = (props) => {

    const store = useStore()
  
    return (
    <>
    <div className="
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
    ">
        <button className='w-[5%]' onClick={() => {store.tasks.toggleCompleted(props.task.id)}}>
            {props.task.completed ? <ImCheckboxChecked /> : <MdCheckBoxOutlineBlank />}
        </button>

        <button className='w-[5%]' onClick={() => (props.setIsInputOpen(''), store.tasks.editTask(props.task))}>
            <FaRegEdit />
        </button>

        {
            !props.task.completed && 
            <button className='w-[5%]' onClick={
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
                    `${props.task.completed ? 
                    'line-through' : 
                    'font-bold'}
                    text-left 
                    truncate`
                }
            >
                {props.task.task}
            </label>
        </div>

        <button 
            className='text-danger ml-auto'
            onClick={() => store.tasks.removeTask(props.task.id)}
        >
            <MdDelete />
        </button>

    </div>
    {props.isInputOpen === props.task.id && !props.task.completed && <SubTaskInput ofTask={props.task.id} setFocus={true}/>}
    </>
  )
}

TaskItem.propTypes = {
    task: PropTypes.object,
    isInputOpen: PropTypes.string,
    setIsInputOpen: PropTypes.func
  };