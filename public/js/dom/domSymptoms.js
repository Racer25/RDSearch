var showLoading = function()
{
    document.getElementById("loadicon").style.display = "block";
};

var hideLoading = function()
{
    document.getElementById("loadicon").style.display = "none";
};

var updateCloudWord = function(symptomsWithSize)
{
    //Delete all children of symptomsCloudPanel
    var symptomsCloudPanel = document.getElementById("symptomsCloudPanel");
    while (symptomsCloudPanel.hasChildNodes())
    {
        symptomsCloudPanel.removeChild(symptomsCloudPanel.lastChild);
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
        d3.select("#symptomsCloudPanel").append("svg")
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
};