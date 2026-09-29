import {createContext, useMemo} from "react";
import useTasks from "./useTasks.js";
import useIncompleteTaskScroll from "../ui/useIncompleteTaskScroll.js";


export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {children} = props

    const {
        tasks,
        filteredTasks,
        deleteAllTask,
        deleteTask,
        toggleTaskComplete,
        searchQuery,
        newTaskInputRef,
        setSearchQuery,
        addTask,
        disappearingTaskId,
        appearingTaskId,
    } = useTasks()

    const {
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    } = useIncompleteTaskScroll(tasks)

    const value = useMemo(() => ({
        tasks,
        filteredTasks,
        deleteAllTask,
        deleteTask,
        toggleTaskComplete,

        searchQuery,
        newTaskInputRef,
        setSearchQuery,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    }), [
        tasks,
        filteredTasks,
        deleteAllTask,
        deleteTask,
        toggleTaskComplete,
        searchQuery,
        newTaskInputRef,
        setSearchQuery,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId
    ])

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}