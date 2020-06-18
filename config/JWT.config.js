/*
Configuracion JWT
*/
const jwt = require( 'jsonwebtoken' );
const { SEED } = require( './SEED.config' );

/*
Verificacion Token
*/

module.exports.verifyToken = ( req, res, next ) => {

  const { token } = req.query;

  jwt.verify( token, SEED, ( err, decoded ) => {

    if( err ) {

      return res.status(401).json({
        ok: false,
        mensaje: 'Token invalido',
        errors: err
      })

    } else {

      req.usuario = decoded.usuario
      next();

    }

  } );

};