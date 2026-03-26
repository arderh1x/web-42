import { type ChangeEvent } from "react";

type SearchProps = {
    query: string;
    onChange: (value: string) => void;
}

function TaskSearch({query, onChange}: SearchProps) {
    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

    return (
        <div id="search-bar">
            <label htmlFor="search-input">Search tasks by title:</label>

            <input type="text" id="search-input" placeholder="Enter search query..."
                value={query} onChange={onSearchChange}/>
        </div>
    );
}

export default TaskSearch;