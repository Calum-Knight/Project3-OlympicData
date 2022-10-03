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
        barmode: 'group',


    }
    let data1 = [trace1, trace2];
    Plotly.newPlot('gender_plot', data1, layout)
});




function buildYearChart(year) {

    console.log(year)

    d3.json(`/api/years/${year}`).then((data) => {

        function compare(a, b) {
            if (a.Gold > b.Gold) {
                return -1;
            }
            if (a.Gold < b.Gold) {
                return 1;
            }
            return 0;
        }

        data[6].sort(compare);
        console.log(data[6])

        let x_noc = data[6].map(function (list) {
            return list.Country;
        });

        let y_gold = data[6].map(function (list) {
            return list.Gold;
        });

        let y_silver = data[6].map(function (list) {
            return list.Silver;
        });
        let y_bronze = data[6].map(function (list) {
            return list.Bronze;
        });

        trace_gold = {
            x: x_noc,
            y: y_gold,
            type: 'bar',
            name: 'Gold Medals',
            color: 'yellow',
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

        // var result = "<table border=1><thead><tr><th>Country</th><th>Gold</th><th>Silver</th><th>Bronze</th></tr></thead>";
        // for (var i = 0; i < data[3].length; i++) {
        //     result += "<tr>";
        //     for (var j = 2; j < 6; j++) {
        //         result += "<td>" + data[j][i] + "</td>";
        //     }
        //     result += "</tr>";
        // }
        // result += "</table>";
        // console.log(result)



        function buildYearTable(year) {
            function createheader() {

                var table = document.getElementById("table");
                table.deleteTHead();
                var header = table.createTHead(table);
                var row = header.insertRow(0);

                var head = ["Country", "Gold", "Silver", "Bronze", "Total"];
                for (let i = 0; i < head.length; i++) {
                    let cell = document.createElement("td");
                    cell.innerText = head[i];
                    row.append(cell);
                }
            }
            // var table = document.getElementById("table");
            // var tb = document.querySelectorAll('tbody');

            // if (tb.len > 0) {
            //     for (var i = 0; i < tb.length; i++) {
            //         if (tb[i].children.length != 0) {
            //             tb[i].table.removeChild(tb[i]);
            //         }
            //     }


            // }

            // function deleteRow() {

            // table.deleteRow(1);

            function populatebody() {
                var table = document.getElementById("table");

                var tbody = table.createTBody(table);
                for (let i = 0; i < data[6].length; i++) {

                    var row = tbody.insertRow(0);
                    row.innerHTML = `
                  <td id = 'coloth'>${data[6][i].Country}</td>
                  <td id = 'col1'>${data[6][i].Gold}</td>
                  <td id = 'col2'>${data[6][i].Silver}</td>
                  <td id = 'col3'>${data[6][i].Bronze}</td>
                  <td id = 'coloth'>${data[6][i].Gold + data[6][i].Silver + data[6][i].Bronze}</td>
                  `;


                }
                console.log(table)
                console.log(tbody)
            };
            function sortTable() {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById("table");
                switching = true;
                /* Make a loop that will continue until
                no switching has been done: */
                while (switching) {
                    // Start by saying: no switching is done:
                    switching = false;
                    rows = table.rows;
                    /* Loop through all table rows (except the
                    first, which contains table headers): */
                    for (i = 1; i < (rows.length - 1); i++) {
                        // Start by saying there should be no switching:
                        shouldSwitch = false;
                        /* Get the two elements you want to compare,
                        one from current row and one from the next: */
                        x = rows[i].getElementsByTagName("TD")[4];
                        y = rows[i + 1].getElementsByTagName("TD")[4];
                        // Check if the two rows should switch place:
                        if (+x.innerHTML < +y.innerHTML) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                        // .toLowerCase()
                    }
                    if (shouldSwitch) {
                        /* If a switch has been marked, make the switch
                        and mark that a switch has been done: */
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            };
            createheader();
            // deleteRow()
            populatebody();
            sortTable();

        };
        buildYearTable(year)
    })
}


function optionYearChanged(newYear) {
    buildYearChart(newYear);
}

buildYearChart(1924)
// buildYearTable(1924)