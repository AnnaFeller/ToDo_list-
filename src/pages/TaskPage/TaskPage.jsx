import { useEffect, useState } from "react";
import tasksAPI from "@/shared/api/tasks/index.js";
import styles from "./taskPage.module.scss";

const TaskPage = (props) => {
    const { params } = props;
    const taskId = params.id;

    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        tasksAPI
            .getById(taskId)
            .then((taskData) => {
                setTask(taskData);
                setHasError(false);
            })
            .catch(() => {
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [taskId]);

    if (isLoading) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.loader}>
                    <div className={styles.spinner} />
                    <span>Загрузка задачи...</span>
                </div>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className={styles.centerContainer}>
                <div className={styles.errorCard}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h2 className={styles.errorTitle}>Ошибка доступа</h2>
                    <p className={styles.errorText}>
                        Задача с ID <code className={styles.code}>{taskId}</code> не найдена или была удалена.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{task.title}</h1>
                    <span
                        className={`${styles.badge} ${
                            task.isDone ? styles.badgeDone : styles.badgePending
                        }`}
                    >
            {task.isDone ? "Completed" : "In Progress"}
          </span>
                </div>

                <div className={styles.body}>
                    <p className={styles.description}>
                        {task.isDone
                            ? "Отличная работа! Задача успешно завершена."
                            : "Эта задача всё еще ждет своего выполнения."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;