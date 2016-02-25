var Game = {};

Game.fps = 30;
Game.speed = 10;
Game.tiles = 3;

Game.initialize = function() {
  this.canvas = document.getElementById("canvas");
  this.context = this.canvas.getContext("2d");

  this.width = this.canvas.width;
  this.height = this.canvas.height;

  Player.initialize(this.width/2, Game);
};

Game.draw = function() {
  this.context.clearRect(0, 0, this.width, this.height);

  Player.draw(Game);
};

Game.update = function() {
  Player.update(Game);
};
