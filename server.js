var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var  ObjectId = require('mongodb').ObjectId;
// Connection URL


var app = express()


app.use(bodyParser.json())

app.use(express.static('public'));

var db = null;
MongoClient.connect("mongodb://localhost:27017/mittens", function(err, dbconn) {
  if(!err){

    console.log("Connected successfully to server");
    db = dbconn;
    }

});

app.get('/meows',function (req, res,next) {

     db.collection('meows', function(err, meowsCollection){
       meowsCollection.find().toArray(function(err, meows){
         return  res.json(meows);
       });

});

     });

app.post('/meows',function(req, res, next){

var newMeow={
   text: req.body.newMeow
}
  db.collection('meows', function(err, meowsCollection){
    meowsCollection.insert(newMeow,{w:1}),(function(err, meows){
      return  res.send();
    });

});



});




 app.put('/meows/remove',function(req, res, next){


  db.collection('meows', function(err, meowsCollection){
    var meowId= req.body.meow._id;

   meowsCollection.remove( {_id: ObjectId (meowId)},{w:1}, function(err, result){
      return  res.send();
    });

});



});






app.listen(3000, () => console.log('Example app listening on port 3000!'));
