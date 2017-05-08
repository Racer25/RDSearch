function provide_DOM(terms) 
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
			}
			else
			{
				console.log("Erreur dans la requête");
			}
		}
	}
	
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
            provide_DOM(terms);
        }
	}
	
};