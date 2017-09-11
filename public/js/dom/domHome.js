var selectedSuggestion;
var exactMatch=false;

var updateSuggestions = function(suggestions)
{
    //Delete all children of suggestions
    var suggestionsDiv = document.getElementById("suggestions");
    while (suggestionsDiv.hasChildNodes())
    {
        suggestionsDiv.removeChild(suggestionsDiv.lastChild);
    }
    //And selectedSuggestion
    selectedSuggestion=null;


    //Add suggestion in HTML
    for(var i=0; i < suggestions.length; i++)
    {
        var suggestionDiv=document.createElement("div");
        suggestionDiv.className="w3-bar-item w3-button";
        suggestionDiv.id=suggestions[i].orphanetID;
        suggestionDiv.setAttribute("onclick", "changeInputContent('"+suggestions[i].name+"')");
        suggestionDiv.textContent=suggestions[i].name;
        suggestionsDiv.appendChild(suggestionDiv);
    }

    //0 suggestions
    if(suggestions.length==0)
    {
        suggestionsDiv.className="w3-dropdown-content w3-bar-block w3-border w3-white";
    }
    else
    {
        suggestionsDiv.className="w3-dropdown-content w3-bar-block w3-border w3-white w3-show";
    }

};

var hideUpdateButton = function()
{
    document.getElementById("searchButton").className="w3-btn w3-ripple w3-red w3-margin-left w3-disabled";
    document.getElementById("searchButton").setAttribute("onclick", "");
};

var showUpdateButton = function(orphanetID)
{
    document.getElementById("searchButton").className="w3-btn w3-ripple w3-red w3-margin-left";
    document.getElementById("searchButton").setAttribute("onclick", "window.open('/disease/"+orphanetID+"', '_self')");
};

var changeInputContent = function(name)
{
    document.getElementById("search").value=name;
    document.getElementById("search").oninput();
    document.getElementById("search").focus();
};

var downInSuggestions = function()
{
    var suggestionsDiv=document.getElementById("suggestions");
    if(suggestionsDiv.hasChildNodes())
    {
        if(selectedSuggestion == null || selectedSuggestion == undefined)
        {
            selectedSuggestion=suggestionsDiv.firstChild;
            selectedSuggestion.style="color: #000!important;background-color: #ccc!important;";
        }
        else
        {
            //Get index of selectedSuggestion
            var selectedSuggestionCopy=selectedSuggestion;
            var indexSelectedSuggestion = 0;
            while( (selectedSuggestionCopy = selectedSuggestionCopy.previousSibling) != null )
            {
                indexSelectedSuggestion++;
            }
            if(indexSelectedSuggestion < suggestionsDiv.childElementCount-1)
            {
                //Deleting style
                for(var i =0; i <suggestionsDiv.childElementCount ; i++)
                {
                    suggestionsDiv.childNodes[i].style="";
                }

                selectedSuggestion = suggestionsDiv.childNodes[indexSelectedSuggestion+1];
                selectedSuggestion.style="color: #000!important;background-color: #ccc!important;";
            }

        }
    }
};

var upInSuggestions = function()
{
    var suggestionsDiv=document.getElementById("suggestions");
    if(suggestionsDiv.hasChildNodes())
    {
        if(selectedSuggestion == null || selectedSuggestion == undefined)
        {
            selectedSuggestion=suggestionsDiv.firstChild;
            selectedSuggestion.style="color: #000!important;background-color: #ccc!important;";
        }
        else
        {
            //Get index of selectedSuggestion
            var selectedSuggestionCopy=selectedSuggestion;
            var indexSelectedSuggestion = 0;
            while( (selectedSuggestionCopy = selectedSuggestionCopy.previousSibling) != null )
            {
                indexSelectedSuggestion++;
            }
            if(indexSelectedSuggestion > 0)
            {
                //Deleting style
                for(var i =0; i <suggestionsDiv.childElementCount ; i++)
                {
                    suggestionsDiv.childNodes[i].style="";
                }

                selectedSuggestion = suggestionsDiv.childNodes[indexSelectedSuggestion-1];
                selectedSuggestion.style="color: #000!important;background-color: #ccc!important;";
            }
        }
    }
};

var enterScript = function()
{
    if(selectedSuggestion != null && selectedSuggestion != undefined)
    {
        changeInputContent(selectedSuggestion.textContent);
    }
    else if(exactMatch)
    {
        document.getElementById("searchButton").click();
    }
};

var updateTopDiseases = function(diseases)
{
    var listDiv = document.getElementById("topDiseasesList");
    if(listDiv !=null)
    {
        //Delete all children of listDiv
        while (listDiv.hasChildNodes())
        {
            listDiv.removeChild(listDiv.lastChild);
        }

        //Add diseases in HTML
        for(var i=0; i < diseases.length; i++)
        {
            var elementList=document.createElement("li");
            elementList.className="w3-hover-blue";
            elementList.style="cursor:pointer";
            elementList.setAttribute("onclick","window.open('/disease/"+diseases[i].orphanetID+"', '_self')");
            elementList.id=diseases[i].orphanetID;

            var p=document.createElement("p");

            var bName=diseases[i].name.bold();

            var bNumber=diseases[i].numberOfPublications.toString().bold();

            p.innerHTML += bName;
            p.innerHTML += " (";
            p.innerHTML += bNumber;
            p.innerHTML += " publications)";

            elementList.appendChild(p);
            listDiv.appendChild(elementList);
        }

        //li for request
        var lastLi = document.createElement("li");
        lastLi.className="w3-hover-blue";
        lastLi.style="cursor:pointer";
        var b=document.createElement("b");
        b.textContent="...";

        lastLi.appendChild(b);
        listDiv.appendChild(lastLi);
    }

};