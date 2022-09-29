// var url = "/Data"
d3.json('pageone').then(function (data) {
    // d3.json(url).then(function (data) {
    // d3.json('../data.json')


    // .then(function(data){

    console.log(data);

    let olympic_year_f = data["female"].map(function (year) {
        return year.year;
    });
    console.log("Year:", olympic_year_f);

    let olympic_year_m = data["male"].map(function (year) {
        return year.year;
    });
    console.log("Year:", olympic_year_m);

    let olympic_f = data["female"].map(function (data) {
        return data.count;
    });
    console.log("Female:", olympic_f);

    let olympic_m = data["male"].map(function (data) {
        return data.count;
    });
    console.log("Male:", olympic_m);

    // let olympic_city = data.map(function(data){
    //     return data.city;
    // });
    // console.log("City:",olympic_city);

    // let olympic_medal = data.map(function(data){
    //     return data.medal;
    // });
    // console.log("Medal:",olympic_medal);

    // let olympic_noc = data.map(function(data){
    //     return data.noc;
    // });
    // console.log("Team:",olympic_noc);

    trace1 = {
        x: olympic_year_f,
        y: olympic_f,
        type: 'bar',
        name: "female"
    };
    trace2 = {
        x: olympic_year_m,
        y: olympic_m,
        type: 'bar',
        name: "male"

    };

    layout = {

        title: 'Gender of Participants Over the Years',
        xaxis: {
            tickangle: -45
        },
        barmode: 'group'

    }
    let data1 = [trace1, trace2];
    Plotly.newPlot('plot', data1, layout)

    // function selectmale(person) {
    //     return person.sex == 'M';
    // }
    // filter() uses the custom function as its argument
    // let Male = data.filter(selectmale);
    // // Print to console
    // console.log(Male);
    //    return Male.year;





});



// d3.json('pagethree').then(function (data) {

//     console.log(data)

// });