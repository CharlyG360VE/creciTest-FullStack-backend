const proyectoModel = require( '../models/proyectos.models' );
const usuarioModel = require( '../models/usuarios.models' );
const estadoModel = require( '../models/estado.models' );

const proyectoCtrl = {};

/*
Obtener proyectos
*/

proyectoCtrl.getProyectos = async ( req, res ) => {
  try {
    await proyectoModel.find( {}, ( err, proyectos ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'Error en la base de datos',
          error: err.message,
        });
      } else {
        return res.status(200).json({
          ok: true,
          proyectos,
        });
      };
    } );
  } catch (error) {
    console.log( 'Error en la base de datos' );
  };
};

/*
Crear proyecto
*/

proyectoCtrl.crearProyecto = async ( req, res ) => {
  try {
    const name = {
      name: req.body.name,
    };

    const proyecto = new proyectoModel( name );
    await proyecto.save( ( err, proyecto ) => {
      if ( err ) {
        return res.status(400).json({
          ok: false,
          message: 'Error al guardar proyecto',
          error: err.message,
        });
      } else {
        return res.status(201).json({
          ok: true,
          message: 'Proyecto guardado exitosamente',
          proyecto
        });
      };
    } );
  } catch (error) {
    console.log( error );
  };
};

/*
Editar nombre proyecto
*/

proyectoCtrl.editProyecto = async ( req, res ) => {
  try {
    const { id } = req.params;

    const { name } = req.body; 

    await proyectoModel.findById( id, async ( err, proyecto ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'Error al actualizar proyecto',
          error: `El ID: '${ err.value }' no es correcto`,
        });
      } else if ( proyecto === null ) {
        return res.status(400).json({
          ok: false,
          message: 'Este proyecto no existe'
        });
      } else {
        proyecto.name = name;

        await proyecto.save( ( err, proyectoActualizado ) => {
          if ( err ) {
            return res.status(400).json({
              ok: false,
              message: 'Error al cambiar nombre del proyecto',
              error: err
            });
          } else {
            return res.status(200).json({
              ok: true,
              message: 'Nombre actualizado correctamente',
              proyecto: proyectoActualizado,
            });
          };
        } );
      };
    } );
  } catch (error) {
    console.log( `El ID: '${ error.value }' no es correcto` );
  };
};

/*
Asignar proyecto al desarrollador
*/

 proyectoCtrl.asignarProyecto = async ( req, res ) => {
  try {
    const { id } = req.params;
    const { devId } = req.body;
    let estadoId;
    await estadoModel.find( { devId }, async ( err, estado ) => {
      if ( err ) {
        return res.status(400).json({
          ok: false,
          message: 'Error al asignar proyecto',
          error: err,
        });
      } else {
        estadoId = estado[0]._id;
      }

      await estadoModel.findById( estadoId, async ( err, estadoAct ) => {
        if ( err ) {
          return res.status(400).json({
            ok: false,
            message: 'Error en base de datos',
            error: err,
          });
        } else {
          const estadoArray = estadoAct.proyecto;
          estadoArray.push( id );

          await estadoAct.save( ( err, estadoActualizado ) => {
            if ( err ) {
              return res.status(400).json({
                ok: false,
                message: 'Error al actualizar el estado',
                error: err,
              });
            } else {
              return res.status(200).json({
                ok: true,
                message: 'Proyecto asignado correctamente al desarrollador',
                estado: estadoActualizado,
              });
            };
          } );
        };
      } );
    } );
  } catch (error) {
    console.log( error.value );
  };
};

/*
Eliminar proyecto
*/

proyectoCtrl.deleteProyecto = async ( req, res ) => {
  try {
    const { id } = req.params;

    await proyectoModel.findByIdAndRemove( id, ( err, proyecto ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'No se logro borrar el proyecto',
          error: `El ID: '${ err.value }' no es correcto`,
        });
      } else if ( !proyecto ) {
        return res.status(400).json({
          ok: false,
          message: 'El proyecto no existe o ya ha sido eliminado',
        })
      } else {
        return res.status(200).json({
          ok: true,
          message: 'Se ha borrado correctamente el proyecto',
          proyecto,
        });
      };
    } );
  } catch (error) {
    console.log( `El ID: '${error.value}' es incorrecto` );
  };
};

module.exports = proyectoCtrl;