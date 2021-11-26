// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  // Get date params
  const getDate = req.params.date;

  // Date
  // An empty date parameter 
  // should return the current time in a JSON object with a unix key
  // convert to integer
  let date;

  if(!getDate) {
    date = new Date();
  } else {
    if(isNaN(getDate)) {
      date = new Date(getDate);
    } else {
      date = new Date(parseInt(getDate));
    }
  }


  // if date is invalid send error response
  // else send the correct response format
  if(date.toString() === 'Invalid Date') {
    res.send({
      error: date.toString()
    })
  } else {
    res.send({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});