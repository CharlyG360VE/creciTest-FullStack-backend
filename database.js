const mongoose = require( 'mongoose' );

const URI = 'mongodb+srv://charlyg360:665622@cluster0-evk3w.mongodb.net/crecidb?retryWrites=true&w=majority';
const PATH = 'mongodb://localhost/creciDB'

mongoose.connect( URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
} )
.then( () => console.log('\x1b[32m%s\x1b[0m', 'Connected Database on MongoDB Atlas') )
.catch( err => err );

module.exports = mongoose;