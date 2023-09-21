const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { User, Admin } = require("../model/model.js");

module.exports = function (passport) {
    // User Login Strategy
    passport.use(
        "user-login",
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Match user
            User.findOne({ where: { email: email } })
                .then((user) => {
                    if (!user) {
                        // If user not found, return error
                        var err = "no user"
                        return done(err);
                    }

                    // Compare the password using bcrypt
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) console.log(err);
                        if (!isMatch) {
                            var err = "password"
                            return done(err);
                        }

                        // If password matches, return the user data
                        return done(null, user);
                    });
                })
                .catch((err) => {
                    return done(err);
                });
        })
    );

    // Admin Login Strategy
    passport.use(
        "admin-login",
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Match admin
            Admin.findOne({ where: { email: email } })
                .then((admin) => {
                    if (!admin) {
                        var err = "no admin"
                        return done(err);
                    }

                    bcrypt.compare(password, admin.password, (err, isMatch) => {
                        if (err) console.log(err);
                        if (!isMatch) {
                            var err = "password"
                            return done(err);
                        }
                        return done(null, admin);
                    });
                })
                .catch((err) => {
                    return done(err);
                });
        })
    );

    // Serialize and Deserialize User/Organization/Admin
    passport.serializeUser(function (user, done) {
        return done(null, user);
    });

    passport.deserializeUser(async function (user, done) {
        try {
            // console.log("user", user);
            const vUser = await User.findByPk(user.id);
            if (vUser) return done(null, vUser);

            const admin = await Admin.findByPk(user.id);
            if (admin) return done(null, admin);

            // If the user's instance is not recognized or the user is not found, return an error
            return done(new Error("User not found"));
        } catch (err) {
            return done(err);
        }
    });
};
