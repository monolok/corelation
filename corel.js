console.log("iniating app ...");

var varTable1 = [];
var varTable2 = [];
var data_json = [];

// Trigger when push data is clicked
function myFunction(event) {
	//element where to output data
	var data_output = document.getElementById("data_output");

	//Get value from input in form and push to array
	var var1 = parseFloat(document.getElementById("var1").value);
	varTable1.push(var1);
	var var2 = parseFloat(document.getElementById("var2").value);
	varTable2.push(var2);

	//Create data in Json format
	data_json.push({"variable_1": var1, "value": var2});

	event.preventDefault();

	//sort data_json to display corelation in a graph
	data_json.sort(function(a, b) {
	    return parseFloat(a.variable_1) - parseFloat(b.variable_1);
	});	
	//display data as it is pushed to array
	data_output.innerHTML = JSON.stringify((data_json));
	console.log(data_json);

}



function corelation_formula(a, b, c) {
	return a / Math.sqrt(b*c)
}

// Trigger when corelation is clicked
function corelation(event) {
	var output = document.getElementById("output");

	//Write corelation code
	var totalVar1 = varTable1.reduce(function(a, b) {
	  return a + b;
	});
	var totalVar2 = varTable2.reduce(function(a, b) {
	  return a + b;
	});

	var mean1 = totalVar1 / (varTable1.length);
	var mean2 = totalVar2 / (varTable2.length);

	var a_b = [];
	var a2 = [];
	var b2 = [];
	for (var i = varTable1.length - 1; i >= 0; i--) {

		var a = varTable1[i] - mean1
		var b = varTable2[i] - mean2

		a_b.push(a*b)
		a2.push(a*a)
		b2.push(b*b)
	};

	var a_b_sum = a_b.reduce(function(a, b){
		return a + b
	});
	var a2_sum = a2.reduce(function(a, b){
		return a + b
	});
	var b2_sum = b2.reduce(function(a, b){
		return a + b
	});

	var corelation_result = corelation_formula(a_b_sum, a2_sum, b2_sum);

	//Display corelation
	output.innerHTML = corelation_result;
	console.log("corelation");

	//prevent default click behaviour
	event.preventDefault();

	//load graph
	FusionCharts.ready(function () {
	    var visitChart = new FusionCharts({
	        type: 'line',
	        renderAt: 'chart-container',
	        width: '500',
	        height: '300',
	        dataFormat: 'json',
	        dataSource: {
	            "chart": {
	                "caption": "Corlation",
	                "subCaption": "Numbers only",
	                "xAxisName": "variable 1",
	                "yAxisName": "varTable 2",
	                
	                //Cosmetics
	                "lineThickness" : "2",
	                "paletteColors" : "#0075c2",
	                "baseFontColor" : "#333333",
	                "baseFont" : "Helvetica Neue,Arial",
	                "captionFontSize" : "14",
	                "subcaptionFontSize" : "14",
	                "subcaptionFontBold" : "0",
	                "showBorder" : "0",
	                "bgColor" : "#ffffff",
	                "showShadow" : "0",
	                "canvasBgColor" : "#ffffff",
	                "canvasBorderAlpha" : "0",
	                "divlineAlpha" : "100",
	                "divlineColor" : "#999999",
	                "divlineThickness" : "1",
	                "divLineIsDashed" : "1",
	                "divLineDashLen" : "1",
	                "divLineGapLen" : "1",
	                "showXAxisLine" : "1",
	                "xAxisLineThickness" : "1",
	                "xAxisLineColor" : "#999999",
	                "showAlternateHGridColor" : "0",
	                
	            },
	            "data": data_json
	        }
	    });
	    
	    visitChart.render();
	});	
}

