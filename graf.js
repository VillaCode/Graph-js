var ctx= document.getElementById("myChart").getContext("2d");
        
var myData = {  
    labels:['Boston','Worcester','Springfield'],
    datasets:[
        {
            label:'Num datos',
            data:[10,9,15],
            backgroundColor:[
                'rgb(66, 134, 244,0.5)',
                'rgb(74, 135, 72,0.5)',
                'rgb(229, 89, 50,0.5)'
            ],
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },
    ]
};

var myDataBars = {  
    labels:['Cities'],
    datasets:[
        {
            label:'Boston',
            data:[10],
            backgroundColor:[
                'rgb(66, 134, 244,0.5)',
            ],
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },{
            label:'Manchester',
            data:[20],
            backgroundColor:[
                'rgb(74, 135, 72,0.5)',
            ],
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },{
            label:'Springfield',
            data:[12],
            backgroundColor:[
                'rgb(229, 89, 50,0.5)'
            ],
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        }
    ]
};

var myOptions = {
    title:{
        display: true,
        text: 'Largest cities',
        fontSize: 25
    },

    legend:{position: "bottom"},

    scales:{
        yAxes:[{
            ticks:{
                beginAtZero:true
            }
        }]
    },
    tooltips:{
        enabled: true
    }
}


                    
var myChart= new Chart(ctx,{

    type:"bar", // bar, horizontalBar, pie, line, radar, polarArea
    data: myDataBars,
    options: myOptions
});







document.getElementById("legendBut").addEventListener("click", updateLegend);
function updateLegend(){
    
    if (myChart.options.legend.display) {
        myChart.options.legend.display = false;
    }else{
        myChart.options.legend.display = true;
    };

    myChart.update();
}


function updateChartType(){

    

    if (document.getElementById("chartType").value == "doughnut") {
        myChart.destroy();
        myChart = new Chart(ctx, {
            type: document.getElementById("chartType").value,
            data: myData,
            options: myOptions
        });
    } else if (document.getElementById("chartType").value == "bar") {
        myChart.destroy();
        myChart = new Chart(ctx, {
            type: document.getElementById("chartType").value,
            data: myDataBars,
            options: myOptions
        });
    } else{
        myChart.destroy();
        myChart = new Chart(ctx, {
            type: document.getElementById("chartType").value,
            data: myData,
            options: myOptions
        });
    }
        

};