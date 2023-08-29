const express =  require('express')
const app = express()
const PORT = 3900
const bodyParser = require('body-parser')
const connect = require('./database/database')
const Pergunta = require('./database/models/Pergunta')
const Resposta = require('./database/models/Resposta')

//Configurando db
connect.authenticate().then(()=>{
    console.log("Connectado ao banco de dados com sucesso")
}).catch((err)=>{
    console.log(err)
})
//Configurando EJS como render
app.set('view engine','ejs')
//Confiuração arquivos estaticos
app.use(express.static('public'))
//configuração Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//rotas
app.get('/',(req,res)=>{
    Pergunta.findAll({raw: true}).then((perguntas)=>{
        res.render('index',{perguntas})
    }).catch((err)=>{
        console.log(err)
        res.redirect('/')
    })
    
})
app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})
app.get('/perguntar/salvar',(req,res)=>{
    var{titulo,pergunta} = req.query
    var erro = []
    if(!titulo){
        erro.push({text:"Titulo Invalido"})
    }
    if(!pergunta){
        erro.push({text: "pergunta Invalida"})
    }
    if(erro.length>0){
        res.render('perguntar',erro)
    }else{
        Pergunta.create({
            titulo: titulo,
            pergunta: pergunta
        }).then(()=>{
            console.log("Pergunta salva")
            res.redirect('/')
        }).catch((err)=>{
            console.log("Erro ao salvar")
            res.redirect('/')
        })       
    }
})
app.get('/responder/:id',(req,res)=>{
    console.log(req.params.id)
    Pergunta.findOne({ where: { id: req.params.id }}).then((pergunta)=>{
        Resposta.findAll({ where:{pergunta: req.params.id}}).then((respostas)=>{
            res.render('responder',{pergunta,respostas})      
        }).catch((err)=>{
            console.log(err)
            res.redirect('/')
        })
    }).catch((err)=>{
        console.log(err)
        res.redirect('/')
    })
})
app.get('/resposta/salvar',(req,res)=>{
    const {pergunta,usuario,resposta} =req.query
    Resposta.create({
        usuario: usuario,
        pergunta: pergunta,
        resposta: resposta
    }).then(()=>{
        console.log("Resposta salva")
        res.redirect('/responder/'+pergunta)
    }).catch((err)=>{
        console.log("Erro ao salvar resposta",err)
        res.redirect('/')
    }) 

})
app.listen(PORT,(err)=>{
    if(err){
        console.log("Erro ao iniciar Servidor")
    }else{
        console.log("Servidor rodando na porta "+PORT)
    }
})

