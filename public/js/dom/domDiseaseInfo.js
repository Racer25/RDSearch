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
                        data: data
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
                                stepSize:1,
                                beginAtZero:true
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