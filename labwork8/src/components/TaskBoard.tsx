import { useMemo, useState } from "react";
import type { Task } from "../types";
import List from "./List";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import { filterTasks } from "../utils";
import TaskSearch from "./TaskSearch";

function TaskBoard() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "t1",
            type: "bug",
            title: "Error in render items",
            status: "in-progress",
            severity: "high"
        },
        {
            id: "t2",
            type: "feature",
            title: "Add tasks",
            status: "todo",
            expectedRelease: "10-10-2026",
            priority: 1
        },
        {
            id: "t3",
            type: "feature",
            title: "Edit theme",
            status: "todo",
            priority: 2
        },
    ]);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredTasks = useMemo(() => filterTasks(tasks, searchQuery),
        [tasks, searchQuery]);

    const addTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    return (<>
        <TaskForm onAddTask={addTask} />
        <TaskSearch query={searchQuery} onChange={setSearchQuery} />

        <div id="tasks-list">
            <List<Task> items={filteredTasks}
                renderItem={(task) => (<TaskCard task={task} />)} />
        </div>
    </>)
}

export default TaskBoard;