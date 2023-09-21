const Router = require("express").Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")

const { ensureAuthenticated, forwardAuthenticated, adminAuthenticated } = require("../config/auth")
const { User, BookedCars } = require("../model/model")

var auth
var data

const authCheckUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        auth = true
        data = req.user
        if (req.user.role == "user") return next()
        res.redirect("/login")
    } else {
        auth = false
        data = ''
        res.redirect('/login')
    }
}



// Home Page
Router.get("/", authCheckUser, (req, res) => {
    res.render("index.ejs", { auth, data });
});

// Book Cars
Router.post("/rentCar", authCheckUser, async (req, res) => {
    try {
        let { carName, year, people, fuelType, mileage, transmission, price, image } = req.body;

        let user = await User.findOne({ where: { id: req.user.id } });
        let id = user.id;

        let userCarNames = await BookedCars.findAll({ where: { userId: id } });

        for (let i = 0; i < userCarNames.length; i++) {
            if (userCarNames[i].dataValues.carName == carName) {
                var data = {
                    title: "already Booked"
                }
                return res.json(data); // Return the response and exit the function
            }
        }

        await BookedCars.create({
            carName, year, people, fuelType, mileage, transmission, price, userId: req.user.id, image
        });

        var data = {
            title: "success"
        }

        return res.json(data); // Return the response and exit the function
    } catch (error) {
        console.error(error);
        var data = {
            title: "error"
        }
        return res.json(data); // Return an error response and exit the function
    }
});


// Booked Cars
Router.get("/my-cars", authCheckUser, async (req, res) => {

    let user = await User.findOne({ where: { id: req.user.id } });
    let id = user.id;

    let userCarNames = await BookedCars.findAll({ where: { userId: id } });


    res.render("booked-cars.ejs", { auth, data, userCarNames })
})




module.exports = Router