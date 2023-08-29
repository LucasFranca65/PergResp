const Sequelize = require('sequelize')

const connect = new Sequelize('guia_perguntas','root','r3gional',{
    host:"localhost",
    dialect: 'mysql'
})

module.exports = connect