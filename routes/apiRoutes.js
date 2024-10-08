import express from 'express';
import { loadDataFromJSON, 
    getAllIdiomas, 
    getSesionesByNivel, 
    getTotalSesionesByNivel, 
    updateDataFromJSON, 
    deleteIdioma } from '../controllers/apiController.js';

const apirouter = express.Router();

// Rutas para la API
apirouter.get('/idiomas', getAllIdiomas); // Obtener todos los idiomas
apirouter.post('/idiomas/load', loadDataFromJSON); // Cargar datos desde el JSON
apirouter.get('/idiomas/:nombre/niveles/:nivel/sesiones', getSesionesByNivel); // Obtener sesiones de un nivel específico
apirouter.get('/idiomas/:nombre/niveles/:nivel/total-sesiones', getTotalSesionesByNivel); // Obtener total de sesiones de un nivel específico
apirouter.put('/idiomas/update', updateDataFromJSON); // Actualizar la base de datos desde el JSON
apirouter.delete('/idiomas/:nombre', deleteIdioma); // Eliminar un idioma por nombre


export default apirouter;
