const { Sequelize, DataTypes } = require("sequelize");
const db = require("./connection.js");

// User
const User = db.define("user", {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    photo: {
        type: DataTypes.STRING,
        defaultValue: "img/default.png",
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user",
    },
    code: {
        type: DataTypes.STRING,
    },

});


// Admin
const Admin = db.define("admin", {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    fullName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "admin",
    },
    photo: {
        type: DataTypes.STRING,
        defaultValue: "img/default.png",
    },
});

// Booked Cars
const BookedCars = db.define("bookedCars", {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    carName: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.STRING,
    },
    people: {
        type: DataTypes.STRING,
    },
    fuelType: {
        type: DataTypes.STRING,
    },
    mileage: {
        type: DataTypes.STRING,
    },
    transmission: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    }
})

// association

User.hasMany(BookedCars)
BookedCars.belongsTo(User);


module.exports = {
    User,
    Admin,
    BookedCars
};

// db.sync({ alter: true });