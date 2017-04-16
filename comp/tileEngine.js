
var tile = function(data){
	this.loc = data.loc || { x:0,y:0 },
	this.size = data.size || { width:16, height:16 }
};

var tileSet = function(data){
	this.imageID = data.imageID || "#";
	this.tiles = data.tiles || [];
	this.image = document.getElementById(this.imageID);
	this.scale = data.scale || 1;
	this.tileWidth = data.tileWidth || 16;
	this.tileHeight = data.tileHeight || 16;

	this.drawTile = function(disp,index,pos){
		disp.drawImage(this.image,this.tiles[index].loc.x, this.tiles[index].loc.y, this.tiles[index].size.width, this.tiles[index].size.height, pos.x, pos.y, this.tiles[index].size.width*this.scale, this.tiles[index].size.height*this.scale);
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

	this.scroll= function(x,y){ this.scrollX+=x; this.scrollY+=y; }

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