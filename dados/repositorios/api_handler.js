var axios = require('axios');

var urlCadastro =  'http://138.68.7.94:85/cadastro'
var urlBusca = 'http://138.68.7.94:85/busca_comentarios'
var urlEnvioPost = 'http://138.68.7.94:85/add_comentario'

class api_handler {
    constructor(){}


    static cadastrar_usuário(nome, email) {
        return axios.post(urlCadastro, {nome: nome, email: email})
    }

    static async buscar_posts() {
            var resposta = await axios.post(urlBusca) 
        
            return resposta.data
    }

    static async add_comentario(id, post) {
        var resposta = await axios.post(urlEnvioPost, {id_usuario: id, comentario: post})
        return resposta
    }

}

module.exports = api_handler