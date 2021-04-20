var api_handler = require('../dados/repositorios/api_handler')

class usuario {

    constructor(nome, email, id) {
        this._nome = nome
        this._email = email
        this._id = id
    }

    get nome() {
        return this._nome
    }

    get email() {
        return this._email
    }

    get id() {
        return this._id
    }
}

module.exports = usuario