/*
Mario Clone
By: Carbon Fiber Games

*/


var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

//Basic keyboard handler--------------
//By: Josh5231 on 4/11/17

//To check if a key is pressed use checkKey("a") or checkKey(97) or keys[97]

var keys = []; 

var keyDown = function(e){ 
	keys[e.keyCode] = true;
};

var keyUp = function(e){
	keys[e.keyCode] = false;
};

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

var checkKey = function(keySymbol){
	if(typeof(keySymbol)==="String"){ return keys[keySymbol.charCodeAt(0)]; }
	else if(typeof(keySymbol)==="Number"){ return keys[keySymbol]; }
};

//-------------------------------------
