 import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";


 export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const{children} = props

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

 return (
     <TasksContext.Provider
         value={{
          tasks,
          filteredTasks,
          firstIncompleteTaskRef,
          firstIncompleteTaskId,
          deleteAllTask,
          deleteTask,
          toggleTaskComplete,

          newTaskTitle,
          setNewTaskTitle,
          searchQuery,
          newTaskInputRef,
          setSearchQuery,
          addTask,
         }}
     >

      {children}
     </TasksContext.Provider>
 )
}