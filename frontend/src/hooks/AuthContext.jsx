import { createContext, useState, useEffect, useContext, Children } from "react";
import { authService } from "../services/authService";
import { isAuthenticated } from "../helpers/authHelpers";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await authService.verifyToken();
                if(userData) {
                    setUser(userData.user);
                }
            } catch(error) {
                console.error('Token inválido:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const register = async (userData) => {
        try {
            setError(null);
            const data = await authService.register(userData);
            setUser(data.user);
            return data;
        } catch(error) {
            setError(error.message);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            const data = await authService.login(credentials);
            setUser(data.user);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setError(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};