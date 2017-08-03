function showSymptomsCloudWord(terms) 
{
    // Ecrire requête Ajax
    var maRequeteAJAX = new XMLHttpRequest();
    maRequeteAJAX.open("GET", "/searchDisease/"+terms, true, null, null);
    maRequeteAJAX.setRequestHeader("Content-Type","text/json; charset=utf-8");
    maRequeteAJAX.responseType = "json";

    maRequeteAJAX.onreadystatechange = function () 
    {
        if (this.readyState == 4)
        { // requete terminée
            if(this.status == 200)
            {
                //Requête ok
                updateCloudWord(this.response);
                hideLoading();
            }
            else
            {
                console.error("Error in searchDisease request, status: "+this.status);
                hideLoading();
            }
        }
    }

    //Show loading icon
    showLoading();

    //On envoie au serveur node.js
    maRequeteAJAX.send();
}

window.onload = function() 
{
    document.getElementById("searchButton").onclick=function(event)
    {
        var terms=document.getElementById("searchString").value;
        if(terms!="")
        {
            showSymptomsCloudWord(terms);
        }
    }
};