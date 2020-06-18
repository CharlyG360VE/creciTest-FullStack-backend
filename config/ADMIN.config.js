/*
Verificar Admin Role
*/

module.exports.verifyAdminGuard = ( req, res, next ) => {

  const { usuario } = req;

    if( usuario.role === 'ADMIN_ROLE' ) {

      next();

    } else {

      return res.status(401).json({
        ok: false,
        message: 'Token invalido'
      })

    }

};