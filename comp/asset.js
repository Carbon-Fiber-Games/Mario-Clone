
/*--------------------
asset.js 
/---------------------*/

var aniData = function(data){
	this.imageID = data.imageID || ""; //This URI for the sprite sheet
	this.tileWidth= data.tileWidth || 32; //The width and height of each tile
	this.tileHeight= data.tileHeight || 32;
	this.tiles= data.tiles || [ [0,0] ]; //The top-left corner of each tile
	this.aniPos= 0; //The current frame
	this.fps = data.fps || 10;
	this.LRT = 0; //Last Recorded Time - Used to track time
	this.loop = data.loop || true;

	this.curImage = undefined;

	if( typeof(this.update)!=="function"){
		aniData.prototype.update = function(clock){
			if(this.curImage===undefined){
				this.curImage = document.getElementById(this.imageID); //Grab the 'base' image
			}

			if(clock>=this.LRT+this.fps && this.aniPos<this.tiles.length){ //Advance tile if this.fps time has passed
				this.aniPos++;
				if(this.aniPos>=this.tiles.length && this.loop){ this.aniPos=0; } //Loop if this.loop = true
				this.LRT = clock; //update LRT
			}
		}
	}

	if( typeof(this.draw)!=="function"){
		aniData.prototype.draw = function(disp,pos){ //disp === ctx
			disp.drawImage(this.curImage,this.tiles[this.aniPos][0],this.tiles[this.aniPos][1],this.tileWidth,this.tileHeight,pos.x,pos.y,this.tileWidth,this.tileHeight);
		}
	}

};

var movingUnit = function(data){
	this.pos = data.pos || { x:0, y:0 };
	this.vel = data.vel || { x:0.0, y:0.0 };
	this.HP = data.HP || 1;
	this.aniObj = data.aniObj || new aniData({});

	if( typeof(this.update)!=="function" ){
		movingUnit.prototype.update = function(clock){
			this.pos.x+=this.vel.x;
			this.pos.y+=this.vel.y;
			this.aniObj.update(clock);
		}
	}

	if( typeof(this.draw) !== "function"){
		movingUnit.prototype.draw = function(disp){
			this.aniObj.draw(disp,this.pos);
		}
	}
};

