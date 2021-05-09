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


app.get("/api/", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})
// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const {date} = req.params
  const miliseconds = new Date().setTime(date)
  const newDate = new Date(Date.parse(date))

  if(miliseconds){
    console.log("Mili Segundos")
    res.json({
      unix: new Date().setTime(date),
      utc: new Date(miliseconds).toUTCString()
    })
  }
  else if(newDate != "Invalid Date"){
    console.log("Date")
      res.json({
      unix: new Date(newDate).getTime(),
      utc: newDate.toUTCString()
    })
  }
  else{
    console.log("Invalid")
    res.json({
      error: "Invalid Date"
    })
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
