"use strict";
var Evolution = function(){
	this.besth = null;
	this.bestd = null;
	this.best = null;
	this.individuals = new Array();
	this.my 7;
	this.rate = 7;
	this.rho = 3;
};

Evolution.prototype.iterate = function(){
	var chartData = new Array();
	var labelData = new Array();
	for (var i = 0;i<100;i++){
		if(i==0){
			this.generateArray(this.my);
			this.evaluate();
		}
		var arrNew = new Array();
		for (var i10 = 0;i10<this.my*this.rate;i10++){
			var marriage = new Array();
			for (var i11=0;i11<this.rho;i11++){
				marriage.push(this.individuals[Math.floor(Math.random()*this.my)]);
			}
			var newInd = marriage[Math.floor(Math.random()*3)];
			newInd.mutateStrategy();
			newInd.mutate();
			arrNew.push(newInd);
		}

		this.selection(arrNew);
		this.selectBest();
		console.log("Best:"+this.best+" h:"+this.besth+" d:"+this.bestd);
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

}

Evolution.prototype.selectBest = function(){
	var bestNum = null;
	var indexVal = null;
	for(var i4 = 0;i4<this.individuals.length;i4++){
		if(bestNum==null&&this.individuals[i4].select){
			indexVal = i4;
			bestNum = this.individuals[i4].f;
		} else {
			if(this.individuals[i4].f<bestNum&&this.individuals[i4].select){
				indexVal=i4;
				bestNum = this.individuals[i4].f;
			}

		}
	}
	this.best=this.individuals[indexVal].f;
	this.besth=this.individuals[indexVal].h;
	this.bestd=this.individuals[indexVal].d;
}

Evolution.prototype.generateArray = function(number){
	var array = new Array();
	for(var i9 = 0;i9<number;i9++){
		array[i9] = new Individual(this.returnBinary());
	};
	this.individuals = array;
}

Evolution.prototype.returnBinary = function(){
	var arr = new Array();
	for(var i8=0;i8<10;i8++){
		arr.push(Math.floor(Math.random()*2)); 
	}
	return arr.join('');
}
Evolution.prototype.evaluate = function(){
	this.individuals.forEach(function(value,index){
		value.evaluate();
	});
}
Evolution.prototype.selection = function(array){
	var rangArray = new Array();
	this.individuals.forEach(function(value,index){
		if (value.select){
			rangArray.push(value);
		}
	});
	array.forEach(function(value,index){
		if (value.select){
			rangArray.push(value);
		}
	});

	var selArray = rangArray.sort(this.compareForSort);
	var total = this.calculateTotalRang(selArray.length);
	var newIndividuals = new Array();
	for (var i5 = 0;i5<this.rho;i5++){
		var ind = this.rankBasedSelection(selArray.length,total,Math.random());	
		newIndividuals.push(new Individual(selArray[ind].binary));
		newIndividuals[i5].evaluate();
		newIndividuals[i5].reduceLifetime();
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

Evolution.prototype.mutateStrategy = function(array){
	return Math.exp(1/Math.sqrt(2*this.my))*array[Math.floor(Math.random()*3)].mutationrate*Math.exp(1/Math.sqrt(2*Math.sqrt(this.my)));
}

Evolution.prototype.mutation = function(array){
	for (var index = 0;index<array.length;index++){
		var stringArr = array[index].binary.split('');
		for(var i3 = 0;i3<stringArr.length;i3++){
			if (Math.random()< array[index].mutationrate){
				stringArr[i3] == "1"?stringArr[i3]="0":stringArr[i3]="1";
			}
		}
		array[index].binary = stringArr.join('');
	}
	return array;
}

Evolution.prototype.rankBasedSelection = function(length,total,value){
	var teilSum = 0;
	for(var i6 = 0;i6<length;i6++){
		teilSum += (i6+1)/total;
		if (value<teilSum){
			return i6;
		}

	}
}
Evolution.prototype.calculateTotalRang = function(value){
	var tot = 0;
	for (var i7 = 0;i7<value;i7++){
		tot += i7 + 1;
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