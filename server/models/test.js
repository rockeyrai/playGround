const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');


const Test = sequelize.define('Test', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postText: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Test;
