import { useContext } from "react";
import { SettingsContext } from "./context/SettingsContext";

function Settings() {
    const { theme, toggleTheme } = useContext(SettingsContext);
    const btnText = theme === "dark" ? "light" : "dark";

    return (
        <div className="settings">
            <h2>Theme settings</h2>
            <button id="change-theme-btn" onClick={toggleTheme}>
                Change to {btnText}
            </button>
        </div>
    )
}

export default Settings;