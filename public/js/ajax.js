var showLoading = function()
{
    document.getElementById("loadicon").style.display = "block";
}

var hideLoading = function()
{
    document.getElementById("loadicon").style.display = "none";
}

var updateSearchResults = function(publications)
{
    //Delete all children of respanel except the load icon
    var respanel = document.getElementById("respanel");
    while (respanel.hasChildNodes() && respanel.lastChild.id != "loadicon") 
    {
        respanel.removeChild(respanel.lastChild);
    }
    
    //Table creation
    var table = document.createElement("table");
    table.className="w3-table-all w3-centered w3-hoverable";

    var thead = document.createElement("thead");
    
    var trOfThead= document.createElement("tr");
    trOfThead.className="w3-blue";
    
    
    var thIdHead = document.createElement("th");
    thIdHead.textContent="Id";
    var thTitleHead = document.createElement("th");
    thTitleHead.textContent="Title";
    var thAuthorsHead = document.createElement("th");
    thAuthorsHead.textContent="Authors";

    trOfThead.appendChild(thIdHead);
    trOfThead.appendChild(thTitleHead);
    trOfThead.appendChild(thAuthorsHead);
    thead.appendChild(trOfThead);
    table.appendChild(thead);

    for(var i = 0; i < publications.length; i++)
    {
        var tr = document.createElement("tr");
        
        var tdId = document.createElement("td");
        tdId.textContent=publications[i].id;
        var tdTitle = document.createElement("td");
        tdTitle.textContent=publications[i].title;
        var tdAuthors = document.createElement("td");
        tdAuthors.textContent=publications[i].authors[0];
        
        tr.appendChild(tdId);
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthors);
        
        table.appendChild(tr);
    }

    respanel.appendChild(table);
}

function searchRequest(terms) 
{
    // Ecrire requête Ajax
    var maRequeteAJAX = new XMLHttpRequest();
    maRequeteAJAX.open("GET", "searchDisease/"+terms, true, null, null);
    maRequeteAJAX.responseType = "json";

    maRequeteAJAX.onreadystatechange = function () 
    {
        if (this.readyState == 4)
        { // requete terminée
            if(this.status == 200)
            {
                //Requête ok
                updateSearchResults(this.response);
                hideLoading();
            }
            else
            {
                console.log("Erreur dans la requête");
            }
        }
    }

    //Show loading icon
    showLoading();

    //On envoie à la servlet
    maRequeteAJAX.send();
}



window.onload = function() 
{
    //Bouton pas de solution
    document.getElementById("searchButton").onclick=function(event)
    {
        var terms=document.getElementById("searchString").value;
        if(terms!="")
        {
            searchRequest(terms);
        }
    }

};