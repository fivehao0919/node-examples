

exports.setup = function(app) {


    app.all('/dishes', function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
    });

    app.get('/dishes', function(req,res,next){
            res.end('Will send all the dishes to you!');
    });

    app.post('/dishes', function(req, res, next){
         res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    });

    app.delete('/dishes', function(req, res, next){
            res.end('Deleting all dishes');
    });

    app.get('/dishes/:Id', function(req,res,next){
            res.end('Will send details of the dish: ' + req.params.Id +' to you!');
    });

    app.put('/dishes/:Id', function(req, res, next){
        res.write('Updating the dish: ' + req.params.Id + '\n');
        res.end('Will update the dish: ' + req.body.name +
                ' with details: ' + req.body.description);
    });

    app.delete('/dishes/:Id', function(req, res, next){
            res.end('Deleting dish: ' + req.params.Id);
    });



};
