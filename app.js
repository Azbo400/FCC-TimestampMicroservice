var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.set('view engine','ejs');

app.get('/',function(req,res){
  res.render('index');
});
app.get('/:date',(req,res)=>{
  //Convert date to special types
  var dateValue = req.params.date;
  var dateFormattingOption = {
    year:'numeric',
    month:'long',
    day:'numeric'
  };
  if(isNaN(dateValue)){
    var naturalDate = new Date(dateValue);
    naturalDate = naturalDate.toLocaleDateString('en-us',dateFormattingOption);
    var unixDate = new Date(dateValue).getTime()/1000;
  }else{
    var unixDate = dateValue;
    var natural = new Date(dateValue * 1000).toLocaleDateString('en-us',dateFormattingOption);
  }
  res.json({unix:unixDate,natural:naturalDate});
});

app.listen(port, function(){
  console.log(`App listening on ${port} CTRL-C to terminate`);
});