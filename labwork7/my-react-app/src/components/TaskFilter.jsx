import { useContext } from "react";
import { TasksContext } from "./context/TasksContext";

function TaskFilter() {
    const { filterOption, setFilterOption } = useContext(TasksContext);

    const onChange = (event) => setFilterOption(event.target.value);

    return (
        <aside className="task-filter">
            <fieldset>
                <legend>Filter options:</legend>

                <div>
                    <input type="radio" id="filter-all" name="filter" value="all"
                        checked={filterOption === "all"}
                        onChange={onChange}
                    />
                    <label htmlFor="filter-all">All</label>
                </div>

                <div>
                    <input type="radio" id="filter-active" name="filter" value="active"
                        checked={filterOption === "active"}
                        onChange={onChange} />
                    <label htmlFor="filter-active">Active</label>
                </div>

                <div>
                    <input type="radio" id="filter-completed" name="filter" value="completed"
                        checked={filterOption === "completed"}
                        onChange={onChange} />
                    <label htmlFor="filter-completed">Completed</label>
                </div>
            </fieldset>
        </aside>
    )
}

export default TaskFilter;