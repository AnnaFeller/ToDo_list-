import Field from "./Field.jsx";
import Button from "./Button.jsx";

const AddTaskForm = (props) => {
    const{
    addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef,
    }=props;

    const onSubmit = (event) => {
        event.preventDefault();
        addTask()
    }

    return (
        <form className="todo__form" onSubmit={onSubmit} >
            <Field
            className = "todo__field"
            lable ="New task title"
            id ="new-task"
            value={newTaskTitle}// обновляет состояние и реакт перерисовывет компонет
            onInput={(event)=>setNewTaskTitle(event.target.value)}
            ref={newTaskInputRef}
            />
            <Button type="submit">Add</Button>
        </form>
    )
}
export default AddTaskForm;