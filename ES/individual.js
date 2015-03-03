"use strict";
var Individual = function(binary){
	this.h = null;
	this.d = null;
	this.f = null;
	this.g = null;
	this.select = false;
	this.binary = binary;
	this.kappa = 16;
	this.mutationrate = 0.01;
};

Individual.prototype.toReal = function(){
	this.d = parseInt(this.binary.substring(0,5),2);
	this.h = parseInt(this.binary.substring(5,10),2);
}
Individual.prototype.reduceLifetime = function(){
	this.kappa = this.kappa - 1;
}

Individual.prototype.evaluate = function(){
	this.toReal();
	this.f = ((Math.PI*Math.pow(this.d,2))/2)+Math.PI*this.d*this.h;
	this.g = (Math.PI*Math.pow(this.d,2)*this.h)/4;
	if (this.g >= 300){
		this.select = true;
	}	


}

Individual.prototype.mutate = function(){
	var stringArr = this.binary.split('');
	for(var i3 = 0;i3<stringArr.length;i3++){
		if (Math.random()< this.mutationrate){
			stringArr[i3] == "1"?stringArr[i3]="0":stringArr[i3]="1";
		}
	}
	this.binary = stringArr.join('');
	this.evaluate();
}

Individual.prototype.mutateStrategy = function(oldmut){
	this.mutationrate = oldmut*Math.exp((1/Math.sqrt(2))*this.gaussanRandom());
}


Individual.prototype.gaussanRandom = function() {
    return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}
