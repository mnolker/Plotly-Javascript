// Initializes the page with a default plot??
// function init() {

//references JSON data & creates arrays
d3.json("samples.json").then((importedData)=> {
    var namesData = importedData.names;
    var metadataData = importedData.metadata;
    var samplesData = importedData.samples;

    // console.log(namesData);
    // console.log(samplesData);
    // console.log(metadataData);


//creates drop down list of subject IDs to select from
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

    d3.json("samples.json").then((importedData)=> {
        function filterId(individual) {
            return individual.id === dropdownSelection;
        }

        var samplesData = importedData.samples;

        var filteredId = samplesData.filter(filterId);
        
        console.log(filteredId);
        
        var sampleOtuIdsNo = filteredId.map(individual =>  individual.otu_ids);
        var sampleOtuIdsNoText = sampleOtuIdsNo.join().split(',')
        var sampleOtuIds = sampleOtuIdsNoText.map(i => 'OTU '+i);

        var sampleOtuValues = filteredId.map(individual =>  individual.sample_values);

        console.log(sampleOtuIdsNo);
        console.log(sampleOtuIds);
        console.log(sampleOtuValues);

        // Create your trace.
        var traceBar = {
            x: sampleOtuValues,
            y: sampleOtuIds,
            type: "bar"
        };

        // Create the data array for our plot
        var dataBar = [traceBar];

        // Define the plot layout
        var layoutBar = {
            title: "top 10 OTU results",
            xaxis: { title: "OTU Values" },
            yaxis: { title: "OTU IDs"}
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", dataBar, layoutBar);
    });
};
    



// d3.json("samples.json").then((importedData)=> {
//     var namesData = importedData.names;
//     var samplesData = importedData.samples;

//returns id
// for (var z = dropdownSelection; z < namesData.length; z++) {
//     console.log(z);
//     if(!samplesData.has(z)) {
//         return z;
//     }
// }


// var x = [];
// var y = [];

// for (var z = dropdownSelection; z < namesData.length; z++) {
//     console.log(z);
//     if(samplesData.otu_ids === z) {
//         x = samplesData.sample_values;
//         y = samplesData.otu_labels;
//         console.log(x);
//         console.log(y);
//     }



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