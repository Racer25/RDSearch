function topDiseasesRequest(year, callback)
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
    }

    //On envoie au serveur node.js
    maRequeteAJAX.send();
}

window.onload = function()
{
    console.log("onload");
    var selectDate=document.getElementById("selectDate");
    if(selectDate != null)
    {
        console.log("not null");
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
};