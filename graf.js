var ctx= document.getElementById("myChart").getContext("2d");

var eName=[], eSalary = [], eAge = [];
var myChart;

var myData = {  
    labels: eName,
    datasets:[
        {
            label:'Salary',
            data:eSalary,
            backgroundColor: generateColor(eSalary.length),
            borderWidth: 2,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000'
        },
        {
            label:'Age',
            data:eAge,
            backgroundColor: generateColor(eAge.length),
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
    const url = "http://dummy.restapiexample.com/api/v1/employees";
    const response = await fetch(url);
    const barChartData = await response.json();
    
    
    const salary = barChartData.data.map( (x) => x.employee_salary );
    const age = barChartData.data.map( (x) => x.employee_age );
    const name = barChartData.data.map( (x) => x.employee_name );

    //CASO DUMMY API
    myData.labels = name;
    myData.datasets[0].data = salary;
    myData.datasets[1].data = age;
    myData.datasets[0].backgroundColor = generateColor(salary.length);
    myData.datasets[1].backgroundColor = generateColor(age.length);

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