require('dotenv').config();

const express = require('express');
const cors = require ('cors');
const { dbConnection } = require('./config/config');

const app = express();
const PORT = process.env.PORT || 8080;



dbConnection();

app.use(express.json());
app.use(cors({
    origin:'*'
}));

const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRoutes)

app.get('/', (req,res) => {
    res.json({
        message: 'API de tareas funcionando',
        endpoints: {
            auth: '/api/auth (register, login)',
            tasks: '/api/tasks CRUD de tareas'
        }
    });
});


app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`));
