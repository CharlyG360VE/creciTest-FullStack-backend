const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const estadoSchema = new Schema({
  devId: { type: String, required: [ true, 'Es necesario el ID del desarrollador' ], ref: 'usuarios' },
  tarea: [ { type: Schema.Types.ObjectId, required: false, ref: 'tareas' } ],
  proyecto: [ { type: Schema.Types.ObjectId, required: false, ref: 'proyectos' } ],
  horas: { type: Number, required: false, default: 0 },
  fecha: { type: Date, required: false }
});

module.exports = mongoose.model( 'estados', estadoSchema );