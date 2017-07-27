//Globals variables
global.__base = __dirname + '/';

//Basic modules
var express = require('express');
var session = require('cookie-session');
var bodyParser = require("body-parser");
var exec = require('child_process').exec;

//Personnal modules
var Searcher = require("./local_node_modules/controller/Searcher.js");
var LingPipeModule = require("./local_node_modules/controller/LingPipeModule.js");
var RelationExtractor = require("./local_node_modules/controller/RelationExtractor.js");
var UpdateModule = require("./local_node_modules/controller/UpdateModule.js");

//Server configuration (session, static, ...)
var app = express();
app.use('/static', express.static(__dirname + '/public'));
app.use(session({name: 'session', keys: ['key1', 'key2']}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next)
        {
    if (typeof(req.session.list) == 'undefined') 
    {
        req.session.list = [];
    }
    next();
});


//Handling GET requests
app.get('/', function(req, res) {
    res.render('pages/home.ejs', {activetitle: "traffic"});
});

app.get("/searchDisease/:terms",function(req, res){

    //On récupère nos termes de recherche
    var terms=req.params.terms;
    console.info("Recherche des termes: "+terms);

    //Faire la recherche Pubmed et appliquer un child process
    //Searcher.search(terms, res, LingPipeModule.lingPipeFunction);
    
    //Faire la recherche Pubmed et appliquer un child process
    Searcher.search(terms, res, RelationExtractor.relationExtractorFunction);

    //Faire la recherche sur PubMed et renvoyer les publications en json directement
    //Searcher.search(terms, res, function(publications, res){res.json(publications);});
});

app.get('/example', function(req, res) {
    res.render('pages/example.ejs', {activetitle: "views"});
});

//Error 404
app.use(function(req, res, next){
    res.status(404).render("pages/404.ejs");
});

//We start the UpdateModule
//exec("node "+ __base + "local_node_modules/controller/UpdateModule.js");

//We start the server
app.listen(8080);