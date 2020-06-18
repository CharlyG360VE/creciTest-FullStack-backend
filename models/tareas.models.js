const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const tareasSchema = new Schema({
  name: { type: String, required: [ true, 'Es necesario el nombre de la tarea' ] }
});

module.exports = mongoose.model( 'tareas', tareasSchema );