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
        
            var sampleValuesFiltered = filteredId[0].sample_values.slice(0,10).reverse();
        
            var sampleIdsFiltered = filteredId[0].otu_ids.slice(0,10).reverse();
            var sampleIds = sampleIdsFiltered.join().split(',').map(i => 'OTU '+ i);

            console.log(sampleIds);
            console.log(sampleValuesFiltered);

        // Create your trace.
        var trace = {
            x: sampleValuesFiltered,
            y: sampleIds,
            type: 'bar',
            orientation: 'h'
        };

        // Create the data array for our plot
        var data = [trace];

        // Define the plot layout
        var layout = {
            title: "Top 10 OTU results",
            xaxis: { title: "OTU Values" },
            yaxis: { title: "OTU IDs"}
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

        //pull demographic Info by sample
        var metadataData = importedData.metadata;
        var filteredMetadata = metadataData.filter(d => d.id.toString() === dropdownSelection)[0];
        console.log(filteredMetadata);
        
        //add demographic Info
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html = ("");
        
        Object.entries(filteredMetadata).forEach((key) => {   
            demoInfo.append("h6").text(key[0] + ": " + key[1] + "\n");
        });
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