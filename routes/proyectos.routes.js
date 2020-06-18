const express = require( 'express' );
const router = express.Router();
const jwt = require( '../config/JWT.config' );
const admin = require( '../config/ADMIN.config' );

const proyectoCtrl = require('../controllers/proyectos.controllers');

router.get( '/', [ jwt.verifyToken, admin.verifyAdminGuard ], proyectoCtrl.getProyectos );
router.post( '/', [ jwt.verifyToken, admin.verifyAdminGuard ], proyectoCtrl.crearProyecto );
router.put( '/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], proyectoCtrl.editProyecto );
router.put( '/asignar/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], proyectoCtrl.asignarProyecto );
router.delete( '/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], proyectoCtrl.deleteProyecto );

module.exports = router;