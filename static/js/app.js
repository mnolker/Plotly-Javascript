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
    // create variable for drop down selection of ID
    var dropdownSelection = d3.select("#selDataset").node().value; 

    //
    d3.json("samples.json").then((importedData)=> {
        function filterId(individual) {
            return individual.id === dropdownSelection;
        }
        
        var samplesData = importedData.samples;
    
        var filteredId = samplesData.filter(filterId);
            console.log(filteredId);
        
    //__________________________________________________________________
        // bar plot data transformation
            var sampleValuesFiltered = filteredId[0].sample_values.slice(0,10).reverse();
        
            var sampleIdsFiltered = filteredId[0].otu_ids.slice(0,10).reverse();
            var sampleIds = sampleIdsFiltered.join().split(',').map(i => 'OTU '+ i);

            console.log(sampleIds);
            console.log(sampleValuesFiltered);

        // Create trace for bar chart
        var traceBar = {
            x: sampleValuesFiltered,
            y: sampleIds,
            type: 'bar',
            orientation: 'h'
        };

        // Create the data array for plot
        var dataBar = [traceBar];

        // Define the plot layout
        var layoutBar = {
            title: "Top 10 OTU results",
            xaxis: { title: "OTU Values" },
            yaxis: { title: "OTU IDs"}
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", dataBar, layoutBar);

    //__________________________________________________________________
        // pull data for bubble chart
        var traceBubble = {
            x: filteredId[0].otu_ids,
            y: filteredId[0].sample_values,
            mode: "markers",
            marker: {
                color: filteredId[0].otu_ids,
                size: filteredId[0].sample_values
            },
            text: filteredId[0].otu_labels
        };

        var dataBubble = [traceBubble];

        var layoutBubble = {
            title: "All Sample results for Individual",
            xaxis: {title: "OTU IDs"}
        }

        Plotly.newPlot("bubble", dataBubble, layoutBubble);
    //__________________________________________________________________
        //pull demographic Info by sample
        var metadataData = importedData.metadata;
        var filteredMetadata = metadataData.filter(d => d.id.toString() === dropdownSelection)[0];
        console.log(filteredMetadata);
            
        //add demographic Info
        var demoInfo = d3.select("#sample-metadata");
        demoInfo.html("");
        console.log(demoInfo);
            
        Object.entries(filteredMetadata).forEach((key) => {   
            demoInfo.append("h6").text(key[0] + ": " + key[1] + "\n");
        });
    });
};