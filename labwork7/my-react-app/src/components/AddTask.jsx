import { useContext, useRef, useState, useEffect } from "react";
import { TasksContext } from "./context/TasksContext";

function AddTask() {
    const { addTask } = useContext(TasksContext);
    const [newTaskBody, setNewTaskBody] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        addTask(newTaskBody);
        setNewTaskBody("");
        inputRef.current.focus();
    }

    const onInput = (event) => setNewTaskBody(event.target.value);

    return (
        <form className="add-task" onSubmit={onSubmit}>
            <input placeholder="Type task here..." type="text" id="add-task-input"
                value={newTaskBody} onInput={onInput}
                ref={inputRef} />

            <button id="add-task-btn" type="submit">Add task!</button>
        </form>
    )
}

export default AddTask;