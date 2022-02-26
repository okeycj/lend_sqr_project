const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

function server() {
    const app = express();

    app.use(cors());

    app.use(bodyParser.urlencoded({ limit: "15mb", extended: true }));
    app.use(bodyParser.json({ limit: "15mb" }));
    app.use(bodyParser.raw({ limit: "45mb" }));

    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader(
        "Access-Control-Allow-Headers",
        "x-access-token,X-Requested-With,Content-Type,Authorization,cache-control"
        );
        next();
    });

    app.use(morgan("dev"));

    // ROUTES FOR OUR API
    // =============================
    let AccountRoutes = require("../app/routes/AccountRoutes");

    // REGISTER OUR ROUTES -------------------------------
    app.use("/api/account", AccountRoutes);
    app.use(express.static(__dirname + "/public"));
    app.get("*", function (req, res) {
        res.send("Welcome to VPay API Service (v1).");
    });

    return app;
}

module.exports = server;