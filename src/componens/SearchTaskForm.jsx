import Field from "./Field.jsx";
import {useContext} from "react";
import {TasksContext} from "../context/TasksContext.jsx";

const SearchTaskForm = () =>{
    const {
        setSearchQuery,
        searchQuery

    }=useContext(TasksContext);
    return (
        <form
            onSubmit={(event)=>event.preventDefault()} //отключает перезагрузку страници
            className="todo__form">
           <Field
           className="todo__field"
           label="Search Task"
           id="search-task"
           type="search"
           value={searchQuery}
           onInput={(event)=>setSearchQuery(event.target.value)}/>
        </form>

    )
}
export default SearchTaskForm