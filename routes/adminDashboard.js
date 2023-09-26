const Router = require("express").Router()
const passport = require("passport")
const randomString = require("randomstring");
const bcrypt = require("bcryptjs")
const Sequelize = require('sequelize');
const { BookedCars, User } = require("../model/model");

var auth;
var data;

// admin 
const authCheckAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        auth = true;
        data = req.user;
        if (req.user.role == "admin") return next()
        res.redirect("/login")

    } else {
        auth = false;
        data = "";
        res.redirect("/login");
    }
};


Router.get("/", authCheckAdmin, async (req, res) => {

    let bookedCars = await BookedCars.findAll({
        include: [
            { model: User, attributes: ['fullName'] },
        ]
    })

    // console.log(bookedCars[0].dataValues.user);

    res.render("dashboard.ejs", { auth, data, bookedCars })
})


Router.get("/cancel-booking/:id", authCheckAdmin, async (req, res) => {

    let carId = req.params.id;

    const carToDel = await BookedCars.findByPk(carId)

    if (!carToDel) {
        var data = {
            title: "error"
        }
        return resjson(data)
    }


    await carToDel.destroy()

    var data = {
        title: "success"
    }

    return res.json(data)

})

module.exports = Router