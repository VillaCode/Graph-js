var ctx= document.getElementById("myChart").getContext("2d");

var apiCountries=[], apiPopulation = [], apiNetC = [], apiLand = [];
var myChart;

var myData = {  
    labels: apiCountries,
    datasets:[
        {
            label:'Population',
            data:"",
            backgroundColor: "",
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },
        {
            label:'Net Change',
            data:"",
            backgroundColor: "",
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },
        {
            label:'Land Area (km²)',
            data:"",
            backgroundColor: "",
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },
    ]
};



var myOptions = {
    title:{
        display: true,
        text: 'Countries data',
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
};





async function loadChart(){      
    await getData();              
        myChart= new Chart(ctx,{
            type:"bar", // bar, horizontalBar, pie, line, radar, polarArea
            data: myData,
            options: myOptions
    });
};




function updateLegend(){
    
    if (myChart.options.legend.display) {
        myChart.options.legend.display = false;
    }else{
        myChart.options.legend.display = true;
    };

    myChart.update();
};


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
            data: myData,
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


async function getData(){
    const url = "https://gd6c1a14fa23298-dbgraph.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/population";
    const response = await fetch(url);
    const barChartData = await response.json();
    
    if(barChartData){
        console.log(barChartData)
        
        const apiCountries = barChartData.items.map( (x) => x["country (or dependency)"] );
        const apiPopulation = barChartData.items.map( (x) => x["population (2020)"] );
        const apiNetC = barChartData.items.map( (x) => x["net_change"] );
        const apiLand = barChartData.items.map( (x) => x["land area (km²)"] );


        //API
        myData.labels = apiCountries;
        myData.datasets[0].data = apiPopulation;
        myData.datasets[1].data = apiNetC;
        myData.datasets[2].data = apiLand;


        //Colors
        myData.datasets[0].backgroundColor = generateColor(apiPopulation.length);
        myData.datasets[1].backgroundColor = generateColor(apiNetC.length);
        myData.datasets[2].backgroundColor = generateColor(apiLand.length);

        //json
        document.getElementById("json").textContent = JSON.stringify(barChartData, null, 1)
    }else{
        alert("Error")
    }

};


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
};

function generateColor(len){
    let colors = []
    console.log(len);
    for (let index = 0; index < len; index++){
       colors[index] = random_rgba();
    }

    console.log(colors);
    return colors;
};



loadChart();