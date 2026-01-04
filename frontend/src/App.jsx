import React, { useState, useEffect } from "react";
import { taskService } from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTaskModal from "./components/EditTaskModal";

export default function App() {
    const [ tasks, setTasks ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    const [ editingTask, setEditingTask ] = useState(null);
    const [ isModalOpen, setIsModalOpen ] = useState(false);

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
          setTasks(prevTasks => prevTasks.filter(task => task._id !==id));
          setTimeout(() => setSuccess(''), 2000);
        } catch(err) {
          setError('No se pudo eliminar la tarea')
          loadTasks();
        }
      }
    };

    const handleToggleComplete = async (id, completed) => {
      try {
        await taskService.update(id, {completed});
        setTasks(prevTasks =>
          prevTasks.map(task => 
          task._id === id ? { ...task, completed } : task
          )
        );
      } catch(err) {
        setError('No se pudo actualizar la tarea')
        loadTasks();
      }
    };

    const handleEditTask = (task) => {
      setEditingTask(task);
      setIsModalOpen(true);
    };

    const handleSaveEdit = async (updatedTask) => {
      try {
        await taskService.update(updatedTask._id, {
          title: updatedTask.title,
          reminderDate: updatedTask.reminderDate,
          priority: updatedTask.priority

        });

        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setSuccess('Tarea actualizada');
        setTimeout(() => setSuccess(''), 2000);
      } catch(err) {
        setError('Error al actualizar la tarea');

      }
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingTask(null);
    };



    return (
        <div className="min-h-screen bg-slate-900 from-blue-50 to-indigo-100 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
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

        <EditTaskModal
         task={editingTask}
         isOpen={isModalOpen}
         onClose={handleCloseModal}
         onSave={handleSaveEdit} 
         />
      </div>
    </div>
  
    );
}