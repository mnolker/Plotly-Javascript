// Initializes the page with a default plot
function init() {

    //references JSON data & creates arrays
    d3.json("samples.json").then((importedData)=> {
        var namesData = importedData.names;

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

    
        d3.select("#selDataset").node().value = options[0];
        optionChanged();
    });
};

function optionChanged() {
    // create variable for drop down selection of ID
    var dropdownSel = d3.select("#selDataset").node().value; 
    if (typeof(dropdownSel) != "undefined") {
        dropdownSelection = '940'
    }

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
            xaxis: { title: "OTU Values"},
            yaxis: { title: "OTU IDs"}
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", dataBar, layoutBar);

    //__________________________________________________________________
        // pull data for bubble chart

        var sampleIds = filteredId[0].otu_ids;
        var sampleValues = filteredId[0].sample_values;
        var sampleLabels = filteredId[0].otu_labels;

        // console.log(sampleIds);
        console.log(sampleValues);
        // console.log(sampleLabels);

        var traceBubble = {
            x: sampleIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                color: sampleIds,
                size: sampleValues,
            },
            text: sampleLabels
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
            
        Object.entries(filteredMetadata).forEach((key) => {   
            demoInfo.append("h6").text(key[0] + ": " + key[1] + "\n");
        });
    });
};

// run to initially load page
init();
