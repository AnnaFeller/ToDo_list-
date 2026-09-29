import { memo, useContext, useMemo } from "react";
import { TasksContext } from "@/entities/todo";
import Button from "@/shared/componens/Button"; // Используем переиспользуемый Button
import localStyles from './ToDoInfo.module.scss';

const ToDoInfo = ({ styles = localStyles }) => {
    const { tasks, deleteAllTask } = useContext(TasksContext);

    const total = tasks.length;
    const hasTasks = total > 0;
    const done = useMemo(() => tasks.filter(({ isDone }) => isDone).length, [tasks]);

    return (
        <div className={styles.info}>
            <div className={styles.totalTasks}>
                Done <span className={styles.counter}>{done}</span> out <span className={styles.counter}>{total}</span>
            </div>
            {hasTasks && (
                <Button
                    variant="danger"
                    size="sm"
                    type="button"
                    onClick={deleteAllTask}
                >
                   Delete All Tasks
                </Button>
            )}
        </div>
    );
};

export default memo(ToDoInfo);