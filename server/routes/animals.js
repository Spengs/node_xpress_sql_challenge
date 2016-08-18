var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Omicron' //database location
//
// var numbers = require('./numbers.js');

var rando = function randomNumber(min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
    };

router.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done){
    if(err){
      res.sendStatus(500);
    }

  client.query('SELECT * FROM animals', function(err, result){
    done();
    if(err){
      res.sendStatus(500);
    }
    res.send(result.rows);
});
});
});

router.post('/', function(req, res){
  var animal = req.body;

  pg.connect(connectionString, function(err, client, done){
      if(err){
        res.sendStatus(500);
      }

      client.query('INSERT INTO animals (type, number)'
                  + 'VALUES ($1, $2)',
                  [animal.type, rando(1, 100)],//number.randomNumber(1, 100),
                  function(err, result){
                    done();
                    if(err){
                      res.sendStatus(500);
                    }else{
                    res.sendStatus(201);

                }
              });
  });
});


module.exports = router;
