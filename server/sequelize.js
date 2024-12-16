const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rockey', 'root', '*#$(req)405R@i', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
