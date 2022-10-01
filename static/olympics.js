// var url = "/Data"
d3.json('/pageone').then(function (data) {
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


function buildYearChart(year) {

    console.log(year)

    d3.json(`/api/years/${year}`).then((data) => {

        // console.log(data)


        // console.log(data[2]["Bronze_Medals"])

        console.log(data)
        x_noc = data[2]
        y_gold = data[3]
        y_silver = data[4]
        y_bronze = data[5]

        trace_gold = {
            x: x_noc,
            y: y_gold,
            type: 'bar',
            name: 'Gold Medals'
        }
        trace_silver = {
            x: x_noc,
            y: y_silver,
            type: 'bar',
            name: 'Silver Medals'
        }
        trace_bronze = {
            x: x_noc,
            y: y_bronze,
            type: 'bar',
            name: 'Bronze Medals'
        }

        year_layout = {

            title: 'Medals by Country for Select Year',
            xaxis: {
                tickangle: -90
            },
            barmode: 'stack'


        }

        trace_year = [trace_gold, trace_silver, trace_bronze]

        Plotly.newPlot('year_plot', trace_year, year_layout)
    })



};

function optionYearChanged(newYear) {
    buildYearChart(newYear);
}

buildYearChart(1924)