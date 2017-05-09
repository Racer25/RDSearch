var express = require('express');
var session = require('cookie-session');
var bodyParser = require("body-parser");
var Searcher = require("./local_node_modules/Searcher.js");

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



//Gestion des GET

app.get('/', function(req, res) {
    res.render('pages/home.ejs', {activetitle: "traffic"});
});

app.get("/searchDisease/:terms",function(req, res){

    //Initialisations publications
    var publications=[];

    //On récupère nos termes de recherche

    var terms=req.params.terms;
    console.info("Recherche des termes: "+terms);
    
    //Faire la recherche sur PubMed
    Searcher.search(terms);
    
    //On répond enfin
    res.redirect('/');
    
});

app.use(function(req, res, next){
    res.status(404).render("pages/404.ejs");
});

app.listen(8080);
