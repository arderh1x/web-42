import type { Task } from "../types";
import { isHighPriorityBug } from "../utils";

type CardProps = { task: Task };
function TaskCard({ task }: CardProps) {
    const isBug: boolean = task.type === "bug"; // don't work on type narrowing, but I decided to keep it for demo
    const isHot = isHighPriorityBug(task);

    return (
        <div className={`task-card ${isBug ? "red" : "green"}-border ${isHot ? "hot-task" : ""}`}>
            <p className="task-title">{task.title}</p>
            <p>Status: <b>{task.status}</b></p>
            {task.type === "bug"
                ? (<p>Bug severity:
                    <b className="task-severity"> {task.severity}</b>
                </p>)

                : (<>
                    <p> Feature priority:
                        <b> {task.priority}</b>
                    </p>
                    {task.expectedRelease && <p>Expected release: {task.expectedRelease}</p>}
                </>)}
        </div>
    )
}

export default TaskCard;