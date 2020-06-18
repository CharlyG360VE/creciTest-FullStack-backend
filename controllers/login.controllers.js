const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const { SEED } = require( '../config/SEED.config' );
const usuarioModel = require( '../models/usuarios.models' );

const loginCtrl = {};

/*
Login
*/

loginCtrl.iniciarSesion = async ( req, res ) => {
  try {
    const { email, password } = req.body;
  
    await usuarioModel.findOne( { email }, ( err, usuarioDB ) => {
      if( err ) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error en base de datos',
          err,
        });
      } else if(!usuarioDB) {
        return res.status(400).json({
          ok: false,
          message: 'Correo y/o contraseña erronea',
        });
      } else if( !bcrypt.compareSync( password, usuarioDB.password ) ) {
        return res.status(400).json({
          ok: false,
          message: 'Correo y/o contraseña erronea',
        });
      } else {
        const token = jwt.sign( { usuario: usuarioDB }, SEED, { expiresIn: 14400 } );
        usuarioDB.password = 'Contraseña encriptada';
        res.status(200).json({
          ok: true,
          usuario: usuarioDB,
          token,
        });
      };
    } );
  } catch (error) {
    console.log( error.value );
  };
};

module.exports = loginCtrl;