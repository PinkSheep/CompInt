	"use strict";
var Evolution = function(){
	this.besth = null;
	this.bestd = null;
	this.best = null;
	this.individuals = new Array();
};

Evolution.prototype.iterate = function(){
	var chartData = new Array();
	var labelData = new Array();
	for (var i = 0;i<100;i++){
		if(i==0){
			var array = this.generateArray();
			array = this.evaluate(array);
		}
		
		array = this.selection(array);
		for (var i2 = 0;i2<5;i2++){
			array=this.recombination(array);
		}
		array = this.mutation(array);
		array = this.evaluate(array);
		var bestIndex = this.selectBest(array);
		this.best = array[bestIndex].f;
		this.h = array[bestIndex].h;
		this.d = array[bestIndex].d;
		console.log("Best:"+this.best+" h:"+this.h+" d:"+this.d);
		chartData.push(this.best);
		labelData.push(i);
	}
	var ctx = document.getElementById("myChart").getContext("2d");
	var data = {
    labels: labelData,
    datasets: [
        {
            label: "dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: chartData
        }
    	]
	};	
	var myLineChart = new Chart(ctx).Line(data,options);


	return array;

}

Evolution.prototype.selectBest = function(){
	var bestNum = null;
	var indexVal = null;
	for(var i = 0;i<this.individuals.length;i++){
		if(bestNum==null&&this.individuals[i].select){
			bestNum = this.individuals[i].f;
			indexVal = i;
		} else {
			if(this.individuals[i].f<bestNum&&this.individuals[i].select){
				bestNum=this.individuals[i].f;
				indexVal=i;
			}

		}
	}
	this.best=this.individuals[bestIndex].f;
	this.besth=this.individuals[bestIndex].h;
	this.bestd=this.individuals[bestIndex].d;
}

Evolution.prototype.generateArray = function(){
	var array = new Array();
	for(var i = 0;i<30;i++){
		array[i] = new Individual(this.returnBinary());
	};
	this.individuals = array;
}

Evolution.prototype.returnBinary = function(){
	var arr = new Array();
	for(var i=0;i<10;i++){
		arr.push(Math.floor(Math.random()*2)); 
	}
	return arr.join('');
}
Evolution.prototype.evaluate = function(){
	this.individuals.forEach(function(value,index){
		value.evaluate();
	});
}
Evolution.prototype.selection = function(){
	var rangArray = new Array();
	this.individuals.forEach(function(value,index){
		if (value.select){
			rangArray.push(value);
		}
	});

	var selArray = rangArray.sort(this.compareForSort);
	var total = this.calculateTotalRang(selArray.length);
	var newIndividuals = new Array();
	for (var i = 0;i<30;i++){
		var ind = this.rankBasedSelection(selArray.length,total,Math.random());	
		newIndividuals.push(new Individual(selArray[ind].binary));
	}
	this.individuals = newIndividuals;

}

Evolution.prototype.recombination = function(){

	var singlepoint = Math.floor(Math.random() * 11 );
	var first = Math.floor(Math.random() * (this.individuals.length));
	var second = Math.floor(Math.random() * (this.individuals.length));
	var substring1 = this.individuals[first].binary.substring(0,singlepoint);
	var substring2 = this.individuals[second].binary.substring(0,singlepoint);
	this.individuals[first].binary = substring2 + this.individuals[first].binary.substring(singlepoint,10);
	this.individuals[second].binary = substring1 + this.individuals[second].binary.substring(singlepoint,10);
}

Evolution.prototype.mutation = function(){
	for (var index = 0;index<this.individuals.length;index++){
		var stringArr = this.individuals[index].binary.split('');
		for(var i = 0;i<stringArr.length;i++){
			if (Math.random()< 0.01){
				stringArr[i] == "1"?stringArr[i]="0":stringArr[i]="1";
			}
		}
		this.individuals[index].binary = stringArr.join('');
	}
}

Evolution.prototype.rankBasedSelection = function(length,total,value){
	var teilSum = 0;
	for(var i = 0;i<length;i++){
		teilSum += (i+1)/total;
		if (value<teilSum){
			return i;
		}

	}
}
Evolution.prototype.calculateTotalRang = function(value){
	var tot = 0;
	for (var i = 0;i<value;i++){
		tot += i + 1;
	};
	return tot;
}

Evolution.prototype.compareForSort = function(first, second)
{
    if (first.f == second.f)
        return 0;
    if (first.f < second.f)
        return 1;
    else
        return -1; 
}

var options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 20,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: false,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: false,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : false,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : false,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
