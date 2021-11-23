var ctx= document.getElementById("myChart").getContext("2d");
var currentLabel = 0, currentTittle = "Population";
var labels=[], apiPopulation = [], apiNetC = [], apiLand = [];
var myChart;

var datasets = 
    [
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
        {
            label:'Migrants',
            data:"",
            backgroundColor: "",
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },
    ];




var myOptions = {
    title:{
        display: true,
        text: 'Countries ' + currentTittle,
        fontSize: 25
    },

    legend:{display: false},

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

var myOptionsCake = {
    title:{
        display: true,
        text: 'Countries ' + currentTittle,
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
        data: {  
            labels: labels,
            datasets: [datasets[currentLabel]],
        },
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
            data: {  
                labels: labels,
                datasets: [datasets[currentLabel]],
            },
            options: myOptionsCake
        });
    } else if (document.getElementById("chartType").value == "bar") {
        myChart.destroy();
        myChart = new Chart(ctx, {
            type: document.getElementById("chartType").value,
            data: {  
                labels: labels,
                datasets: [datasets[currentLabel]],
            },
            options: myOptions
        });
    } else{
        myChart.destroy();
        myChart = new Chart(ctx, {
            type: document.getElementById("chartType").value,
            data: {  
                labels: labels,
                datasets: [datasets[currentLabel]],
            },
            options: myOptions
        });
    }
        

};


function updateLabel(){
   
    var selected = document.getElementById("valueColumn");
    var selectedValue = valueColumn.options[valueColumn.selectedIndex].value;
    
    currentLabel = parseInt(selectedValue);
    currentTittle = selected.options[selected.selectedIndex].text;
    
    myOptions.title.text = "Countries " + currentTittle;
    myOptionsCake.title.text = "Countries " + currentTittle;

    updateChartType();
}



async function getData(){
    const url = "https://gd6c1a14fa23298-dbgraph.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/population";
    const response = await fetch(url);
    const barChartData = await response.json();
    
    if(barChartData){
        
        const apiCountries = barChartData.items.map( (x) => x["country (or dependency)"] );
        const apiPopulation = barChartData.items.map( (x) => x["population (2020)"] );
        const apiNetC = barChartData.items.map( (x) => x["net_change"] );
        const apiLand = barChartData.items.map( (x) => x["land area (km²)"] );
        const apiMigrants = barChartData.items.map( (x) => x["migrants (net)"] );


        //API
        labels = apiCountries;
        datasets[0].data = apiPopulation;
        datasets[1].data = apiNetC;
        datasets[2].data = apiLand;
        datasets[3].data = apiMigrants;


        //Colors
        datasets[0].backgroundColor = generateColor(apiPopulation.length);
        datasets[1].backgroundColor = generateColor(apiNetC.length);
        datasets[2].backgroundColor = generateColor(apiLand.length);
        datasets[3].backgroundColor = generateColor(apiMigrants.length);

        //json
        document.getElementById("json").innerHTML = syntaxHighlight(JSON.stringify(barChartData, null, 1))

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

    for (let index = 0; index < len; index++){
       colors[index] = random_rgba();
    }

    return colors;
};


function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


