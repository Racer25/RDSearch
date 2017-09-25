var graphDataRequest = function(orphanetID, callback)
{
    // Ecrire requête Ajax
    var maRequeteAJAX = new XMLHttpRequest();
    maRequeteAJAX.open("GET", "/graphData/"+orphanetID, true, null, null);
    maRequeteAJAX.responseType = "json";

    maRequeteAJAX.onreadystatechange = function () 
    {
        if (this.readyState == 4)
        { // requete terminée
            if(this.status == 200)
            {
                //Requête ok
                var rareDisease_Years=this.response;
                
                //Transforming data to Chart.js format
                var graphData=[];
                for(var i = 0; i < rareDisease_Years.length; i++)
                {
                    var point={
                        x:Number(rareDisease_Years[i].year), 
                        y:Number(rareDisease_Years[i].numberOfPublications)
                    };
                    graphData.push(point);
                }
                showGraph(graphData);
            }
            else
            {
                console.error("Error in graphDataRequest, status: "+this.status);
            }
        }
    };

    //On envoie au serveur node.js
    maRequeteAJAX.send();
};

var symptomsCloudWordRequest = function(orphanetID, callback)
{
    // Ecrire requête Ajax
    var maRequeteAJAX = new XMLHttpRequest();
    maRequeteAJAX.open("GET", "/symptomsCloudWordRequest/"+orphanetID, true, null, null);
    maRequeteAJAX.responseType = "json";

    maRequeteAJAX.onreadystatechange = function ()
    {
        if (this.readyState == 4)
        { // requete terminée
            if(this.status == 200)
            {
                //Requête ok
                var symptomsWithWeight=this.response;

                updateCloudWord(symptomsWithWeight);
            }
            else
            {
                console.error("Error in symptomsCloudWordRequest, status: "+this.status);
            }
        }
    };

    //On envoie au serveur node.js
    maRequeteAJAX.send();
};

window.onload = function() 
{
    //Disp graph
    if(document.getElementById("graphPublicationsPerYear") != null)
    {
        var orphanetID=document.getElementById("graphPublicationsPerYear").getAttribute("orphanetID");
        graphDataRequest(orphanetID);
    }

    //Truncate publications title
    truncate(".titleToTruncate", 100);

    //Disp cloud word of symptoms
    if(document.getElementById("symptomsCloudPanel") != null)
    {
        var orphanetID=document.getElementById("graphPublicationsPerYear").getAttribute("orphanetID");
        symptomsCloudWordRequest(orphanetID);
    }
};