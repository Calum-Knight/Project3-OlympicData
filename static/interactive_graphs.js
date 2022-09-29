d3.json('pagetwo').then(function (data) {

    console.log(data);

    let olympic_noc = data.map(function (data) {
        return data.noc;
    });
    console.log("Country:", olympic_noc);

});