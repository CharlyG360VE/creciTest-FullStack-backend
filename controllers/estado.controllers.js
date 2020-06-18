const estadoModel = require( '../models/estado.models' );
const moment = require( 'moment' );

//Inicar variables
moment().format();
const estadoCtrl = {};
/*
Obtener estado del developer
*/

estadoCtrl.getEstado = async ( req, res ) => {
  const { id } = req.params;

  await estadoModel.find( { devId: id } )
  .populate( 'devId', 'email name role' )
  .populate( 'tarea' )
  .populate( 'proyecto' )
  .exec(
    ( err, estado ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'Error en base de datos',
          error: err,
        })
      } else {
        return res.status(200).json({
          ok: true,
          estado,
        });
      };
    }
  );
};

/*
Editar tiempo del estado
*/

estadoCtrl.editTiempo = async ( req, res ) => {
  try {
    const { id } = req.params;
    const { horas } = req.body;
    let estadoId;

    await estadoModel.find( { devId: id }, ( err, estado ) => {
      if ( err ) {
        return res.status(500).json({
          ok: false,
          message: 'Error en base de datos',
          error: err,
        })
      } else {
        estadoId = estado[0]._id;
      };
    } );

    await estadoModel.findById( estadoId, async ( err, estado ) => {
      try {
        if ( err ) {
          return res.status(400).json({
            ok: false,
            message: 'Error en la base de datos',
            error: err,
          })
        } else if ( estado !== null ) {
          estado.fecha = moment( new Date() );
          estado.horas = horas;

          await estado.save( ( err, estadoActualizado ) => {
            if ( err ) {
              return res.status(400).json({
                ok: false,
                message: 'Error al actualizar horas',
                error: err,
              })
            } else {
              return res.status(200).json({
                ok: true,
                message: 'Horas actualizadas correctamente',
                estado: estadoActualizado
              });
            }
          } );
        } else {
          const fecha = moment( new Date() );
          const fechaDiff = fecha.diff( estado.fecha, 'hours' );
          if ( fechaDiff >= 24 ) {

          } else {
            estado.fecha = fecha;
            estado.horas = horas;
            await estado.save( ( err, estadoActualizado ) => {
              if ( err ) {
                return res.status(400).json({
                  ok: false,
                  message: 'Error al actualizar horas',
                  error: err,
                })
              } else {
                return res.status(200).json({
                  ok: true,
                  message: 'Horas actualizadas correctamente',
                  estado: estadoActualizado
                });
              }
            } );
          };
        };
      } catch (error) {
       console.log( 'Error', error ); 
      };
    } );
  } catch (error) {
    console.log( error );
  }
};

module.exports = estadoCtrl;