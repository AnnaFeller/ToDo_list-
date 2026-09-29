import Router from "./routing/Router.jsx";
import TasksPage from "@/pages/TasksPage";
import TaskPage from "@/pages/TaskPage";
import './styles'


const App = () => {
    const routes = {
        '/': TasksPage,
        '/tasks/:id': TaskPage,
        '*': () => <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>404 - Страница не найдена</div>
    };

    return <Router routes={routes} />;
};

export default App;