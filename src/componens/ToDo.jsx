import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import ToDoInfo from "./ToDoInfo.jsx";
import ToDoList from "./ToDoList.jsx";
import {useState, useEffect, useRef, useCallback, useMemo} from "react";
import Button from "./Button.jsx";


const ToDo = () => {

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return [{id: 'task-1', title: "hugs", isDone: false},
            {id: 'task-2', title: "to pet a cat", isDone: true}];

    });

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const newTaskInputRef = useRef(null);
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id;

    const deleteAllTask = useCallback(() => {
        const isConfirmed = confirm("Are you sure you want to delete?");
        if (isConfirmed) { //удаляет все задания
            setTasks([])
        }
    },[])

    const deleteTask = useCallback((taskId) => {
            setTasks(
                tasks.filter((task) => task.id !== taskId)
            )

        },[tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return {...task, isDone};
                }
                return task;
            })
        )
    },[tasks])


    const addTask = useCallback( () => {

        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(), //уникальный айди
                title: newTaskTitle,
                isDone: false,
            }
            setTasks((prevTasks)=>[...prevTasks, newTask]);
            setNewTaskTitle("")
            setSearchQuery("")
            newTaskInputRef.current.focus();
        } //после успешного добавления задачи, состояние очищается и поле сращу становится пустым

    },[newTaskTitle])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));//сохранение данных
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current.focus(); //отрисует весь компонент и только потом выполнит этот код
    }, [])


    // const renderCount= useRef(0)
    // useEffect(() => {
    //     renderCount.current ++;
    //     console.log(`component to do rendered ${renderCount.current} times`);
    // }) //->если ьы доьавила [] то еффект сработал только 1 раз ппри первом рендере


    const filteredTasks = useMemo(()=>{
        const clearSearchQuery = searchQuery.trim().toLowerCase()

        return clearSearchQuery.length > 0
            ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
            : null
    },[searchQuery,tasks])
    // если будут только пробелы или пустота то вернет налл


    // const memoizedFn = useCallback((/* параметры*/)=>{
    //     //тело
    // },[/*зависимость*/])

    const doneTasks = useMemo(()=>{ // теперь при изменениях не связанных с состоянием (ввода теста), пересчет выполненных задач не булет выполняться заново
        return tasks.filter(({isDone}) => isDone).length
    },[tasks])





    return (<div className="todo">
        <h1 className="todo__title">To Do List</h1>
        <AddTaskForm addTask={addTask}
                     newTaskTitle={newTaskTitle}
                     setNewTaskTitle={setNewTaskTitle}
                     newTaskInputRef={newTaskInputRef}/>

        <SearchTaskForm
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
        />
        <ToDoInfo
            total={tasks.length}
            done={doneTasks}
           onDeleteAllButtonClick={deleteAllTask}
        />
        <Button onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: "smooth"})} >
            Show first incomplete task
        </Button>
        <ToDoList
            tasks={tasks}
            onDeleteAllButtonClick={deleteTask}
            onTaskCompleteChange={toggleTaskComplete}
            filteredTasks={filteredTasks}
            firstIncompleteTaskRef={firstIncompleteTaskRef}
            firstIncompleteTaskId={firstIncompleteTaskId}
        />
    </div>)
}

export default ToDo