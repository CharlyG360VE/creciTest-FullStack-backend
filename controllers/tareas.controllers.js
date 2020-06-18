const tareaModel = require( '../models/tareas.models' );
const usuarioModel = require( '../models/usuarios.models' );
const estadoModel = require( '../models/estado.models' );

const tareaCtrl = {};

/*
Obtener tareas
*/

tareaCtrl.getTareas = async ( req, res ) => {
  try {
    await tareaModel.find( {}, ( err, tareas ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'Error en la base de datos',
          error: err.message,
        });
      } else {
        return res.status(200).json({
          ok: true,
          tareas,
        });
      };
    } );
  } catch (error) {
    console.log( 'Error en la base de datos' );
  };
};

/*
Crear tarea
*/

tareaCtrl.crearTarea = async ( req, res ) => {
  try {
    const name = {
      name: req.body.name,
    };

    const tarea = new tareaModel( name );
    await tarea.save( ( err, tarea ) => {
      if ( err ) {
        return res.status(400).json({
          ok: false,
          message: 'Error al guardar tarea',
          error: err.message,
        });
      } else {
        return res.status(201).json({
          ok: true,
          message: 'Tarea guardada exitosamente',
          tarea,
        });
      };
    } );
  } catch (error) {
    console.log( error );
  };
};

/*
Editar nombre a tarea
*/

tareaCtrl.editTarea = async ( req, res ) => {
  try {
    const { id } = req.params;

    const { name } = req.body; 

    await tareaModel.findById( id, async ( err, tarea ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'Error al actualizar tarea',
          error: `El ID: '${ err.value }' no es correcto`,
        });
      } else if ( tarea === null ) {
        return res.status(400).json({
          ok: false,
          message: 'Esta tarea no existe'
        });
      } else {
        tarea.name = name;

        await tarea.save( ( err, tareaActualizada ) => {
          if ( err ) {
            return res.status(400).json({
              ok: false,
              message: 'Error al cambiar nombre a la tarea',
              error: err
            });
          } else {
            return res.status(200).json({
              ok: true,
              message: 'Nombre de tarea actualizado correctamente',
              tarea: tareaActualizada,
            });
          };
        } );
      };
    } ); //
  } catch (error) {
    console.log( `El ID: '${ error.value }' no es correcto` );
  };
};

/*
Asignar tarea al desarrollador
*/

tareaCtrl.asignarTarea = async ( req, res ) => {
  try {
    const { id } = req.params;
    const { devId } = req.body;
    let estadoId;
    await estadoModel.find( { devId }, async ( err, estado ) => {
      if ( err ) {
        return res.status(400).json({
          ok: false,
          message: 'Error al asignar tarea',
          error: err,
        });
      } else {
        console.log( estado );
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
          const estadoArray = estadoAct.tarea;
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
                message: 'Tarea asignada correctamente al desarrollador',
                estado: estadoActualizado,
              })
            }
          } )
        }
      } )
    } ) 
  } catch (error) {
    console.log( error.value );
  };
};

/*
Eliminar tarea
*/

tareaCtrl.deleteTarea = async ( req, res ) => {
  try {
    const { id } = req.params;

    await tareaModel.findByIdAndRemove( id, ( err, tarea ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'No se logro borrar la tarea',
          error: `El ID: '${ err.value }' no es correcto`,
        });
      } else if ( !tarea ) {
        return res.status(400).json({
          ok: false,
          message: 'La tarea no existe o ya ha sido eliminada',
        })
      } else {
        return res.status(200).json({
          ok: true,
          message: 'Se ha borrado correctamente la tarea',
          tarea,
        });
      };
    } );
  } catch (error) {
    console.log( `El ID: '${error.value}' es incorrecto` );
  };
};

module.exports = tareaCtrl;