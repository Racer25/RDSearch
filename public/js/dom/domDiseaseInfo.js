var showGraph = function(data)
{
    var ctx = document.getElementById("graphPublicationsPerYear").getContext('2d');
    var myChart = new Chart(
        ctx, 
        {
            type: 'line',
            data: 
            {
                datasets:
                [
                    {
                        label: '# of publications by year',
                        borderColor:"#2E64FE",
                        backgroundColor:"#8181F7",
                        xAxisID:"year",
                        yAxisID:"numberOfPublications",
                        showline:true,
                        data: data,
                        lineTension: 0.5
                    }
                ]
            }
            ,
            options: {
                scales: {
                    yAxes: 
                    [
                        {
                            id:"numberOfPublications",
                            type:"linear",
                            ticks: 
                            {
                                beginAtZero:true,
                                maxTicksLimit:20
                            }
                        }
                    ],
                    xAxes: 
                    [
                        {
                            id:"year",
                            type:"linear",
                            ticks: 
                            {
                                stepSize:1,
                                beginAtZero:false
                            }
                        }
                    ]
                },
                title:
                {
                    display:true,
                    position:"top",
                    text:"Publications per year"
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                },
                animation:
                {
                    easing:"easeOutExpo"
                }
            }
        }
    );
};

var truncate = function(selector, maxLength)
{
    var elements = document.querySelectorAll(selector);
    for(let i =0; i < elements.length; i++)
    {
        if (elements[i].innerText.length > maxLength)
        {
            elements[i].innerText = elements[i].innerText.substr(0, maxLength) + '...';
        }
    }
};