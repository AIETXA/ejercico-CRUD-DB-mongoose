import React, { useState, useEffect } from "react";
import { taskService } from "./services/taskService";
import TaskForm from "./components/TaskForm";

export default function App() {
    const [ tasks, setTasks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await taskService.getAll();
            setTasks(data);
            setError('');
        } catch(err) {
            setError('Error al cargar las tareas. Comprobar que el back esté corriendo');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            await taskService.create(taskData);
            setSuccess('¡Tarea creada exitosamente!');
            loadTasks();
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            setError('Error al crear la tarea');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestor de Tareas
        </h1>

        {loading && <p className="text-gray-600">Cargando tareas...</p>}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

         {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        <TaskForm onTaskCreated={handleCreateTask} />
        
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Tareas encontradas: {tasks.length}
            </h2>
            {tasks.length === 0 ? (
              <p className="text-gray-500">No hay tareas todavía</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map(task => (
                  <li key={task._id} className="border-b pb-2">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">
                      Estado: {task.completed ? '✅ Completada' : '⏳ Pendiente'}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  
    );
}