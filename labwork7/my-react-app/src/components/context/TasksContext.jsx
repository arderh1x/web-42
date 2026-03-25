import { createContext, useState, useEffect, useCallback, useMemo } from "react";

export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) return JSON.parse(savedTasks);
        return [
            { id: "t1", body: "Initial completed task", isCompleted: true },
            { id: "t2", body: "Initial active task", isCompleted: false },
        ];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    const addTask = useCallback((newTaskBody) => {
        if (newTaskBody.trim().length > 0) {
            const newTask = {
                id: crypto.randomUUID(),
                body: newTaskBody,
                isCompleted: false
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }
    }, []);

    const deleteTask = useCallback((taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }, []);

    const updateTaskBody = useCallback((taskId, newBody) => {
        setTasks((prevTasks) => prevTasks.map((task) =>
            task.id === taskId ? { ...task, body: newBody } : task));
    }, []);

    const toggleTaskCompletion = useCallback((taskId, isCompleted) => {
        setTasks((prevTasks) => prevTasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted } : task));
    }, []);


    const [filterOption, setFilterOption] = useState("all");

    const filteredTasks = useMemo(() => {
        switch (filterOption) {
            case "completed":
                return tasks.filter((task) => task.isCompleted);
            case "active":
                return tasks.filter((task) => !task.isCompleted);
            case "all":
            default:
                return tasks;
        }
    }, [tasks, filterOption]);

    const completedTasksAmount = useMemo(() => tasks.filter((task) => task.isCompleted).length, [tasks]);

    return (
        <TasksContext.Provider value={{
            tasks, setTasks,
            addTask, deleteTask, updateTaskBody, toggleTaskCompletion,
            filterOption, setFilterOption,
            filteredTasks,
            completedTasksAmount
        }}>
            {children}
        </TasksContext.Provider>
    )
}