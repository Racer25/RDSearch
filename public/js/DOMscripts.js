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
    table.className="w3-table-all w3-centered w3-hoverable w3-animate-right";

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

var updateCloudWord = function(symptomsWithSize)
{
    //Delete all children of respanel except the load icon
    var respanel = document.getElementById("respanel");
    while (respanel.hasChildNodes() && respanel.lastChild.id != "loadicon") 
    {
        respanel.removeChild(respanel.lastChild);
    }

    //Cloud word creation
    var fill = d3.scale.category20();
    var layout = d3.layout.cloud()
    .size([800, 500])
    .words(symptomsWithSize)
    .padding(5)
    .rotate(function() { return -90 + Math.floor(Math.random() * 3) * (90-(-90))/(3-1); })
    .spiral("archimedean")
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);
    layout.start();
    
    function draw(words) {
    d3.select("#respanel").append("svg")
        .attr("class", "w3-centered w3-animate-right")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";})
        .text(function(d) { return d.text; });
    }
}