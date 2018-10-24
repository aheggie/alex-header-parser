// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// logger middle ware

const logger = (req, res, next) => {
  console.log(req)
  console.log(res)
  next()
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// utility function

const reqProcess = req => { return {keys:Object.keys(req.headers), language: req.headers["accept-language"], software: req.headers["user-agent"]} }


app
  .route("/api/whomai")
  .get((req, res) =>
       res.json(reqProcess(req))
       )



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
