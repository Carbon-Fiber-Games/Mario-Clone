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
	console.log("key down: "+e.keyCode);
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

var testAni = new aniData({
	imageID:"Mario",
	tiles: [ [35,0], [70,0], [105,0], [ 140,0 ] ],
	fps:20,
	tileHeight: 28,
	tileWidth: 36
});

var testSet = new tileSet({
	imageID: "tiles",
	tiles: [
		new tile({ loc:{ x:48,y:368 },  }), //Blue sky -0
		new tile({ loc:{ x:0,y:0 },  }), //Ground Block -1
		new tile({ loc:{ x:16,y:0 },  }), //brick-top -2
		new tile({ loc:{ x:32,y:0 },  }), //brick bottom -3
		new tile({ loc:{ x:384,y:0 },  }), //? box -4
		new tile({ loc:{ x:0,y:128 },  }), //pipe top-left -5
		new tile({ loc:{ x:16,y:128 },  }), //pipe top-right -6
		new tile({ loc:{ x:0,y:144 },  }), //pipe bottom-left -7
		new tile({ loc:{ x:16,y:144 },  }), //pipe bottom-right -8
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

testMap.scroll( 10,0 );

var main = function(){ //The main loop

	if(keys[65]){ testMap.scroll(-1,0); console.log("scrolling -1"); }
	if(keys[68]){ testMap.scroll(5,0); }

	ctx.clearRect(0,0,canvas.width, canvas.height);
	testMap.drawMap(ctx,{ x:0,y:0 });
	testAni.update(Date.now()/10);
	testAni.draw(ctx,{ x:32,y:196 });
}

setInterval(()=>{ clock++; main(); },100);
