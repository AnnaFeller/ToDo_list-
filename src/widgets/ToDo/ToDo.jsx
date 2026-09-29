
import {useContext, useEffect, useState} from "react";
import {TasksContext} from "@/entities/todo";
import AddTaskForm from "@/features/add-task";
import SearchTaskForm from "@/features/search-task/";
import Button from "@/shared/componens/Button";
import ToDoInfo from "@/features/stats";
import {TodoList} from "@/entities/todo";
import styles from './todo.module.scss'
import ThemePicker from "@/shared/componens/ThemePicker/ThemePicker.jsx";


const Todo = () => {
    const { firstIncompleteTaskRef } = useContext(TasksContext);
    const [bgTheme, setBgTheme] = useState('#18181BFF');

    useEffect(() => {
        document.body.style.backgroundColor = bgTheme;
        document.body.style.transition = 'background-color 0.4s ease';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [bgTheme]);

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.todo}>
                <ThemePicker
                    bgTheme={bgTheme}
                    setBgTheme={setBgTheme}
                    styles={styles}
                />

                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>To Do List</h1>
                        <p className={styles.subtitle}>Manage your daily tasks</p>
                    </div>
                    <ToDoInfo />
                </div>

                <div className={styles.controls}>
                    <AddTaskForm styles={styles} />
                    <div className={styles.searchRow}>
                        <SearchTaskForm styles={styles} />
                        <Button
                            variant="primary"
                            className={styles.scrollBtn}
                            onClick={() =>
                                firstIncompleteTaskRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }
                        >
                            First unfulfilled task ↓
                        </Button>
                    </div>
                </div>

                <TodoList styles={styles} />
            </div>
        </div>
    );
};

export default Todo;