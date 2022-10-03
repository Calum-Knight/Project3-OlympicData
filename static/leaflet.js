// Create a map object.
var myMap = L.map("leaflet", {
  center: [15.5994, -28.6731],
  zoom: 3
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// // Country data
var cities = [{
  year:"1924", city:"Chamonix", location:[45.9246705, 6.8727506], event_count:2, female_count:17, change_per:0},
  {year:"1928", city:"Sankt Moritz",location:[46.4978958, 9.8392428],event_count:2,female_count:33,change_per:94.11},
  {year:"1932", city:"Lake Placid",location:[44.279621, -73.979874],event_count:2,female_count:22,change_per:-33.33},
  {year:"1936", city:"Garmisch-Partenkirchen",location:[47.4923741, 11.0962815],event_count:3,female_count:81,change_per:268.18},
  {year:"1948", city:"Sankt Moritz",location:[46.4978958, 9.8392428],event_count:5,female_count:133,change_per:64.19},
  {year:"1952", city:"Oslo",location:[59.9133301, 10.7389701],event_count:6,female_count:185,change_per:39.09},
  {year:"1956", city:"Cortina d'Ampezzo",location:[46.5383332, 12.1373506],event_count:9,female_count:246,change_per:33},
  {year:"1960", city:"Squaw Valley",location:[36.7402261,-119.246785],event_count:13,female_count:295,change_per:20},
  {year:"1964", city:"Innsbruck",location:[47.2654296, 11.3927685],event_count:15,female_count:404,change_per:37},
  {year:"1968", city:"Grenoble",location:[45.1875602, 5.7357819],event_count:15,female_count:416,change_per:3},
  {year:"1972", city:"Sapporo",location:[43.061936, 141.3542924],event_count:15,female_count:415,change_per:-0.24},
  {year:"1976", city:"Innsbruck",location:[47.2654296, 11.3927685],event_count:17,female_count:434,change_per:4.57},
  {year:"1980", city:"Lake Placid",location:[44.279621, -73.979874],event_count:17,female_count:430,change_per:-1},
  {year:"1984", city:"Sarajevo",location:[43.8519774, 18.3866868],event_count:18,female_count:536,change_per:24.65},
  {year:"1988", city:"Calgary",location:[51.048615, -114.070847],event_count:21,female_count:680,change_per:26.86},
  {year:"1992", city:"Albertville",location:[45.6754622, 6.3925417],event_count:33,female_count:1054,change_per:55},
  {year:"1994", city:"Lillehammer",location:[61.1145451, 10.4670073],event_count:36,female_count:1105,change_per:4.83},
  {year:"1998", city:"Nagano",location:[36.1143945, 138.0319015],event_count:63,female_count:1384,change_per:25.24},
  {year:"2002", city:"Salt Lake City",location:[40.7596198, -111.8867975],event_count:70,female_count:1582,change_per:14.30},
  {year:"2006", city:"Torino",location:[45.0677551, 7.6824892],event_count:77,female_count:1757,change_per:11.06},
  {year:"2010", city:"Vancouver",location:[49.2608724, -123.113952],event_count:77,female_count:1847,change_per:5.12},
  {year:"2014", city:"Sochi",location:[43.5854823, 39.723109],event_count:91,female_count:2023,change_per:9.52}];

// Looping through the cities array, create one marker for each city, bind a popup containing its year and % change, and add it to the map.
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  L.marker(city.location)
    .bindPopup(`<h1>${city.city}</h1><hr><h2>${city.year}</h2><hr><h3>Female Participation % change ${city.change_per}</h3>`)
    .addTo(myMap);

}