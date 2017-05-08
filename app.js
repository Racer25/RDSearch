var express = require('express');
var session = require('cookie-session');
var bodyParser = require("body-parser");
var Searcher = require("Searcher");

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
    res.render('pageDynamique.ejs', {etage: 4});
});

app.get('/sous-sol', function(req, res) {
    res.header("Content-Type", "application/json; charset=utf-8");
    premierModule.direBonjour();
    premierModule.direByeBye();
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
    //Récupération du paramètre
    var numEtage=Number(req.params.etagenum);
    console.log(numEtage);
    if(isNaN(numEtage))
        {
            res.header("Content-Type", "application/json; charset=utf-8");
            res.end('Ne te moque pas de moi!!');
        }
    else
    {
        res.render('pageDynamique.ejs', {etage: req.params.etagenum});
    }
    
});

app.get("/searchDisease/:terms",function(req, res){
    //Initialisations publications
    var publications=[];
    //URL
    //https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=100&term=(achalasia%20AND%20hasabstract[text]%20AND%20Humans[Mesh])%20AND%20hasabstract[text]%20AND%20Humans[Mesh]&retmode=json
    //On récupère notre paramètre
    var terms=req.params.terms;
    console.info("Recherche des termes: "+terms);
    
    //Faire la recherche sur PubMed
    Searcher.search(terms);
    
    //On répond enfin
    res.redirect('/');
    
});


// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function(req, res, next){
    res.header("Content-Type", "application/json; charset=utf-8");
    res.status(404).send('Page introuvable !');
});

app.listen(8080);