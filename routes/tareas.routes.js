const express = require( 'express' );
const router = express.Router();
const jwt = require( '../config/JWT.config' );
const admin = require( '../config/ADMIN.config' );

const tareaCtrl = require( '../controllers/tareas.controllers' );

router.get( '/', [ jwt.verifyToken, admin.verifyAdminGuard ], tareaCtrl.getTareas );
router.post( '/', [ jwt.verifyToken, admin.verifyAdminGuard ], tareaCtrl.crearTarea );
router.put( '/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], tareaCtrl.editTarea );
router.put( '/asignar/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], tareaCtrl.asignarTarea );
router.delete( '/:id', [ jwt.verifyToken, admin.verifyAdminGuard ], tareaCtrl.deleteTarea );

module.exports = router;