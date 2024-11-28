import { observer } from "mobx-react-lite";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { useStore } from "../stores";

export const ThemeToggle = observer(() => {
    const { theme } = useStore();
    return (
        <button
            onClick={() => theme.setTheme()}
            className={`
                flex
                items-center
                gap-[3px]
                text-[18px]
                p-[3px]
                bg-primary
                text-dark
                rounded-full
                relative
                after:content-['']
                after:absolute
                after:bg-light
                after:h-[18px]
                after:w-[18px]
                after:rounded-full
                after:ease-in-out
                after:duration-300
                after:transition-all
                ${theme.cssMode === 'light' ? 
                    'after:left-[3px]' : 
                    'after:left-[calc(3px+18px+3px)]'}
                `}
        >
            <IoIosSunny></IoIosSunny>
            <IoIosMoon></IoIosMoon>
        </button>
    );
})