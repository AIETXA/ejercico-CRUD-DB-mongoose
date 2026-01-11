import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Login = ({ onToggleForm }) => {
    const { login, error } = useAuth();

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const [ localError, setLocalError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
        setLocalError('');
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!formData.email || !formData.password) {
            setLocalError('Todos los campos son obligatorios');
            return;
        }

        setLoading(true);
        try {
            await login(formData);
        } catch (error) {
            setLocalError(error.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-700 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-800 ">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    Bienvenido al gestor de tareas.
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    Inicia sesión para continuar.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Tu contraseña"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        
                    </div>

                    {(localError || error) && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {localError || error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled= {loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursos-not-allowed">
                         {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}   
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    ¿Aún no tenés cuenta?{''}
                    <span
                        onClick={onToggleForm}
                        className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
                            Registrate aquí
                    </span>
                </p>
            </div>
        </div>
        );
    };

    export default Login;