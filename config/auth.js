
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect(`/login`)
    },
    ensureAuthenticated2: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect(`/register`)
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next()
        }
        res.redirect(`/`)
    },
    adminAuthenticated: function (req, res, next) {
        if (req.isAuthenticated() && req.user.role == 'admin') {
            return next()
        }
        console.log("admin authenticated");
        res.redirect(`/`)
    }
}