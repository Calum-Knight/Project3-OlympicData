

const dataPromise = d3.json('localhost/');
console.log("Data Promise: ", dataPromise);


d3.json('localhost/').then(function (data) {

    console.log(data);

}

)