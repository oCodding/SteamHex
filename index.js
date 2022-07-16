var express = require("express");
var application = express();
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// Conexão com o banco de dados.
var knex = require("knex")({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "nome_database"
    }
});
module.exports = knex;

// Configuração [handlebars, bodyParser].
application.engine("handlebars", handlebars.engine({defaultLayout: "main"}));
application.set("view engine", "handlebars");
application.use(bodyParser.urlencoded({extended: false}));
application.use(bodyParser.json());
application.get("/", function(req, res){res.render("forming")});

// Alteração no banco de dados, de 0 para 1 na steamhex escolhida.
application.post("/aprovar", function(req, res){
    if(req.body.steamhex != ""){
        knex("nome_database_users").where({nome_coluna_steamhex: req.body.steamhex}).update({nome_coluna_valor_whitelisted: 1}).then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    }else{
        console.log("O campo da SteamHex não foi preenchido.");
    };
});

// Conexão da aplicação
application.listen(8081);
