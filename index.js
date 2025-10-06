/* // index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log(
		"Your App is Live at http://localhost:" + listener.address().port
	);
});
 */

// server.js (or index.js)

const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static assets (HTML/CSS) for the homepage
app.use(express.static("public"));

// Basic homepage route
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

// ------------------------------------------------
// The Core Timestamp API Endpoint
// ------------------------------------------------

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // 1. Handle Empty Parameter (current time) - Tests 7 & 8
  if (!dateParam) {
    date = new Date();
  } 
  // 2. Handle Date Parameter (Unix Timestamp OR Date String) - Tests 2, 3, 4, 5, 6
  else {
    // Check if the parameter is a string of digits (a Unix timestamp)
    // The regular expression /^\d+$/ checks for one or more digits from start to end.
    if (/^\d+$/.test(dateParam)) {
      // It's a Unix timestamp string: CONVERT TO NUMBER for new Date()
      date = new Date(Number(dateParam));
    } else {
      // It's a potential date string (e.g., "2015-12-25" or "25 December 2015")
      date = new Date(dateParam);
    }
  }

  // 3. Validate Date - Test 6
  // Check if the Date object is invalid (new Date() returns "Invalid Date"
  // which results in NaN when you call .getTime())
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // 4. Return Valid Timestamp - Tests 2, 3, 4, 5, 7, 8
  res.json({
    // .getTime() returns the Unix timestamp in milliseconds (REQUIRED TYPE: Number)
    unix: date.getTime(), 
    // .toUTCString() returns the date in the required format (REQUIRED FORMAT: Thu, 01 Jan 1970 00:00:00 GMT)
    utc: date.toUTCString() 
  });
});

// Listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Your app is listening on port " + port);
});
