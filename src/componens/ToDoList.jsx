import ToDoItem from "./ToDoItem.jsx";
import {memo, useContext} from "react";
import {TasksContext} from "../context/TasksContext.jsx";

const ToDoList = () => {
    const {
        tasks,
        filteredTasks,
    } = useContext(TasksContext);

    const hasTasks = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if (!hasTasks) {
        return <div className="todo__empty-message">There are no tasks yet</div>
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks not found </div>

    }


    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) => (
                <ToDoItem
                    className='todo__item'
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    isDone={task.isDone}
                />
            ))}

        </ul>
    )
}
export default ToDoList