import { memo, useContext } from 'react'
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import { TasksContext } from './context/TasksContext';

function TaskList() {
    const { tasks, filteredTasks, completedTasksAmount } = useContext(TasksContext);

    return (
        <main className="task-list">
            <h2>Completed tasks: {completedTasksAmount} of {tasks.length}</h2>
            <AddTask />
            {filteredTasks.map((task) => <TaskItem key={task.id} {...task} />)}
        </main>
    )
}

export default memo(TaskList);