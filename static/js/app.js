// Initializes the page with a default plot

// function init() {
d3.json("samples.json").then((importedData)=> {
    var namesData = importedData.names;
    var metadataData = importedData.metadata;
    var samplesData = importedData.samples;

    console.log(namesData);
    console.log(samplesData);
    console.log(metadataData);

var select = document.getElementById("selDataset"); 
var options = namesData; 

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var individual = document.createElement("option");
    individual.textContent = opt;
    individual.value = opt;
    select.appendChild(individual);
}

});
// }

// init();

function optionChanged() {
    var dropdownSelection = d3.select("#selDataset").node().value; 

    var x = [];
    var y = [];
    
    d3.json("samples.json").then((importedData)=> {
        var namesData = importedData.names;
        var samplesData = importedData.samples;

        for (var z = dropdownSelection; z < namesData.length; z++) {
            console.log(z);
            if(!samplesData.has(z)) {
                return z;
            }
        }
        console.log(z)
    });

};



//         // Use filter() to pass the function as its argument
//         var filteredId = incomingData.filter(filterIndividual);

//   //  Check to make sure your are filtering your movies.
//   console.log(filteredId);

//   // Use the map method with the arrow function to return all the filtered movie titles.
//   var otuIds = filteredId.map(id =>  id.samples);

//   // Use the map method with the arrow function to return all the filtered movie metascores.
//   var sampleValues = filteredId.map(movies => movies.metascore);

//   // Check your filtered metascores.
//   console.log(ratings);

//   // Create your trace.
//   var trace = {
//     x: otuIds,
//     y: sampleValues,
//     type: "bar"
//   };

//   // Create the data array for our plot
//   var data = [trace];

//   // Define the plot layout
//   var layout = {
//     title: "top 10 OTU results",
//     xaxis: { title: "OTU Values" },
//     yaxis: { title: "OTU IDs"}
//   };

//   // Plot the chart to a div tag with id "bar-plot"
//   Plotly.newPlot("bar-plot", data, layout);
// });

// };