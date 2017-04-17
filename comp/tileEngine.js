
var tileSet = function(data){
	this.imageID = data.imageID || "#";
	this.tiles = data.tiles || [];
	this.image = document.getElementById(this.imageID);
	this.scale = data.scale || 1;
	this.tileWidth = data.tileWidth || 16;
	this.tileHeight = data.tileHeight || 16;

	this.drawTile = function(disp,index,pos){
		disp.drawImage(this.image,this.tiles[index].x, this.tiles[index].y, this.tileWidth, this.tileHeight, pos.x, pos.y, this.tileWidth*this.scale, this.tileHeight*this.scale);
	}
};

var gameMap = function(data){
	this.map = data.map || [];
	this.screenWidth = data.screenWidth || 500;
	this.screenHeight = data.screenHeight || 500;
	this.tileSet = data.tileSet || new tileSet({});

	this.mapWidth = Math.floor(this.screenWidth/(this.tileSet.tileWidth * this.tileSet.scale) ); //The # of tiles wide and high
	this.mapHeight = Math.floor(this.screenHeight/(this.tileSet.tileHeight * this.tileSet.scale) );
	this.scrollX = data.scrollX || 0;  //Amount to scroll in pixels
	this.scrollY = data.scrollY || 0;

	this.scroll= function(x,y)
		{ 
			this.scrollX+=x; 
			if(this.scrollX<0){ this.scrollX=0; }
			this.scrollY+=y; 
			if(this.scrollY<0){ this.scrollY=0; }
		}

	this.checkCol = function(BB){ //BB=== bounding box { x:/y:/width:/height:}
		/*ctx.beginPath();
		ctx.rect(BB.x,BB.y,BB.width,BB.height);
		ctx.strokeStyle = "#F00";
		ctx.stroke();
		ctx.closePath(); */
		var gridX = Math.floor(BB.x/(this.tileSet.tileWidth*this.tileSet.scale));
		var gridY = Math.floor(BB.y/(this.tileSet.tileHeight*this.tileSet.scale));
		var width = Math.floor((BB.x+BB.width)/(this.tileSet.tileWidth*this.tileSet.scale))-gridX+1;
		var height = Math.floor((BB.y+BB.height)/(this.tileSet.tileHeight*this.tileSet.scale))-gridY+1;
		for(var y=0;y<height && y+gridY<this.map.length; y++){
			for(var x=0;x<width && x+gridX<this.map[0].length; x++){
				if(this.tileSet.tiles[ this.map[y+gridY][x+gridX] ].solid ){ 
					//console.log("HIT",this.map[y+gridY][x+gridX],x+gridX); 
					return true; 
				}
			}
		}

		return false;
	};

	this.drawMap = function(disp,pos){
		var startX = Math.floor(this.scrollX/(this.tileSet.tileWidth * this.tileSet.scale));
		var startY = Math.floor(this.scrollY/(this.tileSet.tileHeight * this.tileSet.scale));

		for(var x=0;x<this.mapWidth+1 && x+startX<this.map[0].length;x++){
			for(var y=0;y<this.mapHeight+1 && y+startY<this.map.length;y++){

				if(this.map[y][x]!==-1){ this.tileSet.drawTile(disp,this.map[y+startY][x+startX],{ x: Math.floor((x*(this.tileSet.tileWidth * this.tileSet.scale))-(this.scrollX % (this.tileSet.tileWidth * this.tileSet.scale))+pos.x), y: Math.floor((y*(this.tileSet.tileHeight * this.tileSet.scale))-(this.scrollY % (this.tileSet.tileHeight * this.tileSet.scale))+pos.y) }); }
			}
		}
	};
};