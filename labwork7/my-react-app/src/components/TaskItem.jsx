import { memo, useContext, useState } from 'react';
import { TasksContext } from './context/TasksContext';

function TaskItem(props) {
    const { id = "t0", body = "Empty task", isCompleted = false } = props;
    const { deleteTask, toggleTaskCompletion, updateTaskBody } = useContext(TasksContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editedBody, setEditedBody] = useState(body);

    const onDelete = () => deleteTask(id);
    const onCheckingChange = (event) => toggleTaskCompletion(id, event.target.checked);
    const onEditingChange = (event) => setEditedBody(event.target.value);


    const onStartEditing = () => {
        setIsEditing(true);
        setEditedBody(body);
    };

    const onEnterOrEscape = (event) => {
        if (event.key === "Enter") onSaving();
        else if (event.key === "Escape") onCanceling();
    };

    const onSaving = () => {
        if (editedBody.trim() !== "") {
            updateTaskBody(id, editedBody);
            setIsEditing(false);
        }
        else deleteTask(id);
    };

    const onCanceling = () => {
        setIsEditing(false);
        setEditedBody(body);
    };

    return (
        <div className={`task-item${isCompleted ? " completed" : ""}`}>
            <button id="delete-task-btn" onClick={onDelete}>🗑️</button>
            <input type="checkbox" id="task-completion"
                checked={isCompleted}
                onChange={onCheckingChange} />

            {isEditing
                ? (<input className="task-edit" type="text" autoFocus
                    value={editedBody}
                    onChange={onEditingChange}
                    onKeyDown={onEnterOrEscape}
                    onBlur={onSaving} />)
                : (<p className="task-body" onDoubleClick={onStartEditing}>{body}</p>)}
        </div>
    );
}

export default memo(TaskItem);