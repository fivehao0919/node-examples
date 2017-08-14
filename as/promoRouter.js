

exports.setup = function(app) {

    app.all('/promotions', function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
    });

    app.get('/promotions', function(req,res,next){
            res.end('Will send all the promotions to you!');
    });

    app.post('/promotions', function(req, res, next){
         res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    });

    app.delete('/promotions', function(req, res, next){
            res.end('Deleting all promotions');
    });

    app.get('/promotions/:Id', function(req,res,next){
            res.end('Will send details of the promotion: ' + req.params.Id +' to you!');
    });

    app.put('/promotions/:Id', function(req, res, next){
        res.write('Updating the promotion: ' + req.params.Id + '\n');
        res.end('Will update the promotion: ' + req.body.name +
                ' with details: ' + req.body.description);
    });

    app.delete('/promotions/:Id', function(req, res, next){
            res.end('Deleting promotion: ' + req.params.Id);
    });




};
