import {memo, useContext, useMemo} from "react";
import {TasksContext} from "../context/TasksContext.jsx";

const ToDoInfo =()=>{
    const {
       tasks,
        deleteAllTask,
    }= useContext(TasksContext);


    const total = tasks.length
    const hasTasks = total>0
    const done = useMemo(()=>{ // теперь при изменениях не связанных с состоянием (ввода теста), пересчет выполненных задач не булет выполняться заново
        return tasks.filter(({isDone}) => isDone).length
    },[tasks])


    return(
        <div className="todo__info">
            <div className="todo__total-tasks">
                Done {done} from {total}
            </div>
            {hasTasks &&(
                <button
                    className="todo__delete-all-button"
                    type="button"
                      onClick={deleteAllTask}
                >
                    Delete all
                </button>
            )}
        </div>
    )
}
export default memo(ToDoInfo)