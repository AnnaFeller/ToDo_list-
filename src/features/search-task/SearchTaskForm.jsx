import Field from "@/shared/componens/Field";
import {useContext} from "react";
import {TasksContext} from "@/entities/todo";

const SearchTaskForm = (props) =>{
const {styles} = props;
    const {
        setSearchQuery,
        searchQuery

    }=useContext(TasksContext);
    return (
        <form
            onSubmit={(event)=>event.preventDefault()} //отключает перезагрузку страници
            className={styles.form}>
           <Field
           className={styles.field}
           label="Search Task"
           id="search-task"
           type="search"
           value={searchQuery}
           onInput={(event)=>setSearchQuery(event.target.value)}/>
        </form>

    )
}
export default SearchTaskForm