import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";

const Register = ({ onToggleForm }) => {
    const { register, error } = useAuth();

    const [ formData, setFormData ] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
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

        if(!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setLocalError('Todos los campos son obligatorios');
            return;
        }

        if(formData.password !== formData.confirmPassword) {
            setLocalError('Las contraseñas no coinciden');
            return;
        }

        if(formData.password.length < 6) {
            setLocalError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        try {
            const { confirmPassword, ...registerData } = formData;
            await register(registerData);
        } catch(error) {
            setLocalError(error.message || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl shadow-[0_0_50px_rgba(29,78,216,0.7),0_0_25px_rgba(30,58,138,0.9)] p-8 w-full max-w-md border border-blue-900/70">
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    Crear Cuenta
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    Registrate para comenzar
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                            placeholder="Mínimo 6 caracteres"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repite tu contraseña"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    {(localError || error) && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                            {localError || error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    ¿Ya tienes cuenta?{' '}
                    <span 
                        onClick={onToggleForm}
                        className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                    >
                        Inicia sesión aquí
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
