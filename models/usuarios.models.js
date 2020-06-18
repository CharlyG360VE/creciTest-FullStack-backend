const uniqueValidator = require( 'mongoose-unique-validator' );
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const rolesValidos = {
  values: [
    'ADMIN_ROLE',
    'DEV_ROLE'
  ],
  message: '{VALUE} no es un rol permitido'
}

const usuarioSchema = new Schema({
  name: { type: String, required: [ true, 'El nombre es necesario' ] },
  email: { type: String, unique: true, required: [ true, 'El correo es necesario' ] },
  password: { type: String, required: [ true, 'La contraseña es necesaria' ] },
  role: { type: String, required: true, default: 'DEV_ROLE', enum: rolesValidos },
});

usuarioSchema.plugin( uniqueValidator, { message: '{PATH} existente' } );

module.exports = mongoose.model( 'usuarios', usuarioSchema );