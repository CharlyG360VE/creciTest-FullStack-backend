const usuarioModel = require( '../models/usuarios.models' );
const estadoModel = require( '../models/estado.models' );
const bcrypt = require( 'bcrypt' );

const usuarioCtrl = {};

/*
Obtener usuarios
*/

usuarioCtrl.getUsuarios = async ( req, res ) => {
  try {
    await usuarioModel.find( {}, 'name email role _id' )
    .exec(
      ( err, usuarios ) => {
        if ( err ) {
          return res.status(500).json({
            ok: false,
            message: 'Error en la base de datos',
            error: err,
          });
        } else {
          return res.status(200).json({
            ok: true,
            usuarios,
          });
        };
      }
    ); 
  } catch {
    console.log( 'Error en la base de datos' );
  }
};

/*
Crear Usuario
*/

usuarioCtrl.crearUsuario = async ( req, res ) => {
  try {
    const { name, email, password } = req.body;
    let role;
    
    await usuarioModel.find( {}, ( err, usuario ) => {
      if ( usuario.length === 0 ) {
        role = 'ADMIN_ROLE';
      } else {
        role = 'DEV_ROLE';
      }
    } );

    const USER = {
      name,
      email,
      password: bcrypt.hashSync( password, 10 ),
      role,
    };

    const usuario = new usuarioModel( USER );
    await usuario.save( ( err, usuarioGuardado ) => {
      if ( err ) {
        return res.status(400).json({
          true: false,
          message: 'Error al guardar usuario',
          error: err.message,
        });
      } else {

        const devId = usuarioGuardado._id
        usuarioGuardado.password = 'Contraseña encriptada';
        const estado = new estadoModel( { devId } );
        estado.save();
        return res.status(201).json({
          ok: true,
          message: 'Usuario registrado correctamente',
          usuario: usuarioGuardado,
        });
      };
    } );
  } catch {
    console.log( 'Error al crear usuario' );
  }
};

/*
Editar rol de usuario
*/

usuarioCtrl.editUsuario = async ( req, res ) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await usuarioModel.findById( id, async (err, usuario) => {
      if( err ){
        return res.status(500).json({
          ok: false,
          message: 'Error en base de datos',
          error: `El ID: '${ err.value }' es incorrecto`,
        });
      } else {
        if ( !role ){
          return res.status(400).json({
            ok: false,
            message: 'Es necesario un rol de usuario'
          });
        };
        usuario.role = role;
        await usuario.save( ( err, usuarioActualizado ) => {
          if ( err ) {
            return res.status(400).json({
              ok: false,
              message: 'Error al actualizar usuario',
              error: err.message,
            })
          } else {
            usuarioActualizado.password = 'Contraseña encriptada';
            return res.status(200).json({
              ok: true,
              message: 'Rol de usuario actualizado correctamente',
              usuario: usuarioActualizado,
            })
          }
        } )
      }
    } )
  } catch (error) {
    console.log( `El ID: '${error.value}' es incorrecto` );
  };
};

/*
Eliminar usuario
*/

usuarioCtrl.deleteUsuario = async ( req, res ) => {
  try {
    const { id } = req.params;

    await usuarioModel.findByIdAndRemove( id, ( err, usuario ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'No se logro borrar el usuario',
          error: `El ID: '${ err.value }' no es correcto`,
        });
      } else if ( !usuario ) {
        return res.status(400).json({
          ok: false,
          message: 'El usuario no existe o ya ha sido eliminado'
        })
      } else {
        usuario.password = 'Contraseña encriptada';
        return res.status(200).json({
          ok: true,
          message: 'Se ha borrado correctamente el usuario',
          usuario,
        });
      };
    } );
  } catch (error) {
    console.log( `El ID: '${error.value}' es incorrecto` );
  }
};

module.exports = usuarioCtrl;