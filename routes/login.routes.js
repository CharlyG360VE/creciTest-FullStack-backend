const express = require( 'express' );
const router = express.Router();

const loginCtrl = require( '../controllers/login.controllers' );

router.post( '/', loginCtrl.iniciarSesion );

module.exports = router;