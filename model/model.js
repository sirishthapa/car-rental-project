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
    skills: {
        type: DataTypes.JSON,
    },
    phone: {
        type: DataTypes.STRING,
    },
    dateOfBirth: {
        type: DataTypes.STRING,
    },
    photo: {
        type: DataTypes.STRING,
        defaultValue: "img/default.png",
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "jobSeeker",
    },
    suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    code: {
        type: DataTypes.STRING,
    },
    otherDetails: {
        type: DataTypes.JSON,
    },
    experience: {
        type: DataTypes.JSON,
    },
    education: {
        type: DataTypes.JSON,
    },
    language: {
        type: DataTypes.JSON,
    },
    awards: {
        type: DataTypes.JSON,
    },
    socials: {
        type: DataTypes.JSON,
    },
    references: {
        type: DataTypes.JSON,
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
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM("admin", "superAdmin"),
        defaultValue: "admin",
    },
    photo: {
        type: DataTypes.STRING,
        defaultValue: "img/default.png",
    },
    suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});




module.exports = {
    User,
    Admin
};

// db.sync({ alter: true });