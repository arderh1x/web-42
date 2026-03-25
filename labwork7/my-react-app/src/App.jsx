import './App.css'
import TaskManager from './components/TaskManager';
import { TasksProvider } from './components/context/TasksContext';
import { SettingsProvider } from './components/context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <TasksProvider>
        <TaskManager />
      </TasksProvider>
    </SettingsProvider>
  )
}

export default App;