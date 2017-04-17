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
	//console.log("key down: "+e.keyCode);
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

var clock = Date.now();

var rightAni = new aniData({
	imageID:"Mario",
	tiles: [  [70,0], [105,0], [ 140,0 ], [ 175,0 ] ],
	fps:20,
	tileHeight: 28,
	tileWidth: 36
});

var leftAni = new aniData({
	imageID:"Mario",
	tiles: [  [806,0], [841,0], [ 876,0 ], [ 911,0 ] ],
	fps:20,
	tileHeight: 28,
	tileWidth: 36
});

rightAni.update(0);

var mario = new entity({
	pos:{ x:0,y:190 },
	bb: { x:13,y:11, width:12, height:15 },
	aniList:{
		static: new staticImage({ loc:{ x:35,y:0 }, imageID:"Mario" }),
		right: rightAni,
		left: leftAni
	}
});

var testSet = new tileSet({
	imageID: "tiles",
	tiles: [
		{ x:48,y:368, solid:false }, //Blue sky -0
		{ x:0,y:0, solid:true }, //Ground Block -1
		{ x:16,y:0, solid:true }, //brick-top -2
		{ x:32,y:0, solid:true }, //brick bottom -3
		{ x:384,y:0, solid:true }, //? box -4
		{ x:0,y:128, solid:true }, //pipe top-left -5
		{ x:16,y:128, solid:true }, //pipe top-right -6
		{ x:0,y:144, solid:true }, //pipe bottom-left -7
		{ x:16,y:144, solid:true }, //pipe bottom-right -8
	],
	scale: 1,
});

var testMap = new gameMap({
	tileSet: testSet,
	map: [
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,2,4,2,4,2,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,6,0,0,0,0,0,0,0,0,7,8,0,0,0,0 ],
	[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,0,7,8,0,0,0,0 ],
	[ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
	[ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ]
	]
});

//testMap.scroll( 0,0 );

var main = function(){ //The main loop

	//if(keys[65]){ testMap.scroll(-1,0);  }
	if(keys[68]){  mario.state="right"; mario.speed.x=50; }
	else if(keys[65]){   mario.state="left"; mario.speed.x=-50; }
	else{ mario.state="static"; mario.speed.x=0; }

	if(keys[87] && mario.speed.y>-5){ mario.speed.y-=150; }

	ctx.clearRect(0,0,canvas.width, canvas.height);
	testMap.drawMap(ctx,{ x:0,y:0 });
	mario.update(Date.now()/10,testMap);
	mario.draw(ctx);

	mario.speed.y+=10; //Gravity
}

setInterval(()=>{ clock++; main(); },100);
