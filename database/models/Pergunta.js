const Sequelize = require('sequelize')
const connect = require('../database')

const Pergunta = connect.define('perguntas',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pergunta:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Pergunta.sync({force: false}).then(()=>{})

module.exports = Pergunta

