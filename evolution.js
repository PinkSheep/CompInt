"use strict";
var Evolution = function(binary){
	this.h;
	this.d = null;
	this.f = null;
	this.g = null;
	this.select = false;
	this.binary = binary;
};

Evolution.prototype.iterate = function(arr){
	if(!arr){
		var array = this.generateArray();
		array = this.evaluate(array);
	} else{
		var array = arr;
	}
	
	array = this.selection(array);
	array = this.recombination(array);
	array = this.mutation(array);
	array = this.evaluate(array);
	return array;

}
Evolution.prototype.toReal = function(){
	this.d = parseInt(this.binary.substring(0,5),2);
	this.h = parseInt(this.binary.substring(5,10),2);
}
Evolution.prototype.evaluate = function(array){
	array.forEach(function(value,index){
		value.toReal();
		value.f = ((Math.PI*Math.pow(value.d,2))/2)+Math.PI*value.d*value.h;
		value.g = (Math.PI*Math.pow(value.d,2)*value.h)/4;
		if (value.g >= 300){
			value.select = true;
		}
	});
	return array;
	
}
Evolution.prototype.generateArray = function(){
	var array = new Array();
	for(var i = 0;i<30;i++){
		array[i] = new Evolution(returnBinary());
	};
	return array;
}

function returnBinary(){
	var arr = new Array();
	for(var i=0;i<10;i++){
		arr.push(Math.floor(Math.random()*2)); 
	}
	return arr.join('');
}

Evolution.prototype.selection = function(array){
	var rangArray = new Array();
	array.forEach(function(value,index){
		if (value.select){
			rangArray.push(value);
		}
	});

	var selArray = rangArray.sort(CompareForSort);
	var total = calculateTotalRang(selArray.length);
	var newIndividuals = new Array();
	for (var i = 0;i<30;i++){
		var ind = rankBasedSelection(selArray.length,total,Math.random());	
		newIndividuals.push(new Evolution(selArray[ind].binary));
	}
	return newIndividuals;

}

Evolution.prototype.recombination = function(array){
	var singlepoint = Math.floor(Math.random() * 11 );
	var first = Math.floor(Math.random() * (array.length + 1 ));
	var second = Math.floor(Math.random() * (array.length + 1 ));
	var substring1 = array[first].binary.substring(0,singlepoint);
	var substring2 = array[second].binary.substring(0,singlepoint);
	array[first].binary = substring2 + array[first].binary.substring(singlepoint,10);
	array[second].binary = substring1 + array[second].binary.substring(singlepoint,10);
	return array;
}

Evolution.prototype.mutation = function(array){
	for (var index = 0;index<array.length;index++){
		var stringArr = array[index].binary.split('');
		for(var i = 0;i<stringArr.length;i++){
			if (Math.random()< 0.1){
				stringArr[i] == "1"?stringArr[i]="0":stringArr[i]="1";
			}
		}
		array[index].binary = stringArr.join('');
	}
	return array;
}

function rankBasedSelection(length,total,value){
	var teilSum = 0;
	for(var i = 0;i<length;i++){
		teilSum += (i+1)/total;
		if (value<teilSum){
			return i;
		}

	}
}
function calculateTotalRang(value){
	var tot = 0;
	for (var i = 0;i<value;i++){
		tot += i + 1;
	};
	return tot;
}

function CompareForSort(first, second)
{
    if (first.f == second.f)
        return 0;
    if (first.f < second.f)
        return -1;
    else
        return 1; 
}