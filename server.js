const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const passport = require("passport");

let MYSQLStore = require("express-mysql-session")(session);
require("./config/passport")(passport);
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

let options = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASS,
    database: process.env.DATABASE,
};

let sessionStore = new MYSQLStore(options);

// Express Session
app.use(
    session({
        secret: "car_rental_service",
        store: sessionStore,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 24 * 60000 * 30 },
    }),
);

// Express Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use("/uploads", express.static("uploads"));

// Passport JS
app.use(passport.initialize());
app.use(passport.session());

// Routes
const indexRoute = require("./routes/index");
const adminRoute = require("./routes/adminDashboard");
const userRoute = require("./routes/userDashboard");

// Using Routes
app.use("/", indexRoute);
app.use("/dashboard/user", userRoute);
app.use("/dashboard/admin", adminRoute);

// Server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
