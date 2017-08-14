

exports.setup = function(app) {


    app.all('/leadership', function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
    });

    app.get('/leadership', function(req,res,next){
            res.end('Will send all the leadership to you!');
    });

    app.post('/leadership', function(req, res, next){
         res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);
    });

    app.delete('/leadership', function(req, res, next){
            res.end('Deleting all leadership');
    });

    app.get('/leadership/:Id', function(req,res,next){
            res.end('Will send details of the leadership: ' + req.params.Id +' to you!');
    });

    app.put('/leadership/:Id', function(req, res, next){
        res.write('Updating the leadership: ' + req.params.Id + '\n');
        res.end('Will update the leadership: ' + req.body.name +
                ' with details: ' + req.body.description);
    });

    app.delete('/leadership/:Id', function(req, res, next){
            res.end('Deleting leadership: ' + req.params.Id);
    });




};
