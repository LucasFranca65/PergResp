const Sequelize = require('sequelize')
const connect = require('../database')

const Resposta = connect.define('respostas',{
   pergunta:{
    type: Sequelize.INTEGER,
    allowNull: false
   },
   usuario:{
    type: Sequelize.TEXT,
    allowNull: false
    },
    resposta:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Resposta.sync({force: false}).then(()=>{
    console.log('Tabela respostas Criada')
})

module.exports = Resposta