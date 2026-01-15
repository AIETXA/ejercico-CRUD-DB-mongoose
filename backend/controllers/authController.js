const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

exports.register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }

        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'El correo ya está registrado'});
        }

        

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        console.log('JWT_SECRET:', process.env.JWT_SECRET);


        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error a la hora de registrarse:', error);
        res.status(500).json({message: 'Error en el servidor', error});
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({message: 'Email y contraseña obligatorios'});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'Credenciales inválidas'})
        }

        const passwordOk = await bcrypt.compare(password, user.password );
        if(!passwordOk) {
            return res.status(401).json({message: 'Credenciales inválidas'});
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.error('Error en el login:', error);
        res.status(500).json({message: 'Error en el servidor', error})
    }
};

exports.verifyToken = async(req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if(!token) {
            return res.status(401).json({message: 'No hay token'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if(!user) {
            return res.status(401).json({message: 'Usuario no encontrado'});
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        res.status(401).json({message: 'Token inválido'});
    }
};

exports.logout = async(req, res) => {
    try {
        res.json({message: 'Sesión cerrada con éxito'})
    } catch(error){
        res.status(500).json({message: 'Error al cerrar sesión'});
    }
};