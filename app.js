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

var ConnectionProvider = require("./local_node_modules/dao/ConnectionProvider.js");
var RareDiseaseDao = require("./local_node_modules/dao/RareDiseaseDao.js");
var RareDisease_YearDao = require("./local_node_modules/dao/RareDisease_YearDao.js");
var TextualInformationDao = require("./local_node_modules/dao/TextualInformationDao.js"); 

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
    res.render('pages/search.ejs');
});

app.get('/home', function(req, res) {
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

app.get('/exactMatch/:search', function(req, res) {
    var search=req.params.search;

    RareDiseaseDao.getRareDiseaseByName(
        search, 
        function(results)
        {
            res.header("Content-Type", "application/json; charset=utf-8");
            res.json(results);
        });

});

app.get('/suggestions/:terms', function(req, res) {
    var terms=req.params.terms;
    terms=terms.split(",");

    RareDiseaseDao.getRareDiseasesSuggestions(
        terms, 
        function(results)
        {
            res.header("Content-Type", "application/json; charset=utf-8");
            res.json(results);
        });
});

app.get('/graphData/:orphanetID', function(req, res) {
    var orphanetID=req.params.orphanetID;

    RareDisease_YearDao.getRareDisease_YearByOrphanetID(
        orphanetID, 
        function(results)
        {
            res.header("Content-Type", "application/json; charset=utf-8");
            res.json(results);
        });
});

app.get('/disease/:orphanetID', function(req, res) {
    var orphanetID=req.params.orphanetID;

    RareDiseaseDao.getRareDiseaseByOrphanetID(
        orphanetID, 
        function(results)
        {
            var disease=results[0];
            TextualInformationDao.getTextualInformationByOrphanetID(
                disease.orphanetID,
                function(textualInformations)
                {
                    res.render('pages/disease.ejs', {disease: disease, textualInformations:textualInformations});
                });
        });
});

//Error 404
app.use(function(req, res, next){
    res.status(404).render("pages/404.ejs");
});

//We start the server
app.listen(8080);