import Settings from './Settings';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';

function TaskManager() {
    return (
        <>
            <header id="main-header">
                <h1>Task Manager</h1>
                <Settings />
            </header>

            <TaskList />
            <TaskFilter />
        </>
    )
}
export default TaskManager;