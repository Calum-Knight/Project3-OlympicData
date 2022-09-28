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

//)