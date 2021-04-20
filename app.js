// Carregando módulos
const express = require('express');
const config = require('./config')
const app = express();
const main = require('./routes/main')
const expressLayouts = require('express-ejs-layouts')



app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configurações
    // EJS
    app.use(expressLayouts)
    app.set('layout', './layouts/live_university')
    app.set('view engine', 'ejs');

    // public
    app.use(express.static('public'));
    app.use('/css', express.static(__dirname + 'public/css'));




    

// Rotas

app.get('/', (req, res) => {
    if (global.isAuth) {
        res.redirect('/posts');
    } else {
        res.redirect('/login');
    }
});

app.use('/', main)

// Outros

app.use((req, res, next) => {
    res.status(404).send("Ops, não consegui encontrar!")
  });

app.listen(config.porta, function(){
    console.log("Servidor rodando com sucesso");
}); 