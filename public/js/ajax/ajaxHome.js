var topDiseasesRequest = function(year, callback)
{
    // Ecrire requête Ajax
    var maRequeteAJAX = new XMLHttpRequest();
    maRequeteAJAX.open("GET", "/topDiseases/"+year, true, null, null);
    maRequeteAJAX.responseType = "json";

    maRequeteAJAX.onreadystatechange = function ()
    {
        if (this.readyState == 4)
        { // requete terminée
            if(this.status == 200)
            {
                //Requête ok
                var diseases=this.response;

                //DOM method
                callback(diseases);
            }
            else
            {
                console.error("Error in topDiseases request, status: "+this.status);
                callback([]);
            }
        }
    };

    //On envoie au serveur node.js
    maRequeteAJAX.send();
};

var suggestionsRequest = function(terms, search)
{
    // Ecrire requête Ajax
    var maRequeteAJAX = new XMLHttpRequest();
    maRequeteAJAX.open("GET", "/suggestions/"+terms, true, null, null);
    maRequeteAJAX.responseType = "json";

    maRequeteAJAX.onreadystatechange = function ()
    {
        if (this.readyState == 4)
        { // requete terminée
            if(this.status == 200)
            {
                //Requête ok
                var suggestedDiseases=this.response;

                //Ordering suggestions with levenshtein distance
                suggestedDiseases=suggestedDiseases.sort(function(a, b){return getEditDistance(a.name, search)-getEditDistance(b.name, search)});

                //Top 5 of suggestions
                suggestedDiseases=suggestedDiseases.filter(function(currentValue, index,arr){return index < 5});

                //DOM method
                updateSuggestions(suggestedDiseases)
            }
            else
            {
                console.error("Error in search request, status: "+this.status);
            }
        }
    };

    //On envoie au serveur node.js
    maRequeteAJAX.send();
};

var exactMatchRequest = function(search, callbackExactMatch, callbackNoExactMatch)
{
    // Ecrire requête Ajax
    var maRequeteAJAX = new XMLHttpRequest();
    maRequeteAJAX.open("GET", "/exactMatch/"+search, true, null, null);
    maRequeteAJAX.responseType = "json";

    maRequeteAJAX.onreadystatechange = function ()
    {
        if (this.readyState == 4)
        { // requete terminée
            if(this.status == 200)
            {
                //Requête ok
                //Exact Match?
                if(this.response.length !=0)
                {
                    callbackExactMatch(this.response[0].orphanetID);
                }
                else
                {
                    callbackNoExactMatch();
                }
            }
            else
            {
                console.error("Error in exactMatchRequest, status: "+this.status);
            }
        }
    };

    //On envoie au serveur node.js
    maRequeteAJAX.send();
};

window.onload = function()
{
    //TopDiseases
    var selectDate=document.getElementById("selectDate");
    if(selectDate != null)
    {
        document.getElementById("selectDate").onchange=function(event)
        {
            document.getElementById("selectDate")
            var year=selectDate.options[selectDate.selectedIndex].value;
            topDiseasesRequest(year, updateTopDiseases);
        }
    }
    else
    {
        console.log("null");
    }

    //Search bar
    if(document.getElementById("search") != null)
    {
        document.getElementById("search").oninput=function(event)
        {
            var search=document.getElementById("search").value;
            if(search!="")
            {
                if(search.length >3)
                {
                    var terms=[]

                    //Separate into words
                    var tab=search.split(" ");
                    for(var i=0; i < tab.length; i++)
                    {
                        var tab2=tab[i].split("-");
                        terms= terms.concat(tab2);
                    }
                    //Delete comas
                    for(var i=0; i < terms.length; i++)
                    {
                        terms[i]=terms[i].replace(",", "");
                    }

                    //Filter duplicate
                    terms = terms.filter(function(elem, index, self) { return index == self.indexOf(elem)});

                    //Do the ajax(s) request(s)
                    exactMatchRequest(
                        search,
                        function(orphanetID){
                            console.log("Exact match");
                            exactMatch=true;
                            showUpdateButton(orphanetID);
                            updateSuggestions([]);
                            },
                        function(){
                            console.log("No exact match");
                            exactMatch=false;
                            hideUpdateButton();
                            suggestionsRequest(terms, search);}
                    );
                }
                else
                {
                    updateSuggestions([]);
                }
            }
            else
            {
                updateSuggestions([]);
            }
        }
    }

    //Use of arrows
    if(document != null)
    {
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 38:
                    upInSuggestions();
                    break;
                case 40:
                    downInSuggestions();
                    break;
                case 13:
                    enterScript();
                    break;
            }
        };
    }
};