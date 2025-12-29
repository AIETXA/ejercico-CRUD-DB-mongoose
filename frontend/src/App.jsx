import React, { useState, useEffect } from "react";
import { taskService } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

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

    const handleDeleteTask = async (id) => {
      if(window.confirm('¿Estas seguro de que quieres eliminar la tarea?')) {
        try {
          await taskService.delete(id);
          setSuccess('Tarea eliminada');
          loadTasks();
          setTimeout(() => setSuccess(''), 2000);
        } catch(err) {
          setError('No se pudo eliminar la tarea')
        }
      }
    };

    const handleToggleComplete = async (id, completed) => {
      try {
        await taskService.update(id, {completed});
        loadTasks();
      } catch(err) {
        setError('No se pudo actualizar la tarea')
      }
    };

    const handleEditTask = (task) => {
      alert(`Editar tarea:${task.title}`)
    };



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Gestor de Tareas
            </h1>

          {loading && (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">Cargando tareas...</p>
            </div>  
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

         {success && (
          <div className="mb-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p className="text-green-800 font-medium">{success}</p>
          </div>
          )}

        <TaskForm onTaskCreated={handleCreateTask} />
        
        {!loading && (
          <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onToggleComplete={handleToggleComplete}
          />

         
        )}
      </div>
    </div>
  
    );
}