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

}