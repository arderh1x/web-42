import { Fragment, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { Task, TaskSeverity, TaskStatus, TaskType } from "../types";

type RadioOption<V> = {
    readonly value: V;
    readonly label: string;
};

type FormProps = {
    onAddTask: (task: Task) => void;
}

function TaskForm({ onAddTask }: FormProps) {
    const titleInputRef = useRef<HTMLInputElement>(null);

    const [typeOption, setTypeOption] = useState<TaskType>("bug");
    const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        titleInputRef.current?.focus();
        setTypeOption(event.target.value as TaskType);
    }

    const [newTitle, setNewTitle] = useState<string>("");
    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => setNewTitle(event.target.value);

    const [statusOption, setStatusOption] = useState<TaskStatus>("todo");
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => setStatusOption(event.target.value as TaskStatus);

    const [severityOption, setSeverityOption] = useState<TaskSeverity>("low");
    const onSeverityChange = (event: ChangeEvent<HTMLInputElement>) => setSeverityOption(event.target.value as TaskSeverity);

    const [newPriority, setNewPriority] = useState<number | "">(1);
    const onPriorityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const priority = event.target.value;
        if (priority === "") setNewPriority("");
        else setNewPriority(+priority);
    }

    const [newRelease, setNewRelease] = useState<string>("");
    const onReleaseChange = (event: ChangeEvent<HTMLInputElement>) => setNewRelease(event.target.value);


    const onSubmit = (event: FormEvent<HTMLFormElement>) => { // for now I don't sure what I really should use, if this is deprecated
        event.preventDefault();
        if (!newTitle.trim()) return alert("Title is required!");
        let createdTask: Task;
        const baseData = {
            id: crypto.randomUUID(),
            title: newTitle.trim(),
            status: statusOption as TaskStatus,
        };

        typeOption === "bug"
            ? createdTask = {
                ...baseData,
                type: "bug",
                severity: severityOption as TaskSeverity,
            }
            : createdTask = {
                ...baseData,
                type: "feature",
                priority: newPriority === "" ? 0 : newPriority,
                expectedRelease: newRelease.trim() || undefined,
            };
        onAddTask(createdTask);

        setNewTitle("");
        setNewPriority(0);
        setNewRelease("");
    }


    const statusRadioOptions: RadioOption<TaskStatus>[] = [
        { value: "todo", label: "Todo" },
        { value: "in-progress", label: "In progress" },
        { value: "done", label: "Done" },
    ];

    const severityRadioOptions: RadioOption<TaskSeverity>[] = [
        { value: "low", label: "Low" },
        { value: "high", label: "High" },
        { value: "critical", label: "Critical" },
    ];

    // much better option is make components-fields or inputs, but for this task I focused on types more then on architecture 
    // and tried to optimize code for radio inputs - left task type selector as is for clarity
    return (
        <form id="add-task-form" onSubmit={onSubmit}>
            <h2>Add new task</h2>

            {/* TASK TYPE */}
            <div className="form-field">
                <label>Task type:</label>
                <input type="radio" id="select-type-bug" name="task-type" value="bug" required
                    checked={typeOption === "bug"} onChange={onTypeChange} />
                <label htmlFor="select-type-bug">Bug</label>

                <input type="radio" id="select-type-feature" name="task-type" value="feature" required
                    checked={typeOption === "feature"} onChange={onTypeChange} />
                <label htmlFor="select-type-feature">Feature</label>
            </div>

            {/* TASK TITLE */}
            <div className="form-field">
                <label>Title:</label>
                <input type="text" id="add-title" placeholder="Enter task title..." required
                    value={newTitle} onChange={onTitleChange} ref={titleInputRef} />
            </div>

            {/* TASK STATUS */}
            <div className="form-field">
                <label>Status:</label>
                {statusRadioOptions.map((option) => (<Fragment key={option.value}>
                    <input type="radio" id={`select-status-${option.value}`} name="task-status" required
                        value={option.value} checked={statusOption === option.value} onChange={onStatusChange} />
                    <label htmlFor={`select-status-${option.value}`}>{option.label}</label>
                </Fragment>))}
            </div>


            {/* IF TASK IS BUG
            =-- TASK SEVERITY */}
            {typeOption === "bug"
                ? (<div className="form-field">
                    <label>Severity:</label>
                    {severityRadioOptions.map((option) => (<Fragment key={option.value}>
                        <input type="radio" id={`select-severity-${option.value}`} name="task-severity" required
                            value={option.value} checked={severityOption === option.value} onChange={onSeverityChange} />
                        <label htmlFor={`select-severity-${option.value}`}>{option.label}</label>
                    </Fragment>))}
                </div>)

                : (<>
                    {/* IF TASK IS FEATURE 
                    =-- TASK PRIORITY*/ }
                    <div className="form-field">
                        <label>Priority:</label>
                        <input type="number" id="add-priority" required
                            value={newPriority} onChange={onPriorityChange} />
                    </div>

                    {/* TASK EXPECTED RELEASE */}
                    <div className="form-field">
                        <label>When will be expected release:</label>
                        <input type="text" id="add-release"
                            value={newRelease} onChange={onReleaseChange} />
                    </div>
                </>)}

            <button type="submit">Add task!</button>
        </form>
    )
}

export default TaskForm;