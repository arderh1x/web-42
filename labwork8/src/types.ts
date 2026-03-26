export type TaskType = "bug" | "feature";
export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskSeverity = "low" | "high" | "critical";

interface ITask {
    id: number | string;
    title: string;
    status: TaskStatus;
    type: TaskType;
}

export type Bug = ITask & {
    type: "bug";
    severity: TaskSeverity;
};

export type Feature = ITask & {
    type: "feature";
    expectedRelease?: string;
    priority: number;
};

export type Task = Bug | Feature;