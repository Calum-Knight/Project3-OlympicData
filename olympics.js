

// const dataPromise = d3.json('http://127.0.0.1:5000/');

// console.log("Data Promise: ", dataPromise);


//d3.json('http://127.0.0.1:5000').then(function (data) {
d3.json('../data.json')
.then(function(data){
  
    console.log(data);

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
});

//)