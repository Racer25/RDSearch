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

}

var hideUpdateButton = function()
{
    document.getElementById("searchButton").className="w3-btn w3-ripple w3-red w3-margin-left w3-quarter w3-disabled";
    document.getElementById("searchButton").setAttribute("onclick", "");
}

var showUpdateButton = function(orphanetID)
{
    document.getElementById("searchButton").className="w3-btn w3-ripple w3-red w3-margin-left w3-quarter";
    document.getElementById("searchButton").setAttribute("onclick", "window.open('/disease/"+orphanetID+"', '_self')");
}

var changeInputContent = function(name)
{
    document.getElementById("search").value=name;
    document.getElementById("search").oninput();
    document.getElementById("search").focus();
}

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
}

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
}

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
}