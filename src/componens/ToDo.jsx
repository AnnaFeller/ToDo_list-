import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import ToDoInfo from "./ToDoInfo.jsx";
import ToDoList from "./ToDoList.jsx";
import { useContext} from "react";
import Button from "./Button.jsx";
import {TasksContext} from "../context/TasksContext.jsx";


const ToDo = () => {
const {firstIncompleteTaskRef} = useContext(TasksContext);

    return (
           <div className="todo">
           <h1 className="todo__title">To Do List</h1>
           <AddTaskForm />

           <SearchTaskForm/>

           <ToDoInfo/>
           <Button onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: "smooth"})} >
               Show first incomplete task
           </Button>
           <ToDoList/>
       </div>

    )
}

export default ToDo