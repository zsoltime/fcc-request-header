"use strict"
var express = require("express");
var app = express();

app.set("port", process.env.PORT || 8000);
app.set("views", (__dirname + "/views"));
app.set("view engine", "jade");
app.use(express.static(__dirname + "/public"));

app.get("/api/whoami", function(req, res) {
    res.contentType("application/json");
    res.status(200).json({
        ipaddress: req.ip,
        language: req.headers["accept-language"].match(/^(.*?),/)[1],
        software: req.headers["user-agent"].match(/\((.*?)\)/)[1]
    });
});

app.get("/", function(req, res) {
    var sample = {
        ipaddress: "86.205.25.192",
        language: "en-GB",
        software: "Macintosh; Intel Mac OS X 10_11_4"
    };
    var data = {
        sample: JSON.stringify(sample, null, 2)
    };
    res.render("index", data);
});

var server = app.listen(app.get("port"), function() {
    console.log("The app is running on http://localhost: %s", server.address().port);
});