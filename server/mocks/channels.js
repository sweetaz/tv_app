/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var channelsRouter = express.Router();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  var nedb = require('nedb');
  var channelDB = new nedb({ filename : 'channels', autoload: true});

  channelsRouter.get('/', function(req, res) {
    channelDB.find(req.query).exec(function(error,channels) {
      res.send({
        'channels': channels
      });
    });
  });

  channelsRouter.post('/', function(req, res) {
      channelDB.find({}).sort({id : -1}).limit(1).exec(
          function(err,channels) {
              if(channels.length != 0)
                req.body.channel.id =  channels[0].id + 1;
              else
                req.body.channel.id = 1;
               channelDB.insert(req.body.channel,function(err,newChannel) {
                   res.status(201);
                   res.send(
                       JSON.stringify(
                       {
                            channel : newChannel
                       }));
               });
          })

  });

  channelsRouter.get('/:id', function(req, res) {
    res.send({
      'channels': {
        id: req.params.id
      }
    });
  });

  channelsRouter.put('/:id', function(req, res) {
    res.send({
      'channels': {
        id: req.params.id
      }
    });
  });

  channelsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/channels', require('body-parser').json());
  app.use('/api/channels', channelsRouter);
};
