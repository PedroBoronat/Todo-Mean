var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var mongoose 	   = require('mongoose');

//Conexión a la base de datos.
mongoose.connect('mongodb://localhost:27017/angular-todo',  
	function(err, res) {
  		if(err) {
    		console.log('ERROR: connecting to Database. ' + err);
  		} else {
    		console.log('Connected to Database');
  		}
	});


//Configuración.
//Ficheros estáticos.
app.use(express.static(__dirname + '/public'));
//Log
app.use(morgan('dev'));
//Post cambia HTML.
app.use(bodyParser());
//Simula DELETE y PUT.
app.use(methodOverride());




// Rutas de nuestro API
require('./route')(app);

//Escucha e inicia server.
app.listen(8080,function() {
	console.log('Aplicación escuchando puerto 8080.');
});
