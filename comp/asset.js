
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

var staticImage = function(data){
	this.loc = data.loc || { x:0,y:0 };
	this.size = data.size || { width:32,height:32 };

	this.image = document.getElementById(data.imageID);

	if(typeof(this.draw)!=="functon"){
		staticImage.prototype.draw = function(disp,pos){
			disp.drawImage(this.image,this.loc.x,this.loc.y,this.size.width,this.size.height,pos.x,pos.y,this.size.width,this.size.height);
		}
	}
};

var movingUnit = function(data){
	this.pos = data.pos || { x:0, y:0 };
	this.vel = data.vel || { x:0.0, y:0.0 };
	//this.HP = data.HP || 1;
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

var entity = function(data){
	this.pos = data.pos || { x:0,y:0 };
	this.vel = data.vel || { x:0,y:0 };
	this.speed = { x:0,y:0 };
	this.LRT = 0;
	this.bb = data.bb || { x:0,y:0,width:32,height:32 };

	this.size = data.size || { width:36, height:28 };
	this.aniList = data.aniList || { }; //Example { static:new staticImage({}), left:new aniData({}), right:new aniData({}), jump:new aniData({}) .... }
	this.state = data.state || "static";

	if( typeof(this.update)!=="function" ){
		entity.prototype.update = function(clock,wrld){
			//console.log(((clock-this.LRT)/100));
			this.vel.x = this.speed.x*((clock-this.LRT)/100); //speed = pixels per sec
			this.vel.y = this.speed.y*((clock-this.LRT)/100);
			this.LRT = clock;
			if(!wrld.checkCol({ x:this.pos.x+this.vel.x+this.bb.x, y:this.pos.y+this.bb.y, width:this.bb.width, height:this.bb.height })){
			 this.pos.x+=this.vel.x; 
			}
			else { 
				
				var a = Math.floor( (this.pos.x+this.bb.x)/16 );
				var b = Math.floor( (this.pos.x+this.vel.x+this.bb.x)/16 );
				//console.log(a,b);
				if(a<b){ this.pos.x= ((b+1)*16)-this.size.width-1;  }
				else if(a>b){ this.pos.x= (b*16)+16-this.bb.x; }

				this.vel.x=0; this.speed.x=0;
			 }
			if(!wrld.checkCol({ x:this.pos.x+this.bb.x, y:this.pos.y+this.bb.y+this.vel.y, width:this.bb.width, height:this.bb.height })){
				this.pos.y+=this.vel.y;
			}
			else {
				var a = Math.floor( (this.pos.y+this.bb.y)/16 );
				var b = Math.floor( (this.pos.y+this.vel.y+this.bb.y)/16 );
				//console.log(a,b);
				if(a<b){ this.pos.y= ((b+1)*16)-this.size.height-1;  }
				else if(a>b){ this.pos.y= (b*16)+16-this.bb.y; }
				this.vel.y=0; this.speed.y=0; 
			}
			if(this.aniList[this.state].update){ this.aniList[this.state].update(clock); }
		}
	}

	if( typeof(this.draw) !== "function"){
		entity.prototype.draw = function(disp){
			this.aniList[this.state].draw(disp,this.pos);
		}
	}
};

