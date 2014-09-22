var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Definición del modelo de datos de la BD.
var todo = new Schema({
	text: String
});

module.exports = mongoose.model('Todo', todo);