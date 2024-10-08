import Api from '../models/api.js'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtener el directorio del archivo actual
const __dirname = path.dirname(__filename);

// Leer el JSON y guardarlo en la base de datos
export const loadDataFromJSON = async () => {
  try {
    const jsonPath = path.join(__dirname, '../api.json'); 
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(jsonData);

    // Guardar el JSON en la base de datos
    await Api.deleteMany(); // Limpiar la base de datos antes de cargar nuevos datos
    await Api.insertMany(data); // Insertar todos los idiomas desde el JSON
    console.log('Datos cargados correctamente');
  } catch (error) {
    console.error(`Error cargando datos: ${error.message}`);
  }
};


// Obtener todos los idiomas
export const getAllIdiomas = async (req, res) => {
  try {
    const idiomas = await Api.find();
    res.status(200).json(idiomas);
  } catch (error) {
    res.status(500).json({ error: `Error obteniendo idiomas: ${error.message}` });
  }
};

// Obtener sesiones de un nivel específico dentro de un idioma
export const getSesionesByNivel = async (req, res) => {
  try {
    const { nombre, nivel } = req.params;
    const idioma = await Api.findOne({ nombre });

    if (!idioma) {
      return res.status(404).json({ message: "Idioma no encontrado" });
    }

    const nivelData = idioma.niveles.find((n) => n.nivel === nivel);

    if (!nivelData) {
      return res.status(404).json({ message: "Nivel no encontrado" });
    }

    res.status(200).json(nivelData.sesiones); // Enviar todas las sesiones del nivel
  } catch (error) {
    res.status(500).json({ error: `Error obteniendo sesiones: ${error.message}` });
  }
};

// Obtener el número total de sesiones de un nivel específico
export const getTotalSesionesByNivel = async (req, res) => {
  try {
    const { nombre, nivel } = req.params;
    const idioma = await Api.findOne({ nombre });

    if (!idioma) {
      return res.status(404).json({ message: "Idioma no encontrado" });
    }

    const nivelData = idioma.niveles.find((n) => n.nivel === nivel);

    if (!nivelData) {
      return res.status(404).json({ message: "Nivel no encontrado" });
    }

    res.status(200).json({ total_sesiones: nivelData.total_sesiones });
  } catch (error) {
    res.status(500).json({ error: `Error obteniendo total de sesiones: ${error.message}` });
  }
};

// Actualizar la base de datos a partir del JSON
export const updateDataFromJSON = async (req, res) => {
  try {
    const jsonPath = path.join(__dirname, '../api.json'); 
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(jsonData);

    // Actualiza la base de datos
    await Api.deleteMany(); // Limpia la base de datos antes de cargar nuevos datos
    await Api.insertMany(data.idiomas); // Insertar todos los idiomas desde el JSON
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  } catch (error) {
    res.status(500).json({ error: `Error actualizando datos: ${error.message}` });
  }
};

// Eliminar un idioma por nombre 
export const deleteIdioma = async (req, res) => {
  try {
    const { nombre } = req.params;
    const idioma = await Api.findOneAndDelete({ nombre });
    if (!idioma) {
      return res.status(404).json({ message: "Idioma no encontrado" });
    }
    res.status(200).json({ message: "Idioma eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: `Error eliminando idioma: ${error.message}` });
  }
};
