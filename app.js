//Globals variables
global.__base = __dirname + '/';

//Basic modules
var express = require('express');
var session = require('cookie-session');
var bodyParser = require("body-parser");
var exec = require('child_process').exec;
var async = require("async");

//Personnal modules
var Searcher = require("./local_node_modules/controller/Searcher.js");
var LingPipeModule = require("./local_node_modules/controller/LingPipeModule.js");
var RelationExtractor = require("./local_node_modules/controller/RelationExtractor.js");

var ConnectionProvider = require("./local_node_modules/dao/ConnectionProvider.js");
var RareDiseaseDao = require("./local_node_modules/dao/RareDiseaseDao.js");
var RareDisease_YearDao = require("./local_node_modules/dao/RareDisease_YearDao.js");
var YearDao = require("./local_node_modules/dao/YearDao.js");
var TextualInformationDao = require("./local_node_modules/dao/TextualInformationDao.js");
var MostCitedPublicationDao = require("./local_node_modules/dao/MostCitedPublicationDao.js");
var RareDisease_MostCitedPublicationDao = require("./local_node_modules/dao/RareDisease_MostCitedPublicationDao.js");
var RareDisease_SymptomDao = require("./local_node_modules/dao/RareDisease_SymptomDao.js");
var SymptomDao = require("./local_node_modules/dao/SymptomDao.js");

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
    var rareDiseases=[];

    //Get years of database
    YearDao.getYears(
        function(years)
        {
            var realYears=[];
            for(var i = 0; i <years.length; i++)
            {
                realYears.push(years[i].year);
            }
            //Get number of publications of first year in array
            RareDisease_YearDao.getTop3RareDisease_Year(years[0].year, 4,
                function(rareDisease_Years)
                {
                    async.each(
                        rareDisease_Years,
                        function(rareDisease_Year, next)
                        {
                            //Get diseases details
                            RareDiseaseDao.getRareDiseaseByOrphanetID(rareDisease_Year.orphanetID,
                                function(rareDisease)
                                {
                                    rareDiseases.push(rareDisease);
                                    next();
                                }
                            );
                        },
                        function(err)
                        {
                            if(err)
                            {
                                console.error("Error occurred searching top 3 of rarediseases");
                                res.render('pages/search.ejs', {years: realYears, rareDisease_Years: rareDisease_Years,
                                    rareDiseases:rareDiseases});
                            }
                            else
                            {
                                res.render('pages/search.ejs', {years: realYears, rareDisease_Years: rareDisease_Years,
                                    rareDiseases:rareDiseases});
                            }
                        });
                });
        }
    );
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

app.get('/topDiseases/:year', function(req, res) {
    var year=req.params.year;

    var rareDiseases=[];

    RareDisease_YearDao.getTop3RareDisease_Year(year, 4,
        function(rareDisease_Years)
        {
            async.each(
                rareDisease_Years,
                function(rareDisease_Year, next)
                {
                    RareDiseaseDao.getRareDiseaseByOrphanetID(rareDisease_Year.orphanetID,
                        function(rareDisease)
                        {
                            rareDisease.numberOfPublications = rareDisease_Year.numberOfPublications;
                            rareDiseases.push(rareDisease);
                            next();
                        }
                    );
                },
                function(err)
                {
                    if(err)
                    {
                        console.error("Error occurred searching top 3 of rarediseases");
                        res.json(rareDiseases);
                    }
                    else
                    {
                        res.json(rareDiseases);
                    }
                });
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

app.get('/symptomsCloudWordRequest/:orphanetID', function(req, res) {
    var orphanetID=req.params.orphanetID;

    var symptomsWithWeight = [];
    RareDisease_SymptomDao.getRareDisease_SymptomFromOrphanetID(
        orphanetID,
        function(rareDisease_Symptoms)
        {
            async.each(
                rareDisease_Symptoms,
                function(rareDisease_Symptom, nextSymptom)
                {
                    SymptomDao.getSymptom(
                        rareDisease_Symptom.name,
                        function(symptom)
                        {
                            console.log("Symptom found");
                            symptomsWithWeight.push(
                                {
                                    text:symptom.name,
                                    size:rareDisease_Symptom.weight
                                });
                            nextSymptom();
                        }
                    );
                },
                function(err)
                {
                    if(err)
                    {
                        console.error("Error recovering symptoms from DB");
                    }
                    else
                    {
                        console.info("Success recovering symptoms from DB");
                        res.header("Content-Type", "application/json; charset=utf-8");
                        res.json(symptomsWithWeight);
                    }
                }
            );
        }
    );
});

app.get('/disease/:orphanetID', function(req, res) {
    var orphanetID=req.params.orphanetID;

    RareDiseaseDao.getRareDiseaseByOrphanetID(
        orphanetID,
        function(results)
        {
            var disease=results;
            TextualInformationDao.getTextualInformationByOrphanetID(
                disease.orphanetID,
                function(textualInformations)
                {
                    RareDisease_MostCitedPublicationDao.getRareDisease_MostCitedPublicationFromOrphanetID(
                        disease.orphanetID,
                        function(rareDisease_MostCitedPublications)
                        {
                            var publications=[];
                            async.each
                            (
                                rareDisease_MostCitedPublications,
                                function(rareDisease_MostCitedPublication, next)
                                {
                                    MostCitedPublicationDao.getPublication(
                                        rareDisease_MostCitedPublication.idPublication,
                                        function(publication)
                                        {
                                            publications.push(publication);
                                            next();
                                        }
                                    )
                                },
                                function(err)
                                {
                                    if(err)
                                    {
                                        console.error("Error occuring recovering  mostCitedPublications from DB");
                                    }
                                    else
                                    {
                                        console.info("Success recovering  mostCitedPublications from DB");
                                        res.render('pages/disease.ejs',
                                            {
                                                disease: disease,
                                                textualInformations: textualInformations,
                                                rareDisease_MostCitedPublications: rareDisease_MostCitedPublications,
                                                publications: publications
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    );
                });
        });
});

//Error 404
app.use(function(req, res){
    res.status(404).render("pages/404.ejs");
});

//We start the server
app.listen(8080);