// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// The Core Timestamp Microservice Endpoint
app.get("/api/:date?", (req, res) => {
	const dateParam = req.params.date;
	let date;

	// Handle the case where the date parameter is empty (Tests 7 & 8)
	if (!dateParam) {
		date = new Date();
	}
	// Handle the case where the date parameter exists
	else {
		// Check if the parameter is a string composed only of digits (a Unix timestamp)
		// The regular expression /^\d+$/ ensures it's a number string.
		if (/^\d+$/.test(dateParam)) {
			// It's a Unix timestamp string: CONVERT TO NUMBER for new Date() (Test 4)
			date = new Date(Number(dateParam));
		} else {
			// It's a potential date string (Test 5)
			date = new Date(dateParam);
		}
	}

	// Validate the resulting Date object (Test 6)
	// Check if the date is "Invalid Date" by checking its time value
	if (isNaN(date.getTime())) {
		return res.json({ error: "Invalid Date" });
	}

	// Return the valid timestamp object (Tests 2, 3)
	res.json({
		// .getTime() returns the Unix timestamp in milliseconds (Number)
		unix: date.getTime(),
		// .toUTCString() returns the date in the required format string
		utc: date.toUTCString(),
	});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log(
		"Your Timestamp Microservice is listening on port " +
			listener.address().port
	);
});
