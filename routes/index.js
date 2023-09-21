const Router = require("express").Router();

var randomString = require("randomstring");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const {
    ensureAuthenticated,
    forwardAuthenticated,
    adminAuthenticated,
    ensureAuthenticated2,
} = require("../config/auth");
const { User } = require("../model/model");

var auth;
var data;

const authCheck = function (req, res, next) {
    if (req.isAuthenticated()) {
        auth = true;
        data = req.user;
    } else {
        auth = false;
        data = "";
    }
    next();
};


// Home Page
Router.get("/", authCheck, (req, res) => {
    res.render("index.ejs", { auth, data });
});

// Login Page
Router.get("/login", forwardAuthenticated, authCheck, (req, res) => {
    res.render("login.ejs", { auth, data })
})

// Register Page
Router.get("/register", forwardAuthenticated, authCheck, (req, res) => {
    res.render("register.ejs", { auth, data })
})

// 1. user - register
Router.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;

    // console.log("req.body", req.body);

    const user = await User.findOne({ where: { email: email } });

    if (user) {
        var data = {
            title: "user exists",
        };
        return res.json(data);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    User.create({
        fullName,
        email,
        password: hashedPassword,
    })
        .then(() => {

            var data = {
                title: "success",
            };
            return res.json(data);
        })
        .catch((err) => {
            var data = {
                title: "error",
            };
            return res.json(data);
        });

});

// 1. user - login 
Router.post("/login", (req, res, next) => {

    passport.authenticate("admin-login", (err, user, info) => {

        if (err == "password") {
            var data = {
                title: "password",
            };
            return res.json(data);
        }

        // if admin found
        // For session
        if (user) {
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    var data = {
                        title: "error",
                    };
                    return res.json(data);
                }
                if (user.role == "admin") {
                    var data = {
                        title: "admin",
                    };
                    return res.json(data);
                }
            });
        }

        if (err == "no admin" || !user) {

            passport.authenticate("user-login", (err, user, info) => {
                if (err == "no user") {
                    var data = {
                        title: "no user",
                    };
                    return res.json(data);
                }
                if (err == "password") {
                    var data = {
                        title: "password",
                    };
                    return res.json(data);
                }
                if (!user) {
                    var data = {
                        title: "no user",
                    };
                    return res.json(data);
                }

                // For session
                req.logIn(user, (err) => {
                    if (err) {
                        console.log(err);
                        var data = {
                            title: "error",
                        };
                        return res.json(data);
                    }
                    if (user.role == "user") {
                        var data = {
                            title: "user",
                        };
                        return res.json(data);
                    }
                });
            })(req, res, next);
        }



    })(req, res, next);






})


// Logout
Router.get(
    "/logout",
    authCheck,
    ensureAuthenticated2,
    async (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            } else {
                res.redirect("/login");
            }
        });
    },
);




module.exports = Router;