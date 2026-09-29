import {useContext} from "react";
import {TasksContext, TodoItem} from "@/entities/todo";


const TodoList = (props) => {
    const {styles} = props;
    const {
        tasks,
        filteredTasks,
    } = useContext(TasksContext);

    const hasTasks = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if (!hasTasks) {
        return (
            <div className={styles.emptyContainer}>
                <div className={styles.emptyIcon}>📝</div>
                <div className={styles.emptyMessage}>There are no tasks yet</div>
                <span className={styles.emptySubtext}>Add your first task above</span>
            </div>

        )

    }

    if (hasTasks && isEmptyFilteredTasks) {
        return(
            <div className={styles.emptyContainer}>
                <div className={styles.emptyIcon}>🔍</div>
                <div className={styles.emptyMessage}>Tasks not found</div>
            </div>        )

    }


    return (
        <ul className={styles.list}>
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className={styles.item}
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    isDone={task.isDone}
                />
            ))}

        </ul>
    )
}
export default TodoList

