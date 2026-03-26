import type { Bug, Task } from './types';

export const filterTasks = (tasks: Task[], query: string): Task[] => {
    if (!query.trim()) return tasks;
    const workQuery = query.toLowerCase().trim();

    return tasks.filter((task) =>
        task.title.toLowerCase().includes(workQuery));
}


export const isHighPriorityBug = (task: Task): task is Bug => {
    if (task.type !== "bug") return false;
    return task.severity === "critical";
}