const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');



dbConnection();

app.use(express.json());

const tasksRoutes = require('./routes/tasks');
app.use('/tasks', tasksRoutes);

app.get('/', (req,res) => {
    res.send('API de tareas - Usa /tasks para ver las tareas');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));