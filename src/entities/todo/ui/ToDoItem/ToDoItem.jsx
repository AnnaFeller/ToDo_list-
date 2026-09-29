import { memo, useContext } from "react";
import { TasksContext } from "@/entities/todo";
import RouterLink from "@/shared/componens/RouterLink";
import styles from './todo-item.module.scss';
import { highlightCaseInsensitive } from "@/shared/utils/highlight.js";

const ToDoItem = (props) => {
    const {
        className = '',
        id,
        title,
        isDone,
    } = props;

    const {
        deleteTask,
        toggleTaskComplete,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        disappearingTaskId,
        appearingTaskId,
        searchQuery,
    } = useContext(TasksContext);

    const highLightedTitle = highlightCaseInsensitive(title, searchQuery);

    return (
        <li
            className={`${styles.todoItem} ${className} ${
                disappearingTaskId === id ? styles.isDisappearing : ''
            } ${appearingTaskId === id ? styles.isAppearing : ''}`}
            ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
        >
            <input
                className={styles.checkbox}
                id={`task-${id}`}
                type="checkbox"
                checked={isDone}
                onChange={({ target }) => {
                    toggleTaskComplete(id, target.checked);
                }}
            />
            <label className="visually-hidden" htmlFor={`task-${id}`}>
                {title}
            </label>

            <RouterLink
                to={`tasks/${id}`}
                className={styles.link}
                aria-label="Task detail page"
            >
                <span
                    className={`${styles.titleText} ${isDone ? styles.isCompleted : ''}`}
                    dangerouslySetInnerHTML={{ __html: highLightedTitle }}
                />
            </RouterLink>

            <button
                className={styles.deleteButton}
                aria-label="Delete task"
                title="Delete task"
                type="button"
                onClick={() => deleteTask(id)}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </li>
    );
};

export default memo(ToDoItem);