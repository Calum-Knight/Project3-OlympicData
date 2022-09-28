

// const dataPromise = d3.json('http://127.0.0.1:5000/');

// console.log("Data Promise: ", dataPromise);

// var url = "/Data"
// d3.json('https://127.0.0.1:5000/data').then(function (data) {
// d3.json(url).then(function (data) {
    d3.json('../data.json')

    .then(function(data){
    
        // console.log(data);
        
        let olympic_year = data.map(function(data){
            return data.year;
        });
        console.log("Year:",olympic_year);
        
        let olympic_sex = data.map(function(data){
            return data.sex;
        });
        console.log("Sex:",olympic_sex);
        
        let olympic_city = data.map(function(data){
            return data.city;
        });
        console.log("City:",olympic_city);
       
        let olympic_medal = data.map(function(data){
            return data.medal;
        });
        console.log("Medal:",olympic_medal);
    
        let olympic_noc = data.map(function(data){
            return data.noc;
        });
        console.log("Team:",olympic_noc);
    
        trace1 = {
            x: olympic_year,
            y: olympic_sex,
            type: 'bar'
        };
        let data1 = [trace1];    
        Plotly.newPlot('myDiv', data1)
    
    
    
    
    
    
    });
    
    
       
    
        // trace1 = {
        //     x: [data.year],
        //     y: [data.sex],
        //     type: 'bar'
        // }
        // Plotly.newPlot('myDiv', trace1)
    
        // var trace1 = {
        //     x: ['giraffes', 'orangutans', 'monkeys'],
        //     y: [20, 14, 23],
        //     name: 'SF Zoo',
        //     type: 'bar'
        //   };
        //   var trace2 = {
        //     x: ['giraffes', 'orangutans', 'monkeys'],
        //     y: [12, 18, 29],
        //     name: 'LA Zoo',
        //     type: 'bar'
        //   };
        //   var data = [trace1, trace2];
        //   var layout = {barmode: 'group'};
        //   Plotly.newPlot('myDiv', data, layout)
    // });
    
    //)