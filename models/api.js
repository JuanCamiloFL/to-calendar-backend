import mongoose from 'mongoose';

const SesionSchema = new mongoose.Schema({
  sesion: { type: Number, required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: false },
});

const NivelSchema = new mongoose.Schema({
  nivel: { type: String, required: true },
  total_sesiones: { type: Number, required: true },
  sesiones: [SesionSchema],
});

const IdiomaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },  
  niveles: [NivelSchema],
});

const Api = mongoose.model('Api', IdiomaSchema);

export default Api;
