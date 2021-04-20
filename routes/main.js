// Carregando módulos
const express = require('express');
const api_handler = require('../dados/repositorios/api_handler');
const router = express.Router();
const usuario = require('../models/usuario')


router.get("/login", (req, res) => {
    if (global.isAuth) {
        res.redirect('/posts')
    } else {
        res.render("./login", {
            title: 'Login - Live University',
            showInfo: false
        });
    }


})


router.post('/login', (req, res) => {

    const nome = req.body.nome
    const email = req.body.email

    api_handler.cadastrar_usuário(nome, email).then((resposta) => {
        if (resposta.status == 200) {
            global.globalUsuario = new usuario(nome, email, resposta.data.id)
            global.isAuth = true
            res.redirect('/posts')
        } else {
            console.log("erro de resposta")
        }
    }).catch((error) => {
        if (error) {
            console.log(error)
        }
    })


});

router.get("/posts", (req, res) => {
    if (global.isAuth) {
        try {
            api_handler.buscar_posts()
                .then(lista_posts => {
                    var lista_pronta = JSON.stringify(lista_posts)
                    res.render("./posts", {
                        title: 'Posts - Live University',
                        showInfo: true,
                        nome: global.globalUsuario.nome,
                        email: global.globalUsuario.email,
                        lista: lista_pronta
                    });
                })
        } catch (err) {
            console.log(err)
        }


    } else {
        res.redirect('/login');
    }

})

router.post('/enviar', (req, res) => {
    const comentario = req.body.postarea
    try {
        api_handler.add_comentario(global.globalUsuario.id, comentario)
        .then(() => {
            res.redirect('/posts');
        })
        
    } catch (err) {
        console.log(err)
    }
    
});

router.get('/logout', (req, res) => {
    if (global.isAuth) {
        global.isAuth = false
    }
    res.redirect('/login');

});


module.exports = router