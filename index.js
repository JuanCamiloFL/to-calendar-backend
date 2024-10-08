import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import apiDb from './config/apiDb.js'; // Conexión a MongoDB
import userRoutes from './routes/userRoutes.js'; // Rutas para usuarios
import apiRoutes from './routes/apiRoutes.js'; 
import cors from 'cors';
import { loadDataFromJSON } from './controllers/apiController.js'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes); // Rutas de usuario
app.use('/api', apiRoutes);

//// Sincronizar la base de datos y arrancar el servidor
sequelize.sync().then(async () => {
  console.log('Database synced!');

  // Cargar datos desde JSON al iniciar el servidor
  try {
    await loadDataFromJSON(); 
    console.log('Datos cargados correctamente.');
  } catch (error) {
    console.error('Error cargando datos:', error); 
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.log('Error syncing database:', error);
});
