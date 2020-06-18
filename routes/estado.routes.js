const express = require( 'express' );
const router = express.Router();
const jwt = require( '../config/JWT.config' );

const estadoCtrl = require( '../controllers/estado.controllers' );

router.get( '/:id', jwt.verifyToken, estadoCtrl.getEstado );
router.put( '/:id', jwt.verifyToken, estadoCtrl.editTiempo );

module.exports = router;