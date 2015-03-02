"use strict";
var Individual = function(binary){
	this.h = null;
	this.d = null;
	this.f = null;
	this.g = null;
	this.select = false;
	this.binary = binary;
	this.kappa = 15;
	this.mutationrate = 0.01;
};

Individual.prototype.toReal = function(){
	this.d = parseInt(this.binary.substring(0,5),2);
	this.h = parseInt(this.binary.substring(5,10),2);
}

Individual.prototype.evaluate = function(){
	this.toReal();
	this.f = ((Math.PI*Math.pow(this.d,2))/2)+Math.PI*this.d*this.h;
	this.g = (Math.PI*Math.pow(this.d,2)*this.h)/4;
	if (this.g >= 300){
		this.select = true;
	}	
}



