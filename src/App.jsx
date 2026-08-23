
import ToDo from "./componens/ToDo.jsx";
import {TasksProvider} from "./context/TasksContext.jsx";

const App = () => {


    return (
        <TasksProvider>
            <ToDo/>
        </TasksProvider>

    )
}

export default App
