const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const proyectoSchema = new Schema({
  name: { type: String, required: [ true, 'Es necesario el nombre del proyecto' ] }
});

module.exports = mongoose.model( 'proyectos', proyectoSchema );