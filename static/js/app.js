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
    console.log(options[0])

    d3.json("samples.json").then((importedData)=> {
        function filterId(individual) {
            return individual.id === options[0];
        }

        var samplesData = importedData.samples;
    
        var filteredId = samplesData.filter(filterId);
            console.log(filteredId);
    
        optionChanged();
    });
    });
};

function optionChanged() {
    var dropdownSelection = d3.select("#selDataset").node().value; 

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
    //__________________________________________________________________
        //pull bonus guage chart
        var wfreqSample = filteredMetadata.wfreq;
        console.log(wfreqSample)

    // Trig to calc meter point
    var degrees = 10 - wfreqSample,
	    radius = .5;
    var radians = degrees * Math.PI / 10;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.02 L .0 0.02 L ',
	    pathX = String(x),
	    space = ' ',
	    pathY = String(y),
	    pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
        x: [0], y:[0],
	    marker: {size: 20, color:'850000'},
	    showlegend: false,
	    name: 'wfreq',
	    text: wfreqSample,
	    hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9','7-8', '6-7','5-6','4-5','3-4','2-3','1-2','1-0', ''],
    textinfo: 'text',
    textposition:'inside',	  
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
						 'rgba(170, 202, 42, .5)', 
                         'rgba(202, 209, 60, .5)', 'rgba(202, 209, 95, .5)',
						 'rgba(210, 206, 120, .5)','rgba(210, 206, 145, .5)',
                          'rgba(232, 226, 202, .5)','rgba(232, 226, 230, .5)',
						 'rgba(255, 255, 255, 0)']},
    labels: ['8-9', '7-8', '6-7','5-6','4-5','3-4','2-3','1-2','1-0', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
}];

var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
        color: '850000'
        }
    }],
    title: '<b>Belly Button Washing Frequency</b> <br> scrubs per Week',
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
			 showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout, {showSendToCloud:true});
});
};


// run to initially load page
init();
