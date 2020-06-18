const express = require( 'express' );
const router = express.Router();
const jwt = require( '../config/JWT.config' );
const admin = require( '../config/ADMIN.config' );

const usuarioCtrl = require( '../controllers/usuarios.controllers' );

router.get( '/', [ jwt.verifyToken, admin.verifyAdminGuard ], usuarioCtrl.getUsuarios );
router.post( '/', usuarioCtrl.crearUsuario );
router.put( '/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], usuarioCtrl.editUsuario );
router.delete( '/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], usuarioCtrl.deleteUsuario );

module.exports = router;