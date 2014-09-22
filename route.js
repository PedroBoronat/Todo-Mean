module.exports = function(app) {

    //Carga del modelo de datos a utilizar.
    var Todo = require('./model');

    // GET de todos los TODOs
    findAllTodos = function(req, res) {
        Todo.find(function(err, todos) {
            if(err) {
                console.log('ERROR Finding All: ' + err);
                res.send(err);
            }
            res.json(todos);
        });
    }
    
    // POST que crea un TODO y devuelve todos tras la creación
    insertTodo = function(req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function(err,todo) {
            if(err) {
                console.log('ERROR Inserting: ' + err);
                res.send(err);
            }
            findAllTodos(req, res);
        });
    }

    // // DELETE un TODO específico y devuelve todos tras borrarlo.
    deleteTodo = function(req, res) {
        Todo.remove({
            _id: req.params.todo //el ID de mongo se usa con _id
        }, function(err, todo) {
            if(err) {
                console.log('ERROR Deleting: ' + err);
                res.send(err);
            }

            findAllTodos(req, res);
        });
    }
    
    //Routing
    app.get('/api/todos', findAllTodos);
    app.post('/api/todos', insertTodo);
    app.delete('/api/todos/:todo', deleteTodo);

    // Carga una vista HTML simple donde irá nuestra Single App Page
    // Angular Manejará el Frontend
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');				
    });
    
}